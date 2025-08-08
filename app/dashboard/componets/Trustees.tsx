"use client";
import { useState } from "react";
import { Shield, Clock, User, AlertTriangle, CheckCircle, Edit, Save, X } from 'lucide-react';

interface Trustee {
    id: number;
    name: string;
    email: string;
    phone: string;
    relationship: string;
    status: 'active' | 'pending' | 'inactive';
    lastContact?: string;
}

interface VerificationSettings {
    method: 'inactivity' | 'trustee' | 'combined';
    inactivityPeriod: number;
}

function Trustees() {
    const [trustees, setTrustees] = useState<Trustee[]>([
        {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah.johnson@example.com",
            phone: "+1234567890",
            relationship: "Sister",
            status: "active",
            lastContact: "2024-01-15"
        },
        {
            id: 2,
            name: "Michael Chen",
            email: "michael.chen@example.com",
            phone: "+1987654321",
            relationship: "Best Friend",
            status: "active",
            lastContact: "2024-01-10"
        },
        {
            id: 3,
            name: "Emily Davis",
            email: "emily.davis@example.com",
            phone: "+1122334455",
            relationship: "Cousin",
            status: "pending",
            lastContact: "2024-01-08"
        }
    ]);

    const [verificationSettings, setVerificationSettings] = useState<VerificationSettings>({
        method: 'inactivity',
        inactivityPeriod: 6
    });

    const [isEditing, setIsEditing] = useState(false);
    const [checkInStatus, setCheckInStatus] = useState({
        status: 'active',
        lastCheckIn: '2024-01-15'
    });

    const deleteTrustee = (id: number) => {
        setTrustees(trustees.filter(t => t.id !== id));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleCheckIn = () => {
        setCheckInStatus({
            status: 'active',
            lastCheckIn: new Date().toLocaleDateString()
        });
    };

    const saveSettings = () => {
        setIsEditing(false);
        // Here you would typically save to backend
    };

    return (
        <div className="space-y-6">
            {/* Current Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">My Digital Trustee</h1>
                        <p className="text-gray-600">Configure how your passing will be verified to trigger message delivery</p>
                    </div>
                    {!isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-[#ced7de] text-black px-4 py-2 rounded-md hover:bg-[#b8c5cc] transition-colors duration-200"
                        >
                            <Edit size={16} />
                            Edit Settings
                        </button>
                    )}
                </div>

                {!isEditing ? (
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <Shield className="text-orange-600 mt-1" size={24} />
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 mb-2">Inactivity Detection</h3>
                                <p className="text-gray-600 mb-2">Messages are sent after you haven't checked in for a specified period.</p>
                                <p className="text-sm text-gray-500">Inactivity Period: {verificationSettings.inactivityPeriod} months</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Verification Method</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div 
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                        verificationSettings.method === 'inactivity' 
                                            ? 'border-orange-300 bg-orange-50' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => setVerificationSettings({...verificationSettings, method: 'inactivity'})}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Clock className="text-orange-600" size={20} />
                                        <span className="font-medium">Inactivity Detection</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Messages are sent after you haven't checked in for a specified period.</p>
                                </div>

                                <div 
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                        verificationSettings.method === 'trustee' 
                                            ? 'border-orange-300 bg-orange-50' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => setVerificationSettings({...verificationSettings, method: 'trustee'})}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <User className="text-blue-600" size={20} />
                                        <span className="font-medium">Digital Trustee</span>
                                    </div>
                                    <p className="text-sm text-gray-600">A trusted person confirms your passing and triggers message delivery.</p>
                                </div>

                                <div 
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                        verificationSettings.method === 'combined' 
                                            ? 'border-orange-300 bg-orange-50' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => setVerificationSettings({...verificationSettings, method: 'combined'})}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Shield className="text-purple-600" size={20} />
                                        <span className="font-medium">Combined Method</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Uses both inactivity detection and trustee confirmation for added security.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <p className="text-sm text-gray-500 mt-1">How long to wait before considering you inactive.</p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={saveSettings}
                                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Check-in Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Check-in Status</h2>
                
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="text-green-600" size={20} />
                            <span className="font-medium text-gray-800">{checkInStatus.status}</span>
                        </div>
                        <span className="text-sm text-gray-600">Last check-in: {checkInStatus.lastCheckIn}</span>
                    </div>
                    <button 
                        onClick={handleCheckIn}
                        className="px-4 py-2 bg-[#ced7de] text-black rounded-md hover:bg-[#b8c5cc] transition-colors duration-200"
                    >
                        Check In Now
                    </button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                        <div>
                            <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Regular check-ins are required to maintain your active status</li>
                                <li>• You'll receive email reminders before your inactivity period expires</li>
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