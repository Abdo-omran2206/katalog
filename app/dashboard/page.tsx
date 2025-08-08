"use client";
import Image from "next/image";
import { LogOut , User , MessageSquare, Users, Shield, Settings , Home, Clock, CheckCircle} from 'lucide-react';
import { useRouter } from "next/navigation";
import Maincontent from "./componets/maincontent";
import Messages from "./componets/Messages";
import Recipients from "./componets/Recipients";
import Trustees from "./componets/Trustees";
import Setting from "./componets/Settings";
import { useEffect, useState } from "react";

function DashboardPage(){
    const router = useRouter();
    const [content , setcontent] = useState('Home');

    async function getProfile() {
        try {
            const response = await fetch('http://localhost/api/account/profile.php', {
                credentials: 'include',
            });
            const data = await response.json();

            if (data.success) {
                if (data.userinfo) {
                    // If message is a JSON string, parse it   
                } else {
                    console.log('User info:', data.user);
                }
            } else {
                console.warn('Profile fetch not successful:', data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    const renderContent = () => {
        switch (content) {
            case 'Home':
                return <Maincontent />;
            case 'Messages':
                return <Messages />;
            case 'Recipients':
                return <Recipients />;
            case 'Trustees':
                return <Trustees />;
            case 'Settings':
                return <Setting />;
            default:
                return null;
        }
    };
    useEffect(() =>{
        getProfile();
    },[]) 

    const logout = () =>{
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        router.replace('/login');
    }

    return(
        <div className="min-h-screen bg-[#d0d8df]">
            <header>
                <nav className="flex justify-between items-center px-5 py-5 bg-[#f2f2f2] shadow-sm">
                    <div className="flex items-center gap-2">
                        <Image src='/logo.png' alt='logo' width={100} height={100}/>
                    </div>
                    <div className="flex items-center gap-4">
                        <User size={40} className="text-black bg-white rounded-full p-1 shadow-sm hover:shadow-md transition-shadow cursor-pointer" />
                        <button onClick={logout} className="flex items-center gap-2 bg-[#ced7de] text-black px-4 py-2 rounded hover:bg-[#b8c5cc] transition-colors duration-200">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </nav>
            </header>
            
            <main className="grid grid-cols-[260px_1fr] p-5 gap-6 max-w-7xl mx-auto max-sm:flex max-sm:flex-col-reverse">
                
                <div className="flex flex-col gap-5">
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Navigation</h1>
                        <ul className="text-black flex flex-col gap-4">
                            <li>
                                <a onClick={() => setcontent('Home')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    <Home size={20} className="text-blue-600" />
                                    <span className="font-medium cursor-context-menu">Home</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setcontent('Messages')}className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    <MessageSquare size={20} className="text-blue-600" />
                                    <span className="font-medium cursor-context-menu">Messages</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setcontent('Recipients')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    <Users size={20} className="text-green-600" />
                                    <span className="font-medium cursor-context-menu">Recipients</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setcontent('Trustees')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    <Shield size={20} className="text-purple-600" />
                                    <span className="font-medium cursor-context-menu">Trustees</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setcontent('Settings')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    <Settings size={20} className="text-gray-600" />
                                    <span className="font-medium cursor-context-menu">Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="">
                        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Stats</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Messages</p>
                                        <p className="text-2xl font-bold text-blue-600">24</p>
                                    </div>
                                    <CheckCircle size={20} className="text-green-600" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-600">Delivered</p>
                                        <p className="text-2xl font-bold text-green-600">18</p>
                                    </div>
                                    <Clock size={20} className="text-yellow-600" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-600">Pending</p>
                                        <p className="text-2xl font-bold text-yellow-600">6</p>
                                    </div>
                                    <Clock size={24} className="text-yellow-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                

            {renderContent()} 
            </main>
        </div>
    )
}

export default DashboardPage;