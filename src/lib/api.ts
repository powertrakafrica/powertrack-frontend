// API Client for Smart Energy Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Build URL with query parameters
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      credentials: 'include', // Important for session cookies
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }
      return {} as T;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || data.message || `HTTP ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network errors
    if (error instanceof TypeError) {
      throw new ApiError('Network error. Please check your connection.', 0);
    }

    throw new ApiError('An unexpected error occurred', 500);
  }
}

// API Methods
export const api = {
  // Authentication
  login: (email: string, password: string) =>
    fetchApi('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data: { email: string; password: string; username: string; meterCode: string }) =>
    fetchApi('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    fetchApi('/logout', {
      method: 'POST',
    }),

  getCurrentUser: () =>
    fetchApi('/me'),

  // Dashboard
  getDashboard: () =>
    fetchApi('/dashboard'),

  getReadings: (params?: { limit?: number; skip?: number }) =>
    fetchApi('/readings', { params: params as any }),

  getLatestReading: () =>
    fetchApi('/readings/latest'),

  getAnalytics: (period: 'day' | 'week' | 'month' = 'week') =>
    fetchApi(`/analytics`, { params: { period } }),

  // Subscriptions
  getPricing: () =>
    fetchApi('/subscriptions/pricing'),

  initializeSubscription: (type: 'monthly' | 'annual', autoRenew: boolean = false) =>
    fetchApi('/subscriptions/initialize', {
      method: 'POST',
      body: JSON.stringify({ type, autoRenew }),
    }),

  verifyPayment: (reference: string) =>
    fetchApi(`/subscriptions/verify/${reference}`),

  getCurrentSubscription: () =>
    fetchApi('/subscriptions/current'),

  getSubscriptionHistory: () =>
    fetchApi('/subscriptions/history'),

  cancelSubscription: (subscriptionId: string) =>
    fetchApi(`/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
    }),

  // Admin
  getAllMeters: () =>
    fetchApi('/admin/all-meters'),

  getMeterReadings: (meterCode: string, params?: { limit?: number }) =>
    fetchApi(`/admin/readings/${meterCode}`, { params: params as any }),

  getLatestMeterReading: (meterCode: string) =>
    fetchApi(`/admin/readings/${meterCode}/latest`),
};

export default api;
