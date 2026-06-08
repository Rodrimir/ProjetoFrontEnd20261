import axios from 'axios';
import { getAuthToken, clearAuthToken } from '../utils/storage';
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', 
});
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      clearAuthToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
import * as mockApi from '../mocks/apiMock';
const USE_MOCK = true; 
if (USE_MOCK) {
  api.defaults.adapter = async (config) => {
    const { url, method, data } = config;
    const parsedData = data && typeof data === 'string' ? JSON.parse(data) : data;
    try {
      let res;
      let status = 200;
      if (url === '/auth/login' && method === 'post') {
        res = await mockApi.login(parsedData);
      } else if (url === '/auth/register' && method === 'post') {
        res = await mockApi.register(parsedData);
      } else if (url === '/dashboard' && method === 'get') {
        res = await mockApi.getDashboard();
      } else if (url.match(/^\/habits\/([^/]+)\/executions$/) && method === 'post') {
        const id = url.split('/')[2];
        res = await mockApi.submitExecution(id, parsedData);
      } else if (url.match(/^\/habits\/([^/]+)\/shield$/) && method === 'post') {
        const id = url.split('/')[2];
        res = await mockApi.buyShield(id);
      } else if (url === '/profile' && method === 'put') {
        res = await mockApi.updateProfile(parsedData);
      } else if (url === '/habits' && method === 'post') {
        res = await mockApi.createHabit(parsedData);
        status = 201;
      } else if (url.match(/^\/habits\/([^/]+)$/) && method === 'put') {
        const id = url.split('/')[2];
        res = await mockApi.updateHabit(id, parsedData);
      } else if (url.match(/^\/habits\/([^/]+)$/) && method === 'delete') {
        const id = url.split('/')[2];
        res = await mockApi.archiveHabit(id);
      } else if (url === '/stats/weekly' && method === 'get') {
        res = await mockApi.getWeeklyStats();
      } else if (url.match(/^\/habits\/([^/]+)\/priming$/) && method === 'get') {
        const id = url.split('/')[2];
        res = await mockApi.getPreTaskPriming(id);
      } else {
        return Promise.reject({ response: { status: 404, data: { message: 'Not found mock route' } } });
      }
      return {
        data: res.data,
        status: status,
        statusText: 'OK',
        headers: {},
        config,
        request: {}
      };
    } catch (error) {
      return Promise.reject({
        response: {
          status: error.response?.status || 500,
          data: error.response?.data || { message: 'Mock error' }
        },
        config
      });
    }
  };
}
export const login = async (data) => api.post('/auth/login', data);
export const register = async (data) => api.post('/auth/register', data);
export const getDashboard = async () => api.get('/dashboard');
export const submitExecution = async (id, payload) => api.post(`/habits/${id}/executions`, payload);
export const buyShield = async (id) => api.post(`/habits/${id}/shield`);
export const updateProfile = async (data) => api.put('/profile', data);
export const createHabit = async (data) => api.post('/habits', data);
export const updateHabit = async (id, data) => api.put(`/habits/${id}`, data);
export const archiveHabit = async (id) => api.delete(`/habits/${id}`);
export const getWeeklyStats = async () => api.get('/stats/weekly');
export const getPreTaskPriming = async (id) => api.get(`/habits/${id}/priming`);
export default api;
