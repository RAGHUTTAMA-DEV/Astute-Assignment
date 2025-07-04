import { Search } from 'lucide-react'

export default function Searchbar() {
    return (
        <div className="w-64 h-8 flex items-center rounded-md border border-gray-300 px-2 bg-white">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
                type="text"
                placeholder="Search"
                className="w-full h-full outline-none bg-transparent text-sm"
            />
        </div>
    );
}