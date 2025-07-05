import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
    try {
        const { isAuthenticated, loading, user } = useAuth()

        if (loading) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading...</p>
                    </div>
                </div>
            )
        }

        // If not authenticated and no user data, redirect to signin
        if (!isAuthenticated && !user) {
            return <Navigate to="/signin" replace />
        }

        return children
    } catch (error) {
        // If useAuth fails, redirect to signin
        return <Navigate to="/signin" replace />
    }
} 