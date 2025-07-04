import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { useParams, useNavigate } from 'react-router-dom'

export default function Details(){
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            fetchPostDetails()
        }
    }, [id])

    const fetchPostDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/post/${id}/`)
            setPost(response.data)
            setError(null)
        } catch (err) {
            console.error('Error fetching post details:', err)
            setError('Failed to load post details')
        } finally {
            setLoading(false)
        }
    }

    const handleAddComment = () => {
        navigate(`/post/${id}/add-comment`)
    }

    const handleBackToPosts = () => {
        navigate('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading post details...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg">{error}</p>
                    <button 
                        onClick={handleBackToPosts}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Posts
                    </button>
                </div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 text-lg">Post not found</p>
                    <button 
                        onClick={handleBackToPosts}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Posts
                    </button>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Post Details</h1>
                    <div className="flex space-x-4">
                        <button 
                            onClick={handleAddComment}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                            Add Comment
                        </button>
                        <button 
                            onClick={handleBackToPosts}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                            Back to Posts
                        </button>
                    </div>
                </div>

                {/* Post Content */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h2>
                    <div className="flex items-center text-gray-600 mb-4">
                        <span className="font-medium">By: {post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                    {post.link && (
                        <a 
                            href={post.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Read More →
                        </a>
                    )}
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Comments ({post.comments?.length || 0})
                    </h3>
                    
                    {post.comments && post.comments.length > 0 ? (
                        <div className="space-y-4">
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900">{comment.author}</span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </div>
        </div>
    )
}