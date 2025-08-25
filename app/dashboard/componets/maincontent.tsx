"use client";
import { Users, Plus, CheckCircle} from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

interface MessageData {
    title: string;
    body: string;
    recipients: Array<{
        name: string;
        number: string;
    }>;
    files: string[];
    submitted_at: string;
}

interface Message {
    message: string; // This is a JSON string that needs to be parsed
}

function Maincontent({ token }: { token: string }) {
    const router = useRouter();
    const [contentM, setcontentM] = useState<MessageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function getMessages(){
        try {
            const response = await fetch('http://localhost/api/message/getmessage.php?token='+token,{
                method:'GET',
            });

            const data = await response.json();
            
            if(data.success){
                // Parse each message's JSON string into actual objects
                const parsedMessages = data.messages.map((msg: Message) => {
                    try {
                        return JSON.parse(msg.message);
                    } catch (parseError) {
                        console.error('Error parsing message:', parseError);
                        return null;
                    }
                }).filter(Boolean); // Remove any null values from failed parsing
                
                // Get only the latest 3 messages (most recent first)
                const latestMessages = parsedMessages.slice(-3).reverse();
                setcontentM(latestMessages);
                setError(null);
            } else {
                setError(data.message || 'Failed to fetch messages');
            }
        } catch (err) {
            setError('Failed to fetch messages');
            console.error('Error fetching messages:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMessages();
    }, []);
    
    const navigatetocraete = () =>{
        router.push("/dashboard/create")
    }
    
    return(
        <div className="flex flex-col gap-5 max-sm:gap-3">
                    <div className="">
                        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:p-4">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-800 mb-2 max-sm:text-2xl">Welcome back!</h1>
                                <p className="text-gray-600 max-sm:text-sm">Here&apos;s what&apos;s happening with your messages today.</p>
                            </div>
                            <button
                            onClick={navigatetocraete}
                            className="bg-[#ced7de] text-black px-6 py-3 rounded-lg hover:bg-[#b8c5cc] transition-colors duration-200 flex items-center gap-2 font-medium hover:cursor-pointer max-sm:w-full max-sm:mt-4 max-sm:px-3 max-sm:py-2 max-sm:text-sm max-sm:text-center max-sm:justify-center">
                                <Plus size={20} />
                                New Message
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-800">Latest Messages</h1>
                        </div>
                        
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                                    <p className="text-gray-600 mt-2">Loading messages...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-8">
                                    <p className="text-red-600">{error}</p>
                                    <button 
                                        onClick={getMessages}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : contentM.length > 0 ? (
                                contentM.map((message, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800">{message.title}</h3>
                                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                                    {message.body.length > 80 ? `${message.body.substring(0, 80)}...` : message.body}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <CheckCircle size={16} className="text-green-600" />
                                                    <span className="text-sm text-green-600">Scheduled</span>
                                                </div>
                                                {message.files && message.files.length > 0 && (
                                                    <div className="mt-2">
                                                        <span className="text-xs text-gray-500">📎 {message.files.length} attachment(s)</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className="text-sm text-gray-500">{new Date(message.submitted_at).toLocaleDateString()}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Users size={14} className="text-gray-400" />
                                                    <span className="text-xs text-gray-500">{message.recipients.length} recipient(s)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No messages available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
    )
}

export default Maincontent;