"use client"
import Image from "next/image";
import { ArrowLeft, Plus, X, Upload } from 'lucide-react'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";


function CreateMessage(){
    const router = useRouter();
    const [recipients, setRecipients] = useState([
        { id: 1, name: '', phone: '' }
    ]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigatetocraete = () =>{
        router.push("/dashboard")
    }

    const addRecipient = () => {
        const newId = recipients.length > 0 ? Math.max(...recipients.map(r => r.id)) + 1 : 1;
        setRecipients([...recipients, { id: newId, name: '', phone: '' }]);
    };

    const removeRecipient = (id: number) => {
        if (recipients.length > 1) {
            setRecipients(recipients.filter(r => r.id !== id));
        }
    };

    const updateRecipient = (id: number, field: 'name' | 'phone', value: string) => {
        setRecipients(recipients.map(r => 
            r.id === id ? { ...r, [field]: value } : r
        ));
    };

    const handleFileSelect = (files: FileList | null) => {
        if (files) {
            const fileArray = Array.from(files);
            setSelectedFiles(prev => [...prev, ...fileArray]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        handleFileSelect(files);
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData();
        
        // Add form fields
        const titleInput = document.getElementById('title') as HTMLInputElement;
        const messageInput = document.getElementById('content') as HTMLTextAreaElement;
        
        formData.append('title', titleInput.value);
        formData.append('message', messageInput.value);
        
        // Add recipients
        recipients.forEach((recipient, index) => {
            formData.append(`recepment_name_${index}`, recipient.name);
            formData.append(`recepment_number_${index}`, recipient.phone);
        });
        
        // Add files
        selectedFiles.forEach((file) => {
            formData.append('files[]', file);
        });
        console.log(formData);
        try {
            const response = await fetch('http://katalog-blond.getenjoyment.net/api/message/createmessage.php?token=' + getCookie('token'), {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                if(result.success){
                    Swal.fire({
                        title:'message saved',
                        icon:'success',
                        text:result.message
                    }).then(() => {
                        router.replace("/dashboard");
                    });
                }else{
                    Swal.fire({
                        title:'message not svaed',
                        icon:'error',
                        text:result.message
                    })
                }
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="min-h-screen bg-[#d0d8df]">
            <header>
                <nav className="flex justify-between items-center px-2 py-5 bg-[#f2f2f2] shadow-sm">

                    <div className="flex items-center gap-5">
                        <button 
                        onClick={navigatetocraete}
                        className="text-black flex items-center gap-3 hover:cursor-pointer hover:bg-white px-5 py-2 rounded-xl transition duration-200 max-sm:text-sm"> <ArrowLeft size={20}/> Back to Dashboard</button>
                        <Image src='/logo.png' alt='logo' width={100} height={100}/>
                    </div> 
                </nav>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8 max-sm:px-2 max-sm:py-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-sm:p-3">
                    <h1 className="text-3xl font-bold mb-2 max-sm:text-xl">Create New Message</h1>
                    <p className="mb-8 max-sm:text-sm">Create a heartfelt message that will be delivered to your loved ones</p>
                    
                    <form className="space-y-8 max-sm:space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <label htmlFor="title" className="block text-sm font-medium text-black max-sm:text-xs">Message Title</label>
                            <input 
                                type="text" 
                                id="title"
                                name="title"
                                required
                                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-sm:text-sm"
                                placeholder="Enter your message title"
                            />
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="content" className="block text-sm font-medium text-black max-sm:text-xs">Message Content</label>
                            <textarea 
                                name="message" 
                                id="content"
                                rows={6}
                                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-sm:text-sm"
                                placeholder="Write your heartfelt message here..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-black max-sm:text-xs">Add files (image, audio, video)</label>
                            
                            <div
                                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                                    isDragOver 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-300 hover:border-gray-400'
                                } max-sm:p-3`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4 max-sm:h-8 max-sm:w-8" />
                                <p className="text-gray-600 mb-4 max-sm:text-xs">Click to upload your image file or drag and drop</p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,audio/*,video/*"
                                    onChange={(e) => handleFileSelect(e.target.files)}
                                    className="hidden"
                                    id="file-upload"
                                    name="files"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer max-sm:text-xs max-sm:px-2 max-sm:py-1"
                                >
                                    Choose File
                                </label>
                            </div>

                            {selectedFiles.length > 0 && (
                                <div className="mt-4 max-sm:mt-2">
                                    <h4 className="text-sm font-medium text-black mb-2 max-sm:text-xs">Selected Files:</h4>
                                    <div className="space-y-2">
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md max-sm:text-xs max-sm:p-1">
                                                <span className="text-sm text-gray-700 max-sm:text-xs">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-2">
                                <h2 className="text-lg font-semibold text-gray-800 max-sm:text-base">Recipients</h2>
                                <button
                                    type="button"
                                    onClick={addRecipient}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#ced7de] text-black rounded-md hover:bg-[#b8c5cc] transition duration-200 max-sm:w-full max-sm:justify-center max-sm:text-sm"
                                >
                                    <Plus size={16} />
                                    Add Recipient
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {recipients.map((recipient) => (
                                    <div key={recipient.id} className="flex gap-4 items-start max-sm:flex-col max-sm:gap-2">
                                        <div className="flex-1 w-full">
                                            <label className="block text-sm font-medium text-black mb-1 max-sm:text-xs">Name</label>
                                            <input
                                                type="text"
                                                placeholder="Recipient's name"
                                                name="recepment_name"
                                                required
                                                value={recipient.name}
                                                onChange={(e) => updateRecipient(recipient.id, 'name', e.target.value)}
                                                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-sm:text-sm"
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label className="block text-sm font-medium text-black mb-1 max-sm:text-xs">
                                                Phone number *<span className="text-green-600 font-bold">(WhatsApp)</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="recepment_number"
                                                placeholder="Phone number"
                                                maxLength={12}
                                                minLength={11}
                                                required
                                                value={recipient.phone}
                                                onChange={(e) => updateRecipient(recipient.id, 'phone', e.target.value)}
                                                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeRecipient(recipient.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition duration-200 mt-6 max-sm:mt-2"
                                            disabled={recipients.length === 1}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 max-sm:pt-3">
                            <button 
                                type="submit"
                                className="w-full bg-[#ced7de] text-black py-3 px-6 rounded-md hover:bg-[#b8c5cc] transition duration-200 font-medium hover:cursor-pointer max-sm:text-sm"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Create Message'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default CreateMessage;