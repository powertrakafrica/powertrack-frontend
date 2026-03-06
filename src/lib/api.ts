// API Client for Smart Energy Backend
import { AdminDashboardData, AdminMeter } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Token storage keys
const TOKEN_KEY = 'smart_energy_token';

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

// Token management helpers
export const tokenStorage = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

// Get authorization headers for authenticated requests
export const getAuthHeaders = (): Record<string, string> => {
  const token = tokenStorage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
  skipAuth?: boolean; // Skip adding auth header for public endpoints
}

async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, skipAuth, ...fetchOptions } = options;

  // Build URL with query parameters
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  // Build headers with auth token
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Add Authorization header if we have a token and this isn't a public endpoint
  if (!skipAuth) {
    const token = tokenStorage.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      credentials: 'include', // Keep for backwards compatibility with session cookies
      headers,
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
  login: async (email: string, password: string) => {
    const response = await fetchApi<{ message: string; token: string; user: any }>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true, // Login doesn't need auth
    });
    // Store the JWT token
    if (response.token) {
      tokenStorage.setToken(response.token);
    }
    return response;
  },

  register: async (data: { email: string; password: string; username: string; meterCode: string }) => {
    const response = await fetchApi<{ message: string; token: string; user: any }>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
      skipAuth: true, // Register doesn't need auth
    });
    // Store the JWT token
    if (response.token) {
      tokenStorage.setToken(response.token);
    }
    return response;
  },

  logout: async () => {
    try {
      await fetchApi('/logout', {
        method: 'POST',
      });
    } finally {
      // Always clear the token, even if the API call fails
      tokenStorage.removeToken();
    }
  },

  getCurrentUser: () =>
    fetchApi<{ user: any }>('/me'),

  updateUser: (userId: string, data: any) =>
    fetchApi(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

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
    fetchApi<AdminMeter[]>('/admin/all-meters'),

  getAdminDashboard: () =>
    fetchApi<AdminDashboardData>('/admin/dashboard'),

  getMeterReadings: (meterCode: string, params?: { limit?: number }) =>
    fetchApi(`/admin/readings/${meterCode}`, { params: params as any }),

  getLatestMeterReading: (meterCode: string) =>
    fetchApi(`/admin/readings/${meterCode}/latest`),
};

export default api;
