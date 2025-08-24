'use client';
import Image from "next/image";
import { useRef, useState } from "react";

interface Content {
    title: string;
    body: string;
    files?: string[];
    submitted_at: string;
}


function ReadMessage() {
    const [messagestate , setmessagestate] = useState<boolean>(false) 
    const [messageContent , setmessageContent] = useState<Content>({
        title: '',
        body: '',
        files: [],
        submitted_at: '',
    })
    const ref = useRef(null);


    function getmessage(e: React.FormEvent){
        e.preventDefault();
        const code = document.getElementById('messageCode') as HTMLInputElement;
        fetch('http://katalog-blond.getenjoyment.net/api/message/readmessage.php',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                message_code:code.value
            })
        }).then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            const content = JSON.parse(data).message
            setmessageContent(JSON.parse(content.message))
            setmessagestate(true)
        })
        .catch(err => {
            console.error('Fetch error:', err);
        });
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
            <p className="whitespace-pre-line text-gray-700">{messageContent.body}</p>

            {messageContent.files && messageContent.files.length > 0 && (
                    <div className="mt-4 w-full">
                        <h2 className="text-lg font-semibold text-black mb-2">Files</h2>
                        <ul className="space-y-4">
                            {messageContent.files.map((file: string, index: number) => (
                                <li key={index} className="w-full">
                                    {/* <iframe
                                        src={file}
                                        className="w-full h-64 border rounded-lg shadow"
                                        title={`file-${index}`}
                                   /> */}
                                   <a className="text-blue-600 hover:underline" target="_blank" href={file}>file : {index}</a>
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