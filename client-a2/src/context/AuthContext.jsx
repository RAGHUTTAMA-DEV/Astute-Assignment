import { createContext, useContext, useState, useEffect } from 'react'
import axios from '../utils/api'
import { API_URL } from '../config'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    useEffect(() => {
        // Configure axios for cross-origin requests with credentials
        axios.defaults.withCredentials = true
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        
        // Set base URL only in production
        if (!import.meta.env.DEV) {
            axios.defaults.baseURL = API_URL
        }
    }, [])

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/login/`, {
                username,
                password
            })
            
            if (response.status === 200) {
                setUser(response.data.user)
                setIsAuthenticated(true)
                // Don't call checkAuthStatus here as it might override the login state
                return { success: true, message: 'Login successful' }
            }
        } catch (error) {
            console.error('Login error:', error)
            const message = error.response?.data?.error || 'Login failed'
            return { success: false, message }
        }
    }

    const register = async (username, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/register/`, {
                username,
                email,
                password
            })
            
            if (response.status === 200) {
                return { success: true, message: 'Registration successful' }
            }
        } catch (error) {
            console.error('Registration error:', error)
            const message = error.response?.data?.error || 'Registration failed'
            return { success: false, message }
        }
    }

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/logout/`)
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setUser(null)
            setIsAuthenticated(false)
        }
    }

    const checkAuthStatus = async () => {
        try {
            // Test auth status first
            const testResponse = await axios.get(`${API_URL}/test-auth/`)
            console.log('Auth test:', testResponse.data)
            
            if (testResponse.data.authenticated) {
                // If authenticated, get user info
                const userResponse = await axios.get(`${API_URL}/user-info/`)
                if (userResponse.status === 200) {
                    setIsAuthenticated(true)
                    setUser(userResponse.data)
                }
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        } catch (error) {
            console.error('Auth check error:', error)
            setIsAuthenticated(false)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Check auth status on app load
        checkAuthStatus()
    }, [])

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        checkAuthStatus
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 