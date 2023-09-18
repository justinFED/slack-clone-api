import axios from 'axios';

const API_URL = 'http://206.189.91.54/api/v1';

const authService = {
  // Register
  register: async (email, password, passwordConfirmation) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  // Login
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/sign_in`, {
        email,
        password,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Function to get authentication headers
  getAuthHeaders: () => {
    return {
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      expiry: localStorage.getItem('expiry'),
      uid: localStorage.getItem('uid'),
    };
  },

  // Create Channel
  createChannel: async (name, user_ids) => {
    try {
      // Get user authentication headers from authService
      const headers = authService.getAuthHeaders();

      // Send a POST request to create the channel
      const response = await axios.post(
        `${API_URL}/channels`,
        {
          name,
          user_ids,
        },
        { headers }
      );

      // Handle the response and return the result
      if (response.status === 200) {
        return response.data; // You can customize this based on your API response format
      } else {
        // Handle errors, if any
        throw new Error('Failed to create channel');
      }
    } catch (error) {
      throw error;
    }
  },
  
};

export default authService;
