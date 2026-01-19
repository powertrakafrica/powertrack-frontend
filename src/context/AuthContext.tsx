"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api, { ApiError, tokenStorage } from "@/lib/api";
import { User } from "@/types/api";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
  meterCode: string;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const checkAuth = async () => {
    // Check if we have a token before trying to fetch user
    const token = tokenStorage.getToken();
    if (!token) {
      setState({ user: null, loading: false, error: null });
      return;
    }

    try {
      const response = await api.getCurrentUser();
      setState({ user: response.user as User, loading: false, error: null });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        // Token is invalid or expired, clear it
        tokenStorage.removeToken();
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

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await api.login(email, password);
      // Token is automatically stored by api.login
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

  const register = async (data: RegisterData) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await api.register(data);
      // Token is automatically stored by api.register
      setState({ user: response.user, loading: false, error: null });
      return response.user;
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Registration failed';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      // Token is automatically cleared by api.logout
      setState({ user: null, loading: false, error: null });
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setState({ user: null, loading: false, error: null });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isAuthenticated: !!state.user,
        isAdmin: state.user?.role === 'ADMIN',
        login,
        register,
        logout,
        refetch: checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

