import Searchbar from '../components/searchbar'
import SideBar from '../components/sidebar'
import Card from '../components/Card'
import InfoCard from '../components/infocard' 
import { useState } from 'react'
import Button from '../components/button'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CaseDetails from '../components/CaseDetail'
import InputCaseDetails from '../components/InputCaseDetails'

export default function Main(){
    const navigate = useNavigate()
    const [showCaseDetails, setShowCaseDetails] = useState(false);
    const [showInputCaseDetails, setShowInputCaseDetails] = useState(false);
    const [activeTab, setActiveTab] = useState('contracts'); // Add tab state
    
    // Sample litigation data
    const litigationCases = [
        {
            id: 1,
            caseType: "Criminal",
            title: "Johnson & Partners Merger",
            firm: "Johnson & Partners LLP",
            createdDate: "May 2, 2025",
            lastActive: "2 hours ago",
            documentsCount: 12,
            drafts: 3,
            inReview: 1,
            completed: 0,
            teamMembers: ["JD", "ML", "RK"],
            additionalMembers: 2
        },
        {
            id: 2,
            caseType: "Civil",
            title: "Smith vs. Corporate Ltd",
            firm: "Legal Associates Inc",
            createdDate: "April 28, 2025",
            lastActive: "1 day ago",
            documentsCount: 8,
            drafts: 2,
            inReview: 3,
            completed: 1,
            teamMembers: ["SA", "BW", "TM"],
            additionalMembers: 1
        },
        {
            id: 3,
            caseType: "Corporate",
            title: "Tech Acquisition Deal",
            firm: "Business Law Partners",
            createdDate: "April 25, 2025",
            lastActive: "3 days ago",
            documentsCount: 15,
            drafts: 5,
            inReview: 2,
            completed: 2,
            teamMembers: ["DP", "KL"],
            additionalMembers: 3
        }
    ];
    
    return(
        <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
            <SideBar/>
            <div className="flex-1">
                {/* Header with search and user */}
                <div className="bg-white border-b px-4 lg:px-6 py-3 lg:py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-3 lg:space-y-0">
                    <div className="flex items-center w-full lg:w-auto">
                        <div className="flex items-center rounded-full border-2 border-gray-300 px-3 lg:px-4 py-2 bg-white hover:border-gray-400 focus-within:border-blue-500 transition-colors duration-200 w-full lg:w-64">
                            <Search size={18} className="text-gray-400 mr-2 lg:mr-3" />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="outline-none bg-transparent text-sm w-full lg:w-64 placeholder-gray-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 lg:space-x-4 w-full lg:w-auto justify-between lg:justify-end">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center">
                            <span className="text-sm font-medium">John Doe</span>
                            <span className="ml-2 text-gray-400">▼</span>
                        </div>
                    </div>
                </div>
                
                <div className="p-4 lg:p-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Dashboard Overview</h2>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-4 mb-6 lg:mb-8">
                        <div className="bg-white rounded-lg border-2 border-blue-500 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600">Total Workspaces</span>
                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">4</div>
                            <div className="text-sm text-green-600 mt-1">▲ 12% from last month</div>
                        </div>
                        
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600">Total Signed Contracts</span>
                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">51</div>
                            <div className="text-sm text-green-600 mt-1">▲ 12% from last month</div>
                        </div>
                        
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600">Contracts Drafted</span>
                                <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">4</div>
                            <div className="text-sm text-red-600 mt-1">▼ 4% from last month</div>
                        </div>
                        
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600">Contracts Reviewed</span>
                                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">18</div>
                            <div className="text-sm text-green-600 mt-1">▲ 12% from last month</div>
                        </div>
                        
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600">Contracts Translated</span>
                                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">9</div>
                            <div className="text-sm text-green-600 mt-1">▲ 10% from last month</div>
                        </div>
                    </div>

                    {/* Workspaces Section */}
                    <div className="bg-white rounded-lg border p-4 lg:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 space-y-3 lg:space-y-0">
                            <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Workspaces</h3>
                            <div className="flex items-center space-x-2 lg:space-x-4">
                                <button className="bg-gray-100 text-gray-700 px-2 lg:px-3 py-1 rounded text-xs lg:text-sm">Grid</button>
                                <button className="bg-slate-800 text-white px-2 lg:px-3 py-1 rounded text-xs lg:text-sm">List</button>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4 lg:mb-6">
                            <div className="flex border-b w-full lg:w-auto">
                                <button 
                                    className={`px-3 lg:px-4 py-2 font-medium text-sm lg:text-base ${
                                        activeTab === 'contracts' 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-500'
                                    }`}
                                    onClick={() => setActiveTab('contracts')}
                                >
                                    Contracts
                                </button>
                                <button 
                                    className={`px-3 lg:px-4 py-2 font-medium text-sm lg:text-base ${
                                        activeTab === 'litigation' 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-500'
                                    }`}
                                    onClick={() => setActiveTab('litigation')}
                                >
                                    Litigation
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 lg:mb-6 space-y-3 lg:space-y-0">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-3 lg:space-x-4 w-full lg:w-auto">
                                <div className="flex items-center bg-white rounded-full border-2 border-gray-300 px-3 lg:px-4 py-2 w-full lg:w-80 hover:border-gray-400 focus-within:border-blue-500 transition-colors duration-200">
                                    <Search size={16} className="text-gray-500 mr-2 lg:mr-3" />
                                    <input 
                                        type="text" 
                                        placeholder="Search by Workspace Name / Client Name" 
                                        className="bg-transparent outline-none text-sm flex-1 placeholder-gray-500"
                                    />
                                </div>
                                <div className="flex space-x-2 w-full lg:w-auto">
                                    <select className="border rounded-lg px-3 py-2 text-sm bg-white flex-1 lg:flex-none">
                                        <option>All Types</option>
                                    </select>
                                    <select className="border rounded-lg px-3 py-2 text-sm bg-white flex-1 lg:flex-none">
                                        <option>All Status</option>
                                    </select>
                                </div>
                            </div>
                            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium w-full lg:w-auto hover:bg-gray-800 transition-colors duration-200" onClick={() => setShowCaseDetails(true)}>
                                + Create New Workspace
                            </button>
                        </div>

                        {/* Conditional Content Based on Active Tab */}
                        {activeTab === 'contracts' && (
                            <>
                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-full">
                                        <thead>
                                            <tr className="border-b text-left text-xs lg:text-sm text-gray-600">
                                                <th className="pb-3 font-medium px-2 lg:px-4">Workspace Name</th>
                                                <th className="pb-3 font-medium px-2 lg:px-4 hidden md:table-cell">Client</th>
                                                <th className="pb-3 font-medium px-2 lg:px-4 hidden lg:table-cell">Opponent</th>
                                                <th className="pb-3 font-medium px-2 lg:px-4">Case</th>
                                                <th className="pb-3 font-medium px-2 lg:px-4 hidden md:table-cell">Area of Law</th>
                                                <th className="pb-3 font-medium px-2 lg:px-4 hidden lg:table-cell">Timeline</th>
                                                <th className="pb-3 font-medium px-2 lg:px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-3 lg:py-4 font-medium px-2 lg:px-4 text-sm">Morgan Acquisition</td>
                                                <td className="py-3 lg:py-4 px-2 lg:px-4 hidden md:table-cell text-sm">Sarah Chen</td>
                                                <td className="py-3 lg:py-4 px-2 lg:px-4 hidden lg:table-cell text-sm">Chen Sarah</td>
                                                <td className="py-3 lg:py-4 px-2 lg:px-4">
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Criminal</span>
                                                </td>
                                                <td className="py-3 lg:py-4 px-2 lg:px-4 hidden md:table-cell text-sm">Jalandhar</td>
                                                <td className="py-3 lg:py-4 px-2 lg:px-4 hidden lg:table-cell">
                                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">First hearing done</span>
                                                </td>
                                                <td className="py-3 lg:py-4 px-2 lg:px-4">
                                                    <button className="text-gray-500 hover:text-gray-700">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                            <circle cx="8" cy="3" r="1.5"/>
                                                            <circle cx="8" cy="8" r="1.5"/>
                                                            <circle cx="8" cy="13" r="1.5"/>
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                        {activeTab === 'litigation' && (
                            <>
                                {/* Litigation Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                    {litigationCases.map((litigationCase) => (
                                        <InfoCard
                                            key={litigationCase.id}
                                            caseType={litigationCase.caseType}
                                            title={litigationCase.title}
                                            firm={litigationCase.firm}
                                            createdDate={litigationCase.createdDate}
                                            lastActive={litigationCase.lastActive}
                                            documentsCount={litigationCase.documentsCount}
                                            drafts={litigationCase.drafts}
                                            inReview={litigationCase.inReview}
                                            completed={litigationCase.completed}
                                            teamMembers={litigationCase.teamMembers}
                                            additionalMembers={litigationCase.additionalMembers}
                                            onOpen={() => {
                                                console.log('Opening case:', litigationCase.title);
                                                // Add your open logic here
                                            }}
                                            onMenuClick={() => {
                                                console.log('Menu clicked for:', litigationCase.title);
                                                // Add your menu logic here
                                            }}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Upgrade Banner */}
                        <div className="bg-slate-800 text-white p-3 lg:p-4 rounded-lg mt-4 lg:mt-6 text-center">
                            <button
                                className="text-xs lg:text-sm bg-transparent border-none p-0 m-0 cursor-pointer focus:outline-none"
                                style={{ font: "inherit" }}
                                type="button" 
                                onClick={() => setShowInputCaseDetails(true)}
                            >
                                📄 Upgrade to add more litigation cases to the workspace
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Components */}
            <CaseDetails 
                isOpen={showCaseDetails} 
                onClose={() => setShowCaseDetails(false)} 
            />
            <InputCaseDetails 
                isOpen={showInputCaseDetails} 
                onClose={() => setShowInputCaseDetails(false)} 
            />
        </div>
    )
}