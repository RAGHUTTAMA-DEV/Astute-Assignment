// Use proxy in development to avoid CORS issues
// In production, use the full backend URL
const isDevelopment = import.meta.env.DEV
export const API_URL = isDevelopment ? '/api' : 'https://astute-assignment-2.onrender.com'