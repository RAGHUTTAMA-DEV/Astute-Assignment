// Use proxy in development to avoid CORS issues
const isDevelopment = import.meta.env.DEV
export const API_URL = isDevelopment ? '/api' : 'https://astute-assignment-2.onrender.com'