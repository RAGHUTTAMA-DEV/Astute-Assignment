import Searchbar from '../components/searchbar'
import SideBar from '../components/sidebar'
import Card from '../components/Card'
import Button from '../components/button'
import { Search } from 'lucide-react'

export default function Main(){
    return(
        <div className="flex bg-gray-50 min-h-screen">
            <SideBar/>
            <div className="flex-1">
                {/* Header with search and user */}
                <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <Search size={18} className="text-gray-400 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="outline-none bg-transparent text-sm w-64"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center">
                            <span className="text-sm font-medium">John Doe</span>
                            <span className="ml-2 text-gray-400">▼</span>
                        </div>
                    </div>
                </div>
                
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-5 gap-4 mb-8">
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
                    <div className="bg-white rounded-lg border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Workspaces</h3>
                            <div className="flex items-center space-x-4">
                                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">Grid</button>
                                <button className="bg-slate-800 text-white px-3 py-1 rounded text-sm">List</button>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex border-b">
                                <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">Contracts</button>
                                <button className="px-4 py-2 text-gray-500 font-medium">Litigation</button>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">
                                    <Search size={16} className="text-gray-500 mr-2" />
                                    <input 
                                        type="text" 
                                        placeholder="Search by Workspace Name / Client Name" 
                                        className="bg-transparent outline-none text-sm flex-1"
                                    />
                                </div>
                                <select className="border rounded-lg px-3 py-2 text-sm bg-white">
                                    <option>All Types</option>
                                </select>
                                <select className="border rounded-lg px-3 py-2 text-sm bg-white">
                                    <option>All Status</option>
                                </select>
                            </div>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                + Create New Workspace
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b text-left text-sm text-gray-600">
                                        <th className="pb-3 font-medium">Workspace Name</th>
                                        <th className="pb-3 font-medium">Client</th>
                                        <th className="pb-3 font-medium">Opponent</th>
                                        <th className="pb-3 font-medium">Case</th>
                                        <th className="pb-3 font-medium">Area of Law</th>
                                        <th className="pb-3 font-medium">Timeline</th>
                                        <th className="pb-3 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-4 font-medium">Morgan Acquisition</td>
                                        <td className="py-4">Sarah Chen</td>
                                        <td className="py-4">Chen Sarah</td>
                                        <td className="py-4">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Criminal</span>
                                        </td>
                                        <td className="py-4">Jalandhar</td>
                                        <td className="py-4">
                                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">First hearing done</span>
                                        </td>
                                        <td className="py-4">
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

                        {/* Upgrade Banner */}
                        <div className="bg-slate-800 text-white p-4 rounded-lg mt-6 text-center">
                            <span className="text-sm">📄 Upgrade to add more litigation cases to the workspace</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}