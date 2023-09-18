import axios from 'axios';

const API_URL = 'http://206.189.91.54/api/v1';

// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to set authentication headers for requests
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const expiry = localStorage.getItem('expiry');
    const uid = localStorage.getItem('uid');

    if (accessToken && client && expiry && uid) {
      config.headers['access-token'] = accessToken;
      config.headers['client'] = client;
      config.headers['expiry'] = expiry;
      config.headers['uid'] = uid;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  register: async (email, password, passwordConfirmation) => {
    try {
      const response = await axiosInstance.post('/auth', {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/sign_in', {
        email,
        password,
      });
  
      localStorage.setItem('access-token', response.headers['access-token']);
      localStorage.setItem('client', response.headers['client']);
      localStorage.setItem('expiry', response.headers['expiry']);
      localStorage.setItem('uid', response.headers['uid']);
  
      return response;
    } catch (error) {
      throw error;
    }
  },
  

  createChannel: async (channelName, userIds) => {
    try {
      const requestBody = {
        name: channelName,
        user_ids: userIds,
      };

      const response = await axiosInstance.post('/channels', requestBody);

      return response;
    } catch (error) {
      throw error;
    }
  },

  searchUsers: async () => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
};

export default authService;
