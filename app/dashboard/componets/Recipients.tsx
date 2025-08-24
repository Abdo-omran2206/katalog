"use client";
import { useEffect, useState } from "react";
import { Search, Phone, User } from 'lucide-react';

interface Recipient {
    username: string;
    phone_number: string;
    message_count: number;
}

function Recipients({ token }: { token: string }) {
    const [recipients, setRecipients] = useState<Recipient[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRecipients = recipients.filter(recipient => {
        const matchesSearch = recipient.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipient.phone_number.includes(searchTerm);
        return matchesSearch;
    });

    async function getRecipients() {
        try {
            const response = await fetch(
                `http://katalog-blond.getenjoyment.net/api/message/recipient.php?token=${encodeURIComponent(token)}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setRecipients(data.data);
            } else {
                console.error("API Error:", data.message || data.error);
            }
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    }

    
    useEffect(()=>{
        getRecipients()
    },[])

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Recipients</h1>
                    <p className="text-gray-600">Manage your message recipients</p>
                </div>
                
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search recipients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-black w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Recipients</p>
                            <p className="text-2xl font-bold text-blue-600">{recipients.length}</p>
                        </div>
                        <User className="text-blue-600" size={24} />
                    </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Messages</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {recipients.reduce((sum, r) => sum + r.message_count, 0)}
                            </p>
                        </div>
                        <Phone className="text-purple-600" size={24} />
                    </div>
                </div>
            </div>

            {/* Recipients Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Messages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecipients.map((recipient,indx) => (
                            <tr key={indx} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <User size={20} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{recipient.username}</p>
                                            <p className="text-sm text-gray-500">ID: {indx}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-gray-400" />
                                        <span className="text-sm text-gray-700">{recipient.phone_number}</span>
                                    </div>
                                </td>
                                
                                <td className="py-4 px-4">
                                    <span className="text-sm font-medium text-gray-900">{recipient.message_count}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredRecipients.length === 0 && (
                <div className="text-center py-8">
                    <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No recipients found matching your search criteria.</p>
                </div>
            )}
        </div>
    );
}

export default Recipients;