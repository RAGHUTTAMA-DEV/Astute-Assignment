import { Grid3X3, Users, CreditCard, Settings, MessageCircle, LogOut } from 'lucide-react'

export default function SideBar(){
    return(
        <div className="bg-slate-800 text-white" style={{ width: '230px', height: '1101px' }}>
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
    )
}