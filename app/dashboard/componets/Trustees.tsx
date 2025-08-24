"use client";
import { useEffect, useState } from "react";
import { Shield, Clock, AlertTriangle, Edit } from 'lucide-react';
import Swal from "sweetalert2";

interface Trustee {
    id: number;
    name: string;
    email: string;
    phone: string;
    relationship: string;
    lastContact?: string;
}

interface VerificationSettings {
    method: 'inactivity' | 'trustee' | 'combined';
    inactivityPeriod: number;
}

function Trustees({ token }: { token: string }) {

    const [verificationSettings, setVerificationSettings] = useState<VerificationSettings>({
        method: 'inactivity',
        inactivityPeriod: 3
    });

    const [isEditing, setIsEditing] = useState(false);
    const [checkInStatus, setCheckInStatus] = useState({
        lastCheckIn: '0000-00-00',
    });

    const handleCheckIn = () => {

        fetch('http://katalog-blond.getenjoyment.net/api/account/trustees.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token : token
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
             Swal.fire({
                title:data.title,
                icon:'success',
                text:data.message
            })
            setCheckInStatus({
                lastCheckIn: data.newDate
            });
        }).catch(err => {
            console.error('Fetch error:', err);
        });

    };

    async function getTrustees() {
        const response = await fetch('http://katalog-blond.getenjoyment.net/api/account/trustees.php?token=' + token,{
            method:'GET',
        })
        const data = await response.json()
        if(data.success){
            const parsetdata =  data.message;
            setVerificationSettings(prev => ({
                ...prev,
                inactivityPeriod:  parsetdata.default// new value
            }));
            setCheckInStatus({
                lastCheckIn: parsetdata.lastcheck
            });
        }
    }

    useEffect(()=>{
        getTrustees()
    },[])

    const saveSettings = () => {
        setIsEditing(false);
        fetch('http://katalog-blond.getenjoyment.net/api/account/trustees.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                updateDefault: verificationSettings.inactivityPeriod
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log('Success:', data);
            Swal.fire({
                title:data.title,
                icon:'success',
                text:data.message
            })
        })
        .catch(err => {
            console.error('Fetch error:', err);
        });

        
        
        // Here you would typically save to backend
    };

    return (
        <div className="space-y-6 max-sm:space-y-4">
            {/* Current Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6 max-sm:p-3">
                <div className="flex justify-between items-center mb-6 max-sm:flex-col max-sm:items-start max-sm:mb-3">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 max-sm:text-lg">My Digital Trustee</h1>
                        <p className="text-gray-600 max-sm:text-sm">Configure how your passing will be verified to trigger message delivery</p>
                    </div>
                    {!isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-[#ced7de] text-black px-4 py-2 rounded-md hover:bg-[#b8c5cc] transition-colors duration-200 max-sm:w-full max-sm:mt-3 max-sm:justify-center max-sm:text-sm"
                        >
                            <Edit size={16} />
                            Edit Settings
                        </button>
                    )}
                </div>

                {!isEditing ? (
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg max-sm:flex-col max-sm:gap-2 max-sm:p-2">
                            <Shield className="text-orange-600 mt-1" size={24} />
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 mb-2 max-sm:text-base">Inactivity Detection</h3>
                                <p className="text-gray-600 mb-2 max-sm:text-sm">Messages are sent after you haven&apos;t checked in for a specified period.</p>
                                <p className="text-sm text-gray-500 max-sm:text-xs">Inactivity Period: {verificationSettings.inactivityPeriod} months</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 max-sm:text-base max-sm:mb-2">Verification Method</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div 
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                        verificationSettings.method === 'inactivity' 
                                            ? 'border-orange-300 bg-orange-50' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    } max-sm:p-2`}
                                    onClick={() => setVerificationSettings({...verificationSettings, method: 'inactivity'})}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Clock className="text-orange-600" size={20} />
                                        <span className="font-medium text-black max-sm:text-sm">Inactivity Detection</span>
                                    </div>
                                    <p className="text-sm text-gray-600 max-sm:text-xs">Messages are sent after you haven&apos;t checked in for a specified period.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2 max-sm:text-xs">
                                Inactivity Period (months)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="24"
                                value={verificationSettings.inactivityPeriod}
                                onChange={(e) => setVerificationSettings({
                                    ...verificationSettings, 
                                    inactivityPeriod: parseInt(e.target.value)
                                })}
                                className="text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent max-sm:w-full max-sm:text-sm"
                            />
                            <p className="text-sm text-black mt-1 max-sm:text-xs">How long to wait before considering you inactive.</p>
                        </div>

                        <div className="flex gap-3 pt-4 max-sm:flex-col max-sm:gap-2">
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors max-sm:w-full max-sm:text-sm"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={saveSettings}
                                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors max-sm:w-full max-sm:text-sm"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Check-in Status */}
            <div className="bg-white rounded-lg shadow-sm p-6 max-sm:p-3">
                <h2 className="text-xl font-bold text-gray-800 mb-4 max-sm:text-lg max-sm:mb-2">Check-in Status</h2>
                
                <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:mb-2">
                    <div className="flex items-center gap-3 max-sm:mb-2">
                        <div className="flex items-center gap-2">
                        </div>
                        <span className="text-sm text-gray-600 max-sm:text-xs">Last check-in: {checkInStatus.lastCheckIn}</span>
                    </div>
                    <button 
                        onClick={handleCheckIn}
                        className="px-4 py-2 bg-[#ced7de] text-black rounded-md hover:bg-[#b8c5cc] transition-colors duration-200 max-sm:w-full max-sm:text-sm"
                    >
                        Check In Now
                    </button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-sm:p-2">
                    <div className="flex items-start gap-3 max-sm:flex-col max-sm:gap-2">
                        <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                        <div>
                            <h4 className="font-medium text-yellow-800 mb-2 max-sm:text-base">Important Notes</h4>
                            <ul className="text-sm text-yellow-700 space-y-1 max-sm:text-xs">
                                <li>• Regular check-ins are required to maintain your active status</li>
                                <li>• You&apos;ll receive email reminders before your inactivity period expires</li>
                                <li>• Your digital trustee will be notified if you become inactive</li>
                                <li>• Messages will only be sent after proper death verification</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trustees;