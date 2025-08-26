'use client';
export const dynamic = 'force-dynamic';
import Image from "next/image";
import { useRef, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import Swal from "sweetalert2";
interface Content {
    title: string;
    content: string;
    files?: string[];
    submitted_at: string;
}


function ReadMessage() {
    const [messagestate , setmessagestate] = useState<boolean>(false) 
    const [messageContent , setmessageContent] = useState<Content>({
        title: '',
        content: '',
        files: [],
        submitted_at: '',
    })
    const ref = useRef(null);


    async function getmessage(e: React.FormEvent) {
        e.preventDefault();
        const code = document.getElementById('messageCode') as HTMLInputElement;
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

        try {
            // 1. Find the message_id from recepment
            const { data, error } = await supabase
                .from('recepment')
                .select('message_id, username')
                .match({ recepment_code: code.value, sendin: today })
                .single();

            if (error || !data) {
                Swal.fire({
                    title: "Error",
                    text: "No message found for this code.",
                    icon: "error"
                });
                return;
            }

            // 2. Fetch the message itself
            const { data: messageData, error: messageError } = await supabase
                .from('messages')
                .select('message')
                .match({ messageid: data.message_id })
                .single();

            if (messageError || !messageData) {
                Swal.fire({
                    title: "Error",
                    text: "Message not found.",
                    icon: "error"
                });
                return;
            }

            // 3. Remove recipients from the message JSON if exists
            const cleanMessage = messageData.message;
            if (cleanMessage && cleanMessage.recipients) {
                delete cleanMessage.recipients;
            }

            setmessageContent(cleanMessage);
            setmessagestate(true);

            Swal.fire({
                title: "Success",
                text: "Message loaded successfully!",
                icon: "success"
            });

        } catch (err) {
            Swal.fire({
                title: "Unexpected Error",
                text: "Something went wrong.",
                icon: "error"
            });
        }
    }


    function getFileExtension(url: string): string {
        try {
            const cleanUrl = url.split('?')[0].split('#')[0];
            const parts = cleanUrl.split('.');
            if (parts.length < 2) return '';
            return parts.pop()!.toLowerCase();
        } catch {
            return '';
        }
    }

    function getFileKind(url: string): 'image' | 'video' | 'audio' | 'pdf' | 'other' {
        const ext = getFileExtension(url);
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) return 'image';
        if (['mp4', 'webm', 'ogg', 'ogv', 'mov', 'mkv'].includes(ext)) return 'video';
        if (['mp3', 'wav', 'ogg', 'oga', 'm4a', 'aac', 'flac'].includes(ext)) return 'audio';
        if (ext === 'pdf') return 'pdf';
        return 'other';
    }

    function renderFile(url: string, index: number) {
        const kind = getFileKind(url);
        switch (kind) {
            case 'image':
                return (
                    <Image
                        src={url}
                        width={1100}
                        height={1100}
                        alt={`image-${index}`}
                        className="w-full h-auto border rounded-lg shadow"
                        loading="lazy"
                    />
                );
            case 'video':
                return (
                    <video controls className="w-full h-auto border rounded-lg shadow bg-black" preload="metadata">
                        <source src={url} />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'audio':
                return (
                    <audio controls className="w-full">
                        <source src={url} />
                        Your browser does not support the audio element.
                    </audio>
                );
            case 'pdf':
                return (
                    <iframe
                        loading="lazy"
                        src={url}
                        className="w-full h-[600px] border rounded-lg shadow"
                        title={`pdf-${index}`}
                    />
                );
            default:
                return (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-4 py-3 border rounded-lg shadow hover:bg-gray-50 text-blue-600 underline break-all"
                        title={url}
                    >
                        Open file
                    </a>
                );
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {!messagestate ? (
                <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-gray-200 flex flex-col items-center">
                    <Image src='/logo.png' alt='logo' width={120} height={40} className="mb-6 rounded" />
                    <h1 className="text-2xl font-bold text-black mb-2">Read a Message</h1>
                    <p className="mb-6 text-gray-600 text-center" ref={ref}>My deepest condolences for your loss</p>
                    <form className="w-full flex flex-col gap-4" onSubmit={getmessage}>
                        <label htmlFor="messageCode" className="block text-sm font-semibold text-black mb-1">
                            Type message code
                        </label>
                        <input
                            id="messageCode"
                            type="text"
                            className="text-black w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none border-gray-200 focus:border-black bg-gray-100 focus:bg-white"
                            placeholder="Message code"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-semibold text-white bg-black hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl mt-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            ):(
                <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full border border-gray-200 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-black">{messageContent.title}</h1>
            <p className="whitespace-pre-line text-gray-700">{messageContent.content}</p>

            {messageContent.files && messageContent.files.length > 0 && (
                    <div className="mt-4 w-full">
                        <h2 className="text-lg font-semibold text-black mb-2">Files</h2>
                        <ul className="space-y-4">
                            {messageContent.files.map((file: string, index: number) => (
                                <li key={index} className="w-full">
                                    {renderFile(file, index)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


            <p className="mt-4 text-xs text-gray-500">
                Submitted at: {messageContent.submitted_at}
            </p>
        </div>
    
            )}
        </div>
    );
}

export default ReadMessage;