import { useState, useEffect } from 'react'
import axios from '../utils/api'
import { API_URL } from '../config'
import { Users, Mail, Calendar, FileText, X } from 'lucide-react'

export default function Applicants({ jobId, jobTitle, onClose }) {
    const [applicants, setApplicants] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (jobId) {
            fetchApplicants()
        }
    }, [jobId])

    const fetchApplicants = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/applicants/${jobId}/`)
            setApplicants(response.data.applicants)
        } catch (error) {
            console.error('Error fetching applicants:', error)
            alert('Error loading applicants.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            <Users size={20} className="mr-2" />
                            Applicants for {jobTitle}
                        </h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-6 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading applicants...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                        <Users size={20} className="mr-2" />
                        Applicants for {jobTitle}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {applicants.length === 0 ? (
                        <div className="text-center py-8">
                            <Users size={48} className="mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500 text-lg">No applicants yet</p>
                            <p className="text-gray-400 text-sm mt-2">Applicants will appear here once they apply</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {applicants.map((applicant) => (
                                <div key={applicant.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{applicant.name}</h3>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <Mail size={16} className="mr-2" />
                                                <span className="text-sm">{applicant.email}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-3">
                                                <Calendar size={16} className="mr-2" />
                                                <span className="text-sm">
                                                    Applied on {new Date(applicant.applied_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <FileText size={16} className="mr-2 text-blue-600" />
                                                <a 
                                                    href={applicant.resume_link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                >
                                                    View Resume
                                                </a>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Applied
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 