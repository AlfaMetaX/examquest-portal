
import { toast } from "@/hooks/use-toast";

/**
 * Base URL for API requests
 * In production, you would want to use an environment variable
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * HTTP request options interface
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

/**
 * Makes an HTTP request to the API server
 */
async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    requiresAuth = true,
  } = options;
  
  // Default headers
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Add auth token if required
  if (requiresAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }
  
  // Merge headers
  const requestHeaders = { ...defaultHeaders, ...headers };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });
    
    // Check if the response is successful
    if (!response.ok) {
      // Handle specific status codes
      if (response.status === 401) {
        // Unauthorized - clear local storage and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        window.location.href = '/login';
        throw new Error('Session expired. Please log in again.');
      }
      
      // Try to get error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    // Parse JSON response
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: "API Error",
        description: error.message,
        variant: "destructive",
      });
    }
    throw error;
  }
}

/**
 * Auth service
 */
export const authService = {
  async login(email: string, password: string) {
    return apiRequest<{ token: string; user: { name: string } }>('/auth/login', {
      method: 'POST',
      body: { email, password },
      requiresAuth: false,
    });
  },
  
  async register(name: string, email: string, password: string) {
    return apiRequest<{ token: string; user: { name: string } }>('/auth/register', {
      method: 'POST',
      body: { name, email, password },
      requiresAuth: false,
    });
  },
  
  async logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    // Optionally notify the backend
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      // Ignore errors on logout
    }
  },
  
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }
};

/**
 * You can add more service exports for other API endpoints
 * Example:
 */
export const examService = {
  async getExams() {
    return apiRequest<any[]>('/exams');
  },
  
  async getExamById(id: string) {
    return apiRequest<any>(`/exams/${id}`);
  },
  
  // Add more methods as needed
};

export const statisticsService = {
  async getStatistics() {
    return apiRequest<any>('/statistics');
  },
  
  // Add more methods as needed
};

