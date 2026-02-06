import api from '../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'alumni' | 'admin';
    profileImage?: string;
  };
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      return { token, user };
    } catch (error: any) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  signup: async (data: any): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/signup', data);
      const { token, user } = response.data;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      return { token, user };
    } catch (error: any) {
      throw error.response?.data?.message || 'Signup failed';
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
    }
  },

  getCurrentUser: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  isLoggedIn: async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem('authToken');
    return !!token;
  },
};
