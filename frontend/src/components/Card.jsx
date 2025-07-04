export default function Card(){
    return(
        <div className="bg-white rounded-lg border-2 border-blue-500 p-4 w-64">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Total Workspaces</span>
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">4</div>
            <div className="text-sm text-green-600 mt-1">▲ 12% from last month</div>
        </div>
    )
}