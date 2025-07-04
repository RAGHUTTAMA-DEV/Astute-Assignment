import React from 'react';

export default function InfoCard({ 
    caseType = "Criminal", 
    title = "Johnson & Partners Merger", 
    firm = "Johnson & Partners LLP",
    createdDate = "May 2, 2025",
    lastActive = "2 hours ago",
    documentsCount = 12,
    drafts = 3,
    inReview = 1,
    completed = 0,
    teamMembers = ["JD", "ML", "RK"],
    additionalMembers = 2,
    onOpen = () => {},
    onMenuClick = () => {}
}) {
    return (
        <div className="bg-white rounded-lg border-2 border-blue-400 p-4 max-w-sm">
            {/* Case Type Badge */}
            <div className="mb-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {caseType}
                </span>
            </div>

            {/* Title and Firm */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{firm}</p>
            </div>

            {/* Meta Information */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Created: {createdDate}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Last active: {lastActive}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{documentsCount} documents processed</span>
                </div>
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {drafts} Drafts
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {inReview} In Review
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {completed} Completed
                </span>
            </div>

            {/* Team Members */}
            <div className="flex items-center mb-4">
                <div className="flex -space-x-2">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index}
                            className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
                        >
                            {member}
                        </div>
                    ))}
                    {additionalMembers > 0 && (
                        <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                            +{additionalMembers}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
                <button 
                    onClick={onOpen}
                    className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                    <span>Open</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
                
                <button 
                    onClick={onMenuClick}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <circle cx="8" cy="3" r="1.5"/>
                        <circle cx="8" cy="8" r="1.5"/>
                        <circle cx="8" cy="13" r="1.5"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}