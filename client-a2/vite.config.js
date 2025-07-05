import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '^/(api|post|comment|login|register|logout|test-auth|user-info|csrf-token|list-posts|create-post)': {
        target: 'https://astute-assignment-2.onrender.com',
        changeOrigin: true,
        secure: true,
        withCredentials: true,
        rewrite: (path) => {
          // Remove /api prefix if it exists
          if (path.startsWith('/api')) {
            return path.replace(/^\/api/, '')
          }
          return path
        }
      },
      // Specific proxy for comment endpoints with dynamic post IDs
      '^/post/\\d+/add-comment': {
        target: 'https://astute-assignment-2.onrender.com',
        changeOrigin: true,
        secure: true,
        withCredentials: true
      }
    }
  }
})
