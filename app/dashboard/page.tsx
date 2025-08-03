import Image from "next/image";
import { LogOut , User , MessageSquare, Users, Shield, Settings , Plus} from 'lucide-react';
function DashboardPage(){
    return(
        <div>
            <nav className="flex justify-between items-center px-5 py-5 bg-[#f2f2f2]">
                <div className="flex items-center gap-2">
                    <Image src='/logo.png' alt='logo' width={100} height={100}/>
                </div>
                <div className="flex items-center gap-4">
                    <User size={40} className="text-black bg-white rounded-full p-1" />
                    <button className="flex items-center gap-2 bg-[#ced7de] text-black px-4 py-2 rounded hover:cursor-pointer">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </nav>


            <main className="grid grid-cols-4 p-5 bg-[#d0d8df] gap-10">
                
                <div className="col-span-1">
                    <div className="bg-white p-5 rounded-lg">
                        <h1 className="text-2xl font-bold mb-5">Navigation</h1>
                        <ul className="text-black flex flex-col gap-5">
                            <li><a href="" className="flex items-center gap-2"><MessageSquare size={20} />Messages</a></li>
                            <li><a href="" className="flex items-center gap-2"><Users size={20} />Recipients</a></li>
                            <li><a href="" className="flex items-center gap-2"><Shield size={20} />Trustees</a></li>
                            <li><a href="" className="flex items-center gap-2"><Settings size={20} />Settings</a></li>
                        </ul>
                    </div>
                </div>

                <div className="col-span-3">
                    <div className="bg-white p-5 rounded-lg flex justify-between items-center">
                        <h1>Welcome to the dashboard</h1>
                        <button className="bg-[#ced7de] text-black px-4 py-2 rounded hover:cursor-pointer flex items-center gap-2">
                            <Plus size={20} />
                            New Message
                        </button>
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="bg-white p-5 rounded-lg">
                        <h2>Quick Stats</h2>

                    </div>
                </div>

                <div className="col-span-3">
                    <div className="bg-white p-5 rounded-lg">
                        <h1>Welcome to the dashboard</h1>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardPage;