// import axios from 'axios';

// const API_URL = 'http://206.189.91.54/api/v1';

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const sendMessageToUser = async (receiverId, messageBody) => {
//   try {
//     const accessToken = localStorage.getItem('access-token');
//     const client = localStorage.getItem('client');
//     const expiry = localStorage.getItem('expiry');
//     const uid = localStorage.getItem('uid');

//     if (!accessToken || !client || !expiry || !uid) {
//       throw new Error('Authentication headers are missing');
//     }

//     // Define the request body
//     const requestBody = {
//       receiver_id: receiverId,
//       receiver_class: 'User', // Assuming you want to send a direct message to a user
//       body: messageBody,
//     };

//     // Set the authentication headers
//     axiosInstance.defaults.headers.common['access-token'] = accessToken;
//     axiosInstance.defaults.headers.common['client'] = client;
//     axiosInstance.defaults.headers.common['expiry'] = expiry;
//     axiosInstance.defaults.headers.common['uid'] = uid;

//     // Make the authenticated POST request to send the message
//     const response = await axiosInstance.post('/messages', requestBody);

//     // Assuming your API returns a response with data
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export default sendMessageToUser;
