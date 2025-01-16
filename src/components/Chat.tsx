import React, { useEffect, useState } from 'react';
import { currentUserFetch, fetchMessages, userFetch } from '@/lib/action';

interface Message {
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
}

interface ChatProps {
    chatUser: string;
    senderId: string;
    receiverId: string;
    onSendMessage: (receiverId: string, message: string) => void;
    onClose: () => void;
}

const Chat = ({ chatUser, senderId, receiverId, onSendMessage, onClose }: ChatProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [receiverUser, setReceiverUser] = useState('');

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const history = await fetchMessages(senderId, receiverId);
                const userCurrent = await currentUserFetch();
                setMessages(history);
                setCurrentUser(userCurrent);
                const receiver = await userFetch(receiverId);
                setReceiverUser(receiver);
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        fetchChatHistory();
    }, [senderId, receiverId, messages]);

    const handleSend = () => {
        if (newMessage.trim()) {
            const optimisticMessage = {
                senderId,
                receiverId,
                message: newMessage,
                createdAt: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, optimisticMessage]);
            onSendMessage(receiverId, newMessage);
            setNewMessage('');
        }
    };

    function DateTimeStr(createdAt: string | number | Date) {
        // Convert to a Date object
        const date = new Date(createdAt);

        // Get the day abbreviation (e.g., Thu)
        const day = date.toLocaleDateString([], { weekday: 'short' });

        // Get the hour and minute
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        // Combine day and time
        return `${day} ${time}`;
    }

    console.log(">>>messages", messages);
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-end z-50">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg flex flex-col overflow-hidden md:w-4/5 sm:w-full mr-10">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
                    <span className="font-semibold text-lg">Chat with {chatUser}</span>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition-colors"
                        aria-label="Close chat"
                    >
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[70vh] bg-gray-50 custom-scrollbar">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.senderId === currentUser || msg.senderId === 'userId' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`flex flex-col max-w-[320px] leading-1.5 p-4 border border-gray-200 rounded-3xl ${msg.senderId === currentUser || msg.senderId === 'userId'
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white rounded-bl-none'
                                    }`}
                            >
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold">
                                        {msg.senderId === currentUser || msg.senderId === 'userId' ? 'You' : chatUser}
                                    </span>
                                    <small className="text-sm font-normal text-gray-200">
                                        {DateTimeStr(msg.createdAt)}
                                    </small>
                                </div>
                                <p className="text-sm font-normal py-2.5">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="bg-gray-100 p-4 flex items-center gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                        onClick={handleSend}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
