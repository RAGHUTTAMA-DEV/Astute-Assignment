export default function Button({input, onClick, type = "button", width = "w-auto", height = "h-auto", variant = "default", disabled = false}){
    
    const getVariantClasses = () => {
        switch(variant) {
            case "primary":
                return "bg-blue-600 text-white border-blue-600 hover:bg-blue-700";
            case "secondary":
                return "bg-gray-600 text-white border-gray-600 hover:bg-gray-700";
            case "success":
                return "bg-green-600 text-white border-green-600 hover:bg-green-700";
            case "danger":
                return "bg-red-600 text-white border-red-600 hover:bg-red-700";
            default:
                return "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
        }
    };
    
    return(
        <div>
            <button 
                className={`rounded-lg border-2 px-4 py-2 transition-colors duration-200 ${getVariantClasses()} ${width} ${height} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={disabled ? undefined : onClick} 
                type={type}
                disabled={disabled}
            >    
                {input}
            </button>
        </div>
    )
}