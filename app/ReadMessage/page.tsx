import Image from "next/image";
function ReadMessage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-gray-200 flex flex-col items-center">
                <Image src='/logo.png' alt='logo' width={120} height={40} className="mb-6 rounded" />
                <h1 className="text-2xl font-bold text-black mb-2">Read a Message</h1>
                <p className="mb-6 text-gray-600 text-center">My deepest condolences for your loss</p>
                <form className="w-full flex flex-col gap-4">
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
        </div>
    );
}

export default ReadMessage;