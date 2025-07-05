import axios from 'axios'

// Configure axios defaults to include cookies in every request
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Base API URL - you can change this to your backend URL
const API_URL = 'http://localhost:8000' // or your actual backend URL
axios.defaults.baseURL = API_URL

// Function to get CSRF token (for Django backend)
export const getCSRFToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/csrf-token/`)
    if (response.data.csrf_token) {
      axios.defaults.headers.common['X-CSRFToken'] = response.data.csrf_token
    }
  } catch (error) {
    console.error('Error getting CSRF token:', error)
  }
}

// Initialize CSRF token on app load
getCSRFToken()

// Export configured axios instance
export default axios 