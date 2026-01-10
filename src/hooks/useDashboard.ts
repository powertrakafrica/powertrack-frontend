"use client";

import { useState, useEffect } from 'react';
import api, { ApiError } from '@/lib/api';
import { DashboardData } from '@/types/api';

interface UseDashboardReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDashboard(autoRefresh: boolean = true, intervalMs: number = 5000): UseDashboardReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setError(null);
      const dashboardData = await api.getDashboard();
      setData(dashboardData as DashboardData);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to fetch dashboard data';
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();

    if (autoRefresh) {
      const interval = setInterval(fetchDashboard, intervalMs);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, intervalMs]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard,
  };
}
