import { Grid3X3, Users, CreditCard, Settings, MessageCircle, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function SideBar(){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    return(
        <>
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="bg-slate-800 text-white p-2 rounded-lg"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`bg-slate-800 text-white fixed lg:relative lg:block z-40 transition-transform duration-300 ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`} style={{ width: '230px', height: '100vh lg:1101px' }}>
            <div className="p-6" style={{ top: '2px' }}>
                <h1 style={{ 
                    fontFamily: 'Poppins', 
                    fontWeight: '700', 
                    fontSize: '26px', 
                    lineHeight: '100%', 
                    letterSpacing: '0%' 
                }}>LeXi AI</h1>
            </div>
            
            <div className="px-4 space-y-2">
                <div className="flex items-center p-3 rounded hover:bg-slate-700">
                    <Grid3X3 size={20} />
                    <span className="ml-3">Workspaces</span>
                </div>
                
                <div className="flex items-center p-3 rounded hover:bg-slate-700">
                    <Users size={20} />
                    <span className="ml-3">Team Management</span>
                </div>
                
                <div className="flex items-center p-3 rounded hover:bg-slate-700">
                    <CreditCard size={20} />
                    <span className="ml-3">Billings & Plans</span>
                </div>
                
                <div className="flex items-center p-3 rounded hover:bg-slate-700">
                    <Settings size={20} />
                    <span className="ml-3">Settings</span>
                </div>
                
                <div className="flex items-center p-3 rounded hover:bg-slate-700">
                    <MessageCircle size={20} />
                    <span className="ml-3">Contact Admin</span>
                </div>
            </div>
            
            <div className="absolute bottom-4 px-4">
                <div className="flex items-center p-3 rounded hover:bg-slate-700">
                    <LogOut size={20} />
                    <span className="ml-3">Sign Out</span>
                </div>
            </div>
        </div>
        </>
    )
}