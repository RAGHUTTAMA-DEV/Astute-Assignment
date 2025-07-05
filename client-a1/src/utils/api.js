import axios from 'axios'
import { API_URL } from '../config'

// Configure axios defaults to include cookies in every request
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = API_URL

// Export configured axios instance
export default axios 