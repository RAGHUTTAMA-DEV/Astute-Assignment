import axios from 'axios'
import { API_URL } from '../config'

// Configure axios defaults to include cookies in every request
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'

// In development, we use a proxy, so we don't set baseURL
// In production, we set the baseURL to the actual API
if (!import.meta.env.DEV) {
  axios.defaults.baseURL = API_URL
}

// Function to get CSRF token from cookies
const getCSRFTokenFromCookie = () => {
  const name = 'csrftoken'
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

// Function to ensure CSRF token is set
export const ensureCSRFToken = async () => {
  // First try to get from cookie
  let csrfToken = getCSRFTokenFromCookie()
  
  if (!csrfToken) {
    // If no cookie, try to get it by making a GET request to trigger cookie setting
    try {
      console.log('No CSRF token in cookie, making GET request to trigger cookie...')
      await axios.get('/api/list-posts/')
      csrfToken = getCSRFTokenFromCookie()
    } catch (error) {
      console.error('Error getting CSRF token:', error)
    }
  }
  
  if (csrfToken) {
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken
    console.log('CSRF token set:', csrfToken)
  } else {
    console.warn('Could not get CSRF token')
  }
}

// Export configured axios instance
export default axios 