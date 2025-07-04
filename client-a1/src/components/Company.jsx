import axios from 'axios'
import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, Plus, Briefcase, ArrowRight, Users, Mail, Calendar, FileText } from 'lucide-react'

export default function Company(){
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)
    const [showJobForm, setShowJobForm] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        salary: '',
        location: ''
    })
    const [showAllApplicants, setShowAllApplicants] = useState(false)
    const [allApplicants, setAllApplicants] = useState([])
    const [applicantsLoading, setApplicantsLoading] = useState(false)

    useEffect(() => {
        listCompanies()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(`${API_URL}/api/create-company/`, {name, location, description})
            console.log(response.data)
            alert('Company created successfully')
            setName('')
            setLocation('')
            setDescription('')
            listCompanies() // Refresh the list
        } catch (error) {
            console.error('Error creating company:', error)
            alert('Error creating company. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const listCompanies = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/list-companies/`)
            console.log(response.data)
            setCompanies(response.data.companies)
        } catch (error) {
            console.error('Error fetching companies:', error)
            alert('Error loading companies.')
        }
    }

    const handlePostJob = (company) => {
        setSelectedCompany(company)
        setShowJobForm(true)
    }

    const handleJobSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${API_URL}/api/post-job/`, {
                ...jobData,
                company_id: selectedCompany.id
            })
            alert('Job posted successfully!')
            setShowJobForm(false)
            setJobData({ title: '', description: '', salary: '', location: '' })
            setSelectedCompany(null)
        } catch (error) {
            console.error('Error posting job:', error)
            alert('Error posting job. Please try again.')
        }
    }

    const handleJobInputChange = (e) => {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        })
    }

    const fetchAllApplicants = async () => {
        try {
            setApplicantsLoading(true)
            const response = await axios.get(`${API_URL}/api/companies/${selectedCompany.id}/applicants/`)
            setAllApplicants(response.data.applicants)
        } catch (error) {
            console.error('Error fetching all applicants:', error)
            alert('Error loading applicants.')
        } finally {
            setApplicantsLoading(false)
        }
    }

    const handleViewAllApplicants = (company) => {
        setSelectedCompany(company)
        setShowAllApplicants(true)
        fetchAllApplicants()
    }

    return(
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Company Management</h1>
                            <p className="mt-1 text-gray-600">Create and manage companies</p>
                        </div>
                        <button 
                            onClick={() => navigate('/jobs')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                            <Briefcase size={16} className="mr-2" />
                            View Jobs
                            <ArrowRight size={16} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Create Company Form */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <Plus size={20} className="mr-2" />
                            Create New Company
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name *
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Enter company name" 
                                    value={name} 
                                    name="name" 
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location *
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Enter company location" 
                                    value={location} 
                                    name="location" 
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea 
                                    placeholder="Enter company description" 
                                    value={description} 
                                    name="description" 
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Company'}
                            </button>
                        </form>
                    </div>

                    {/* Companies List */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                <Building2 size={20} className="mr-2" />
                                Companies
                            </h2>
                            <button 
                                onClick={listCompanies}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                Refresh
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {companies.map((company) => (
                                <div key={company.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{company.name}</h3>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={16} className="mr-2" />
                                                <span className="text-sm">{company.location}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm">{company.description}</p>
                                        </div>
                                        <div className="ml-4 flex space-x-2">
                                            <button
                                                onClick={() => handlePostJob(company)}
                                                className="bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors flex items-center"
                                            >
                                                <Plus size={14} className="mr-1" />
                                                Post Job
                                            </button>
                                            <button
                                                onClick={() => handleViewAllApplicants(company)}
                                                className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center"
                                            >
                                                <Users size={14} className="mr-1" />
                                                View Applicants
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {companies.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No companies found. Create your first company!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Posting Modal */}
            {showJobForm && selectedCompany && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Post Job for {selectedCompany.name}</h2>
                            <button 
                                onClick={() => {
                                    setShowJobForm(false)
                                    setSelectedCompany(null)
                                    setJobData({ title: '', description: '', salary: '', location: '' })
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleJobSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={jobData.title}
                                    onChange={handleJobInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter job title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={jobData.description}
                                    onChange={handleJobInputChange}
                                    required
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    placeholder="Enter job description"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Salary (USD) *
                                </label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={jobData.salary}
                                    onChange={handleJobInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter salary amount"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={jobData.location}
                                    onChange={handleJobInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter job location"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowJobForm(false)
                                        setSelectedCompany(null)
                                        setJobData({ title: '', description: '', salary: '', location: '' })
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Post Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* All Applicants Modal */}
            {showAllApplicants && selectedCompany && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                <Users size={20} className="mr-2" />
                                All Applicants for {selectedCompany.name}
                            </h2>
                            <button 
                                onClick={() => {
                                    setShowAllApplicants(false)
                                    setSelectedCompany(null)
                                    setAllApplicants([])
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            {applicantsLoading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="mt-4 text-gray-600">Loading applicants...</p>
                                </div>
                            ) : allApplicants.length === 0 ? (
                                <div className="text-center py-8">
                                    <Users size={48} className="mx-auto text-gray-400 mb-4" />
                                    <p className="text-gray-500 text-lg">No applicants yet</p>
                                    <p className="text-gray-400 text-sm mt-2">Applicants will appear here once they apply to your jobs</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {allApplicants.map((applicant) => (
                                        <div key={applicant.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
                                                        <span className="text-sm text-gray-500">Applied to: {applicant.job_title}</span>
                                                    </div>
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
            )}
        </div>
    )
}