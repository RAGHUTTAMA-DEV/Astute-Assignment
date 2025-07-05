
import { useState, useEffect } from 'react'
import axios, { ensureCSRFToken } from '../utils/api'
import { API_URL } from '../config'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

export default function Comment(){
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [commentDetails, setCommentDetails] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    // Check if we're adding a comment to a post or viewing comment details
    const isAddingComment = location.pathname.includes('/add-comment')
    const postId = isAddingComment ? id : null
    const commentId = !isAddingComment ? id : null

    useEffect(() => {
        if (commentId) {
            fetchCommentDetails()
        }
    }, [commentId])

    const fetchCommentDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/comment/${commentId}/`)
            setCommentDetails(response.data)
            setError(null)
        } catch (err) {
            console.error('Error fetching comment details:', err)
            setError('Failed to load comment details')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!comment.trim()) {
            setError('Comment content is required')
            return
        }

        try {
            setLoading(true)
            setError(null)
            
            // Ensure CSRF token is available
            await ensureCSRFToken()
            
            console.log('Adding comment to post:', postId)
            console.log('Comment content:', comment)
            console.log('Request URL:', `${API_URL}/post/${postId}/add-comment/`)
            console.log('CSRF token:', axios.defaults.headers.common['X-CSRFToken'])
            
            const response = await axios.post(`${API_URL}/post/${postId}/add-comment/`, {
                content: comment
            })
            
            console.log('Comment response:', response)
            setSuccess(true)
            setComment('')
            
            // Redirect to post details after successful comment
            setTimeout(() => {
                navigate(`/post/${postId}`)
            }, 1500)
            
        } catch (err) {
            console.error('Error adding comment:', err)
            console.error('Error response:', err.response)
            console.error('Error status:', err.response?.status)
            console.error('Error data:', err.response?.data)
            
            if (err.response?.status === 403) {
                setError('CSRF verification failed. Please refresh the page and try again.')
                // Try to get a new CSRF token
                await ensureCSRFToken()
            } else {
                setError(err.response?.data?.error || 'Failed to add comment')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleBackToPost = () => {
        if (commentDetails?.post?.id) {
            navigate(`/post/${commentDetails.post.id}`)
        } else {
            navigate('/')
        }
    }

    const handleBackToPosts = () => {
        navigate('/')
    }

    // If viewing comment details
    if (commentId && commentDetails) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Comment Details</h1>
                        <button 
                            onClick={handleBackToPost}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Back to Post
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comment</h3>
                            <p className="text-gray-700 leading-relaxed">{commentDetails.content}</p>
                        </div>
                        
                        <div className="border-t pt-4">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>By: {commentDetails.author}</span>
                                <span>{new Date(commentDetails.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {commentDetails.post && (
                            <div className="border-t pt-4 mt-4">
                                <h4 className="text-md font-semibold text-gray-900 mb-2">From Post</h4>
                                <p className="text-gray-700">{commentDetails.post.title}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // If adding a comment to a post
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Add Comment</h1>
                    <button 
                        onClick={handleBackToPosts}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                        Back to Posts
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    {success && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            Comment added successfully! Redirecting...
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Comment Content *
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="Write your comment here..."
                                disabled={loading}
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={handleBackToPosts}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Adding...' : 'Add Comment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}