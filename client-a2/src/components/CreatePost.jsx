import { useState, useEffect } from 'react'
import axios from '../utils/api'
import { API_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CreatePost(){
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [link, setLink] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { isAuthenticated, user, loading: authLoading, checkAuthStatus } = useAuth()

    // Debug authentication status
    useEffect(() => {
        console.log('CreatePost - Auth Status:', { isAuthenticated, user, authLoading })
        console.log('CreatePost - Axios defaults:', {
            withCredentials: axios.defaults.withCredentials,
            baseURL: axios.defaults.baseURL,
            headers: axios.defaults.headers.common
        })
    }, [isAuthenticated, user, authLoading])

    const testAuth = async () => {
        try {
            console.log('Testing authentication...')
            const response = await axios.get(`${API_URL}/test-auth/`)
            console.log('Auth test response:', response.data)
            alert(`Auth test result: ${JSON.stringify(response.data)}`)
        } catch (error) {
            console.error('Auth test error:', error)
            alert(`Auth test failed: ${error.response?.status} - ${error.response?.data?.error || error.message}`)
        }
    }

    const refreshAuth = async () => {
        try {
            await checkAuthStatus()
            alert('Authentication status refreshed')
        } catch (error) {
            console.error('Error refreshing auth:', error)
            alert('Failed to refresh authentication')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!isAuthenticated) {
            setError('You must be logged in to create a post')
            return
        }

        if (!title.trim() || !content.trim()) {
            setError('Title and content are required')
            return
        }

        try {
            setLoading(true)
            setError('')
            
            console.log('Creating post with data:', { title: title.trim(), content: content.trim(), link: link.trim() || null })
            console.log('Request URL:', `${API_URL}/create-post/`)
            console.log('Axios config:', {
                withCredentials: axios.defaults.withCredentials,
                headers: axios.defaults.headers.common
            })
            
            const response = await axios.post(`${API_URL}/create-post/`, {
                title: title.trim(),
                content: content.trim(),
                link: link.trim() || null
            })
            
            console.log('Post creation response:', response)
            if(response.status === 200){
                alert('Post created successfully')
                navigate('/post')
            }
        } catch (err) {
            console.error('Error creating post:', err)
            console.error('Error response:', err.response)
            console.error('Error status:', err.response?.status)
            console.error('Error data:', err.response?.data)
            
            if (err.response?.status === 401) {
                setError('You are not authenticated. Please log in again.')
                // Redirect to login if unauthorized
                setTimeout(() => navigate('/signin'), 2000)
            } else {
                setError(err.response?.data?.error || 'Failed to create post. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }   

    return(
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
                    <button 
                        onClick={() => navigate('/post')}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                        Back to Posts
                    </button>
                </div>

                {/* Debug Info */}
                <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded text-sm">
                    <p><strong>Environment:</strong> {import.meta.env.DEV ? 'Development' : 'Production'}</p>
                    <p><strong>API URL:</strong> {API_URL}</p>
                    <p><strong>Auth Status:</strong> {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
                    <p><strong>User:</strong> {user ? user.username : 'None'}</p>
                    <p><strong>Loading:</strong> {authLoading ? 'Yes' : 'No'}</p>
                    <p><strong>With Credentials:</strong> {axios.defaults.withCredentials ? 'Yes' : 'No'}</p>
                    <p><strong>Base URL:</strong> {axios.defaults.baseURL || 'Not set (using proxy)'}</p>
                    <div className="mt-2 flex space-x-2">
                        <button 
                            onClick={testAuth}
                            className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                            Test Auth
                        </button>
                        <button 
                            onClick={refreshAuth}
                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                        >
                            Refresh Auth
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter post title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <textarea 
                                placeholder="Enter post content" 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={6}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Link (Optional)
                            </label>
                            <input 
                                type="url" 
                                placeholder="Enter link URL" 
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate('/post')}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !isAuthenticated}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}