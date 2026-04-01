import apiClient from './api';

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authAPI = {
  register: async (email: string, password: string, confirmPassword: string) => {
    const response = await apiClient.post<AuthResponse>('/auth/register', {
      email,
      password,
      confirmPassword,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    await apiClient.post('/auth/logout');
  },
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

export const tasksAPI = {
  getTasks: async (page = 1, limit = 10, status?: string, search?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (status) params.append('status', status);
    if (search) params.append('search', search);

    const response = await apiClient.get<TasksResponse>(`/tasks?${params.toString()}`);
    return response.data;
  },

  createTask: async (title: string, description: string) => {
    const response = await apiClient.post<{ message: string; task: Task }>('/tasks', {
      title,
      description,
    });
    return response.data.task;
  },

  getTask: async (id: string) => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  updateTask: async (id: string, title?: string, description?: string, status?: string) => {
    const response = await apiClient.patch<{ message: string; task: Task }>(`/tasks/${id}`, {
      title,
      description,
      status,
    });
    return response.data.task;
  },

  deleteTask: async (id: string) => {
    const response = await apiClient.delete<{ message: string }>(`/tasks/${id}`);
    return response.data;
  },

  toggleTask: async (id: string) => {
    const response = await apiClient.post<{ message: string; task: Task }>(`/tasks/${id}/toggle`);
    return response.data.task;
  },
};
