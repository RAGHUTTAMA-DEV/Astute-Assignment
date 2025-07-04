import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
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
        axios.defaults.withCredentials = true
    }, [])

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/login/`, {
                username,
                password
            })
            
            if (response.status === 200) {
                setUser({ username })
                setIsAuthenticated(true)
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
            // Get user info to check if authenticated
            const response = await axios.get(`${API_URL}/user-info/`)
            if (response.status === 200) {
                setIsAuthenticated(true)
                setUser(response.data)
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setIsAuthenticated(false)
                setUser(null)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
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