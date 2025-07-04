import { Search } from 'lucide-react'

export default function Searchbar() {
    return (
        <div className="w-full sm:w-64 h-10 flex items-center rounded-lg border-2 border-gray-300 px-3 sm:px-4 bg-white hover:border-gray-400 focus-within:border-blue-500 transition-colors duration-200">
            <Search size={18} className="text-gray-400 mr-2 sm:mr-3" />
            <input
                type="text"
                placeholder="Search"
                className="w-full h-full outline-none bg-transparent text-sm placeholder-gray-500"
            />
        </div>
    );
}