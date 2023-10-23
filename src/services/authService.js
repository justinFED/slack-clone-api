import axios from 'axios';

const API_URL = 'http://206.189.91.54/api/v1';

const authService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authService.interceptors.request.use(
  async (config) => {
    try {
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
    } catch (error) {
      throw error;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authServiceMethods = {
  register: async (email, password, passwordConfirmation) => {
    try {
      const response = await authService.post('/auth', {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  get: async (url, config) => {
    try {
      const response = await authService.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await authService.post('/auth/sign_in', {
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

  logout: () => {
    try {
      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      localStorage.removeItem('expiry');
      localStorage.removeItem('uid');
      
      window.location.href = '/login';

    } catch (error) {
      throw error;
    }
  },

  createChannel: async (channelName, userIds) => {
    try {
      const authHeaders = {
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
      };

      // Include the user's ID in the user_ids array
      const user_id = localStorage.getItem("uid"); // Assuming 'uid' contains the user's ID
      userIds.push(user_id);

      const requestBody = {
        name: channelName,
        user_ids: userIds,
      };

      const response = await authService.post('/channels', requestBody, {
        headers: authHeaders,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  searchUsers: async (authHeaders) => {
    try {
      const response = await authService.get('/users', {
        headers: authHeaders,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllUserChannels: async () => {
    try {
      const accessToken = localStorage.getItem('access-token');
      const client = localStorage.getItem('client');
      const expiry = localStorage.getItem('expiry');
      const uid = localStorage.getItem('uid');

      if (!accessToken || !client || !expiry || !uid) {
        throw new Error('Authentication headers are missing');
      }

      const authHeaders = {
        'access-token': accessToken,
        'client': client,
        'expiry': expiry,
        'uid': uid,
      };

      const response = await authService.get('/channels', {
        headers: authHeaders,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchMessages: async (receiverId) => {
    try {
      const response = await authService.get('/messages', {
        params: {
          receiver_id: receiverId,
          receiver_class: 'User',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  sendMessageToUser: async (receiverId, body) => {
    try {

      const messageData = {
        receiver_id: receiverId,
        receiver_class: 'User', 
        body: body,
      };
  
 
      const response = await authService.post('/messages', messageData);
  
 
      if (response.status === 200) {
        console.log('Message sent successfully.');
        return response.data; 
      } else {
        console.error('Failed to send message:', response);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  getChannelDetails: async (channelId) => {
    try {
      const accessToken = localStorage.getItem('access-token');
      const client = localStorage.getItem('client');
      const expiry = localStorage.getItem('expiry');
      const uid = localStorage.getItem('uid');

      if (!accessToken || !client || !expiry || !uid) {
        throw new Error('Authentication headers are missing');
      }

      const authHeaders = {
        'access-token': accessToken,
        'client': client,
        'expiry': expiry,
        'uid': uid,
      };

      const response = await authService.get(`/channels/${channelId}`, {
        headers: authHeaders,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  

};

export default authServiceMethods;
