import { useState, useEffect } from 'react'
import axios, { ensureCSRFToken } from '../utils/api'
import { API_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Post(){
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { logout, user, isAuthenticated, loading: authLoading } = useAuth()

    useEffect(() => {
        // Only fetch posts after authentication is checked
        if (!authLoading) {
            listPosts()
        }
    }, [authLoading])

    const listPosts = async () => {
        try {
            setLoading(true)
            console.log('Making request to list-posts with credentials:', axios.defaults.withCredentials)
            const response = await axios.get(`${API_URL}/list-posts/`)
            console.log('List posts response:', response.data)
            setPosts(response.data.posts || [])
            setError(null)
        } catch (err) {
            console.error('Error fetching posts:', err)
            console.error('Error response:', err.response?.data)
            setError('Failed to load posts')
        } finally {
            setLoading(false)
        }
    }

    const handleViewDetails = (postId) => {
        navigate(`/post/${postId}`)
    }

    const handleAddComment = (postId) => {
        navigate(`/post/${postId}/add-comment`)
    }

    const handleLike = async (postId) => {
        try {
            await ensureCSRFToken()
            const response = await axios.post(`/api/post/${postId}/like/`)
            console.log('Like response:', response.data)
            
            // Update the like count locally
            setPosts(prevPosts => 
                prevPosts.map(post => 
                    post.id === postId 
                        ? { ...post, likes_count: (post.likes_count || 0) + 1 }
                        : post
                )
            )
        } catch (error) {
            console.error('Error liking post:', error)
        }
    }

    const handleUnlike = async (postId) => {
        try {
            await ensureCSRFToken()
            const response = await axios.post(`/api/post/${postId}/unlike/`)
            console.log('Unlike response:', response.data)
            
            // Update the like count locally
            setPosts(prevPosts => 
                prevPosts.map(post => 
                    post.id === postId 
                        ? { ...post, likes_count: Math.max((post.likes_count || 0) - 1, 0) }
                        : post
                )
            )
        } catch (error) {
            console.error('Error unliking post:', error)
        }
    }

    const handleLogout = async () => {
        await logout()
        navigate('/signin')
    }

    const createPost = async () => {
        navigate('/create-post')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading posts...</p>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                        {user && (
                            <p className="text-gray-600 mt-1">Welcome, {user.username}!</p>
                        )}
                    </div>
                    <div className="flex space-x-3">
                        <button 
                            onClick={() => navigate('/create-post')}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Create Post
                        </button>
                        <button 
                            onClick={listPosts}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Refresh Posts
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {post.content}
                                </p>
                                
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>By: {post.author}</span>
                                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>

                                {/* Like Count */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-gray-600">
                                        ❤️ {post.likes_count || 0} likes
                                    </span>
                                </div>

                                <div className="flex space-x-2 mb-4">
                                    <button 
                                        onClick={() => handleLike(post.id)}
                                        className="flex-1 bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600 transition-colors"
                                    >
                                        ❤️ Like
                                    </button>
                                    <button 
                                        onClick={() => handleUnlike(post.id)}
                                        className="flex-1 bg-gray-500 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-600 transition-colors"
                                    >
                                        💔 Unlike
                                    </button>
                                </div>

                                <div className="flex space-x-3">
                                    <button 
                                        onClick={() => handleViewDetails(post.id)}
                                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                                    >
                                        View Details
                                    </button>
                                    <button 
                                        onClick={() => handleAddComment(post.id)}
                                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                                    >
                                        Add Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {posts.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No posts found.</p>
                    </div>
                )}

                {/* create post */}
                <button onClick={createPost}>Create Post</button>
            </div>
        </div>
    )
}