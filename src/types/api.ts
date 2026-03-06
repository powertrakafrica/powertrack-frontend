// API Types based on backend documentation

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN';
  meterCode: string;
  subscription?: {
    status: 'active' | 'expired' | 'pending';
    expiryDate: string;
    plan: string;
  };
}

export interface Reading {
  _id: string;
  meterCode: string;
  voltage: number;
  current: number;
  energyKWh: number;
  costGHS: number;
  timestamp: string;
}

export interface LiveMeterData {
  meterCode: string;
  voltage: number;
  current: number;
  power: number;
  energy: number;
  cost: number;
  timestamp: string;
  status: string;
}

export interface DashboardData {
  live: LiveMeterData;
  stats: {
    todayEnergy: number;
    todayCost: number;
    weekEnergy: number;
    weekCost: number;
  };
}

export interface AnalyticsData {
  period: 'day' | 'week' | 'month';
  data: Array<{
    timestamp: string;
    energyKWh: number;
    costGHS: number;
  }>;
  totals: {
    energy: number;
    cost: number;
  };
}

export interface Subscription {
  _id: string;
  userId: string;
  type: 'monthly' | 'annual';
  amountPaid: number;
  status: 'active' | 'expired' | 'pending' | 'cancelled';
  startDate: string;
  expiryDate: string;
  paymentReference?: string;
  autoRenew: boolean;
}

export interface PricingPlan {
  type: 'monthly' | 'annual';
  name: string;
  price: number;
  duration: string;
  features: string[];
}

export interface AdminMeter {
  meterCode: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullname?: string;
    location?: string;
    phone?: string;
  };
  subscription: {
    status: string;
    expiryDate: string;
  };
  lastReading?: {
    timestamp: string;
    energyKWh: number;
    voltage: number;
    current: number;
  };
}

export interface AdminDashboardData {
  userStats: { totalUsers: number };
  subscriptionStats: { activeSubscriptions: number; totalRevenue: number };
  systemStats: { activeMeters24h: number };
}

// API Response types
export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
  message?: string;
}

export interface PaymentInitResponse {
  paymentUrl: string;
  reference: string;
}

export interface PaymentVerifyResponse {
  message: string;
  subscription: Subscription;
}
