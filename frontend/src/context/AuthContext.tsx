import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthResponse } from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'alumni' | 'admin';
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignout: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  restoreToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignout, setIsSignout] = useState(false);

  // Restore token on app start
  useEffect(() => {
    const restoreToken = async () => {
      try {
        setIsLoading(true);
        const isLoggedIn = await authService.isLoggedIn();
        if (isLoggedIn) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error restoring token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreToken();
  }, []);

  const authContext = {
    user,
    isLoading,
    isSignout,
    login: async (email: string, password: string) => {
      try {
        setIsLoading(true);
        const response = await authService.login({ email, password });
        setUser(response.user);
        setIsSignout(false);
      } finally {
        setIsLoading(false);
      }
    },
    signup: async (data: any) => {
      try {
        setIsLoading(true);
        const response = await authService.signup(data);
        setUser(response.user);
        setIsSignout(false);
      } finally {
        setIsLoading(false);
      }
    },
    logout: async () => {
      try {
        setIsLoading(true);
        await authService.logout();
        setUser(null);
        setIsSignout(true);
      } finally {
        setIsLoading(false);
      }
    },
    restoreToken: async () => {
      try {
        const isLoggedIn = await authService.isLoggedIn();
        if (isLoggedIn) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error restoring token:', error);
      }
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
