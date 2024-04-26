const axios = require('axios');
 
const API_GATEWAY_URL = 'http://localhost:3000';

async function getUsernameByUserId(userId) {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/users/${userId}/username`);
    return response.data.username; // Assuming the response has a username field
  } catch (error) {
    console.error('Error fetching username:', error);
    throw error; // Handle or rethrow the error as needed
  }
}

module.exports = {
    getUsernameByUserId
}