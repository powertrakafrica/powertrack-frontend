"use client";

import { useState, useEffect } from 'react';
import api, { ApiError } from '@/lib/api';
import { User } from '@/types/api';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const checkAuth = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const user = await api.getCurrentUser();
      setState({ user: user as User, loading: false, error: null });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        // Not authenticated
        setState({ user: null, loading: false, error: null });
      } else {
        setState({ 
          user: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Authentication check failed' 
        });
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response: any = await api.login(email, password);
      setState({ user: response.user, loading: false, error: null });
      return response.user;
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Login failed';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setState({ user: null, loading: false, error: null });
    } catch (error) {
      console.error('Logout error:', error);
      // Clear user anyway
      setState({ user: null, loading: false, error: null });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.user,
    isAdmin: state.user?.role === 'ADMIN',
    login,
    logout,
    refetch: checkAuth,
  };
}
