"use client";
import Image from "next/image";
import { LogOut , User , MessageSquare, Users, Shield , Home} from 'lucide-react';
import { useRouter } from "next/navigation";
import Maincontent from "./componets/maincontent";
import Messages from "./componets/Messages";
import Recipients from "./componets/Recipients";
import Trustees from "./componets/Trustees";
// import Setting from "./componets/Settings";, Settings
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Userinfo{
    username: string,
    gender: string,
    email: string
}

function DashboardPage(){
    const router = useRouter();
    const [content , setcontent] = useState('Home');
    const [thercookie, setthercookie] = useState<boolean>(true);
    const [userinfo, setuserinfo] = useState<Userinfo>({
        username: '',
        gender: '',
        email: ''
    });
    function getCookie(name: string): string {
      if (typeof window === "undefined") {
        return '';
      }
      if (window.localStorage.getItem('remember') === "true") {
        return window.localStorage.getItem(name) || '';
      } else {
        return window.sessionStorage.getItem(name) || '';
      }
    }

    async function getProfile() {
        try {
            const response = await fetch(`http://katalog-blond.getenjoyment.net/api/account/profile.php?token=${getCookie('token')}`, {
                method: 'GET',
            });
          console.log('Profile fetch response:', response);
            const data = await response.json();

            if (data.success) {
                if (data.userinfo) {
                    const parsedata = JSON.parse(data.userinfo);
                    setuserinfo(parsedata.user)
                    setthercookie(true)
                }
            } else {
                console.warn('Profile fetch not successful:', data);
                setthercookie(false)
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    const renderContent = () => {
        switch (content) {
            case 'Home':
                return <Maincontent token={getCookie('token')} />;
            case 'Messages':
                return <Messages token={getCookie('token')}/>;
            case 'Recipients':
                return <Recipients token={getCookie('token')}/>;
            case 'Trustees':
                return <Trustees token={getCookie('token')}/>;
            // case 'Settings':
            //     return <Setting />;
            default:
                return null;
        }
    };

    useEffect(() =>{
        getProfile();
    },[]) 

    const logout = () =>{
        if(localStorage.getItem('remember') === "true"){
          localStorage.removeItem('token');
        }else{
          sessionStorage.removeItem('token');
        }
        router.replace('/login');
    }

    const showUserDitails = () => {
        Swal.fire({
            title: '<span class="text-2xl font-bold text-gray-800">User Information</span>',
            html: `
                <div class="text-left space-y-3">
                    <p class="text-lg"><strong class="text-gray-600">Username:</strong> <span class="text-gray-900">${userinfo.username}</span></p>
                    <p class="text-lg"><strong class="text-gray-600">Gender:</strong> <span class="capitalize text-blue-600">${userinfo.gender}</span></p>
                    <p class="text-lg"><strong class="text-gray-600">Email:</strong> <span class="text-gray-900">${userinfo.email}</span></p>
                </div>
            `,
            icon: 'info',
            background: '#f9fafb', // لون خلفية فاتح
            showCancelButton: true,
            confirmButtonText: '<span class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete Account</span>',
            cancelButtonText: '<span class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Close</span>',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-2xl shadow-xl p-6',
                confirmButton: '!bg-transparent !border-none !shadow-none',
                cancelButton: '!bg-transparent !border-none !shadow-none'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // تنفيذ حذف الحساب
                Swal.fire({
                    title: 'Are you sure?',
                    text: "This action cannot be undone!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#dc2626',
                    cancelButtonColor: '#6b7280',
                    confirmButtonText: 'Yes, delete it!'
                }).then((deleteResult) => {
                    if (deleteResult.isConfirmed) {
                        // API call لحذف الحساب
                        console.log("Account deleted");
                        Swal.fire(
                            'Deleted!',
                            'Your account has been deleted.',
                            'success'
                        );
                    }
                });
            }
});


    }

    
    return(
        <div className="min-h-screen bg-[#d0d8df]">
            {thercookie ? (
              <>
                <header>
                  <nav className="flex justify-between items-center px-5 py-5 bg-[#f2f2f2] shadow-sm">
                    <div className="flex items-center gap-2">
                      <Image src='/logo.png' alt='logo' width={100} height={100} onClick={()=>{router.replace('/')}}/>
                    </div>
                    <div className="flex items-center gap-4">
                      <User size={40} className="text-black bg-white rounded-full p-1 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={showUserDitails}/>
                      <button onClick={logout} className="flex items-center gap-2 bg-[#ced7de] text-black px-4 py-2 rounded hover:bg-[#b8c5cc] transition-colors duration-200">
                        <LogOut size={20} />
                        Logout
                      </button>
                    </div>
                  </nav>
                </header>
                <main className="grid grid-cols-[260px_1fr] p-5 gap-6 max-w-7xl mx-auto max-sm:flex max-sm:flex-col">
                  <div className="flex flex-col gap-5 max-sm:flex-row max-sm:w-full">
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow max-sm:w-full">
                      <h1 className="text-2xl font-bold mb-6 text-gray-800 max-sm:hidden">Navigation</h1>
                      <ul className="text-black flex flex-col gap-4 max-sm:flex-row max-sm:justify-between">
                        <li>
                          <a onClick={() => setcontent('Home')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <Home size={20} className="text-blue-600" />
                            <span className="font-medium cursor-context-menu w-0 max-sm:hidden">Home</span>
                          </a>
                        </li>
                        <li>
                          <a onClick={() => setcontent('Messages')}className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <MessageSquare size={20} className="text-blue-600" />
                            <span className="font-medium cursor-context-menu max-sm:hidden">Messages</span>
                          </a>
                        </li>
                        <li>
                          <a onClick={() => setcontent('Recipients')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <Users size={20} className="text-green-600" />
                            <span className="font-medium cursor-context-menu max-sm:hidden">Recipients</span>
                          </a>
                        </li>
                        <li>
                          <a onClick={() => setcontent('Trustees')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <Shield size={20} className="text-purple-600" />
                            <span className="font-medium cursor-context-menu max-sm:hidden">Trustees</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {renderContent()} 
                </main>
              </>
            ) : (
              <div className="min-h-screen flex items-center justify-center bg-[#d0d8df]">
                <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4">No Account Found</h2>
                  <p className="text-gray-600 text-base mb-6 text-center">
                    You don&apos;t have an account. Please login to continue.
                  </p>
                  <button
                    onClick={() => router.push('/login')}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-black hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
        </div>
    )
}

export default DashboardPage;