import { useState, useEffect } from 'react'
import axios from '../utils/api'
import { API_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, DollarSign, Calendar, ExternalLink, Filter, Users } from 'lucide-react'
import Applicants from './Applicants'

export default function Jobs(){
    const navigate = useNavigate()
    const [companies, setCompanies] = useState([])
    const [jobs, setJobs] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])
    const [selectedCompany, setSelectedCompany] = useState('all')
    const [loading, setLoading] = useState(true)
    const [showApplyForm, setShowApplyForm] = useState(false)
    const [showApplicants, setShowApplicants] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)
    const [applyData, setApplyData] = useState({
        name: '',
        email: '',
        resume_link: ''
    })

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (selectedCompany === 'all') {
            setFilteredJobs(jobs)
        } else {
            const filtered = jobs.filter(job => job.company === selectedCompany)
            setFilteredJobs(filtered)
        }
    }, [selectedCompany, jobs])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [companiesResponse, jobsResponse] = await Promise.all([
                axios.get(`${API_URL}/api/list-companies/`),
                axios.get(`${API_URL}/api/jobs/`)
            ])
            
            setCompanies(companiesResponse.data.companies)
            setJobs(jobsResponse.data.jobs)
            setFilteredJobs(jobsResponse.data.jobs)
        } catch (error) {
            console.error('Error fetching data:', error)
            alert('Error loading data. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleApplyClick = (job) => {
        setSelectedJob(job)
        setShowApplyForm(true)
    }

    const handleViewApplicants = (job) => {
        setSelectedJob(job)
        setShowApplicants(true)
    }

    const handleApplySubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${API_URL}/api/apply/`, {
                ...applyData,
                job_id: selectedJob.id
            })
            
            alert('Application submitted successfully!')
            setShowApplyForm(false)
            setApplyData({ name: '', email: '', resume_link: '' })
            setSelectedJob(null)
        } catch (error) {
            console.error('Error applying:', error)
            alert('Error submitting application. Please try again.')
        }
    }

    const handleInputChange = (e) => {
        setApplyData({
            ...applyData,
            [e.target.name]: e.target.value
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading jobs...</p>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Job Portal</h1>
                            <p className="mt-1 text-gray-600">Find your dream job</p>
                        </div>
                        <button 
                            onClick={() => navigate('/company')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Manage Companies
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                    <div className="flex items-center space-x-4">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                        </svg>
                        <label className="text-sm font-medium text-gray-700">Filter by Company:</label>
                        <select 
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Companies</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.name}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm text-gray-500">
                            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                        </span>
                    </div>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((job) => (
                        <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                            {/* Job Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <Building2 size={16} className="mr-2" />
                                        <span className="text-sm">{job.company}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <MapPin size={16} className="mr-2" />
                                        <span className="text-sm">{job.location}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center text-green-600 font-semibold">
                                        <DollarSign size={16} className="mr-1" />
                                        <span>${job.salary.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm mt-1">
                                        <Calendar size={14} className="mr-1" />
                                        <span>{new Date(job.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm line-clamp-3">
                                    {job.description}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center space-x-2">
                                <button
                                    onClick={() => handleApplyClick(job)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center"
                                >
                                    <ExternalLink size={16} className="mr-2" />
                                    Apply Now
                                </button>
                                <button
                                    onClick={() => handleViewApplicants(job)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-200 flex items-center"
                                >
                                    <Users size={16} className="mr-2" />
                                    View Applicants
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredJobs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No jobs found for the selected company.</p>
                    </div>
                )}
            </div>

            {/* Apply Form Modal */}
            {showApplyForm && selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Apply for {selectedJob.title}</h2>
                            <button 
                                onClick={() => {
                                    setShowApplyForm(false)
                                    setSelectedJob(null)
                                    setApplyData({ name: '', email: '', resume_link: '' })
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={applyData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={applyData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Resume Link *
                                </label>
                                <input
                                    type="url"
                                    name="resume_link"
                                    value={applyData.resume_link}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://drive.google.com/your-resume"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Upload your resume to Google Drive, Dropbox, or similar and paste the link here
                                </p>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowApplyForm(false)
                                        setSelectedJob(null)
                                        setApplyData({ name: '', email: '', resume_link: '' })
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Applicants Modal */}
            {showApplicants && selectedJob && (
                <Applicants 
                    jobId={selectedJob.id}
                    jobTitle={selectedJob.title}
                    onClose={() => {
                        setShowApplicants(false)
                        setSelectedJob(null)
                    }}
                />
            )}
        </div>
    )
}