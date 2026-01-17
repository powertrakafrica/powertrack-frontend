"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api, { ApiError } from "@/lib/api";
import { User } from "@/types/api";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<User>;
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
    try {
      // Don't set loading to true here to avoid flashing loading state on every refetch
      // if we wanted silent updates. unique loading state for initial load is set in useState
      // But for consistency with original hook, let's keep it simple or improve it.
      // Ideally correct logic:
      // if (!state.user && state.loading) ...
      
      // Let's stick to the original logic but be careful about infinite loops if this was called in effect dependent on state
      
      const user = await api.getCurrentUser();
      setState({ user: user as User, loading: false, error: null });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
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
      const response: any = await api.login(email, password);
      // Assuming response has user object, or we fetch it after
      // Original code: setState({ user: response.user, ... })
      
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
