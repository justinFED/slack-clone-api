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

 
  
};

export default authService;
