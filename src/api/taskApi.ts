import axios from 'axios';

declare global {
  interface Window {
    __APP_CONFIG__?: {
      apiBaseUrl?: string;
    };
  }
}

const getApiBaseUrl = (): string => {
  const runtimeUrl = window.__APP_CONFIG__?.apiBaseUrl;
  if (runtimeUrl) return runtimeUrl;
  return import.meta.env.VITE_API_URL || 'http://localhost:8000';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Task {
  id: number | null;
  title: string;
  description: string;
  status: boolean;
}

export const taskApi = {
  checkHealth: async () => {
    const response = await api.get('/');
    return response.data;
  },
  
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/items/');
    return response.data;
  },
  
  getTaskById: async (id: number): Promise<Task> => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },
  
  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await api.post('/', task);
    return response.data;
  },
  
  updateTask: async (id: number, task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await api.put(`/items/${id}`, task);
    return response.data;
  },
  
  deleteTask: async (id: number): Promise<any> => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  },
  
  deleteAllTasks: async (): Promise<any> => {
    const response = await api.delete('/items/');
    return response.data;
  }
};
