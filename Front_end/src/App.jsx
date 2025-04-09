import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:25565'); // Vervang localhost met LAN-IP voor andere users

const ChatApp = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Prompt for username once when component mounts
        const name = prompt('Enter your username');
        if (name) {
            setUsername(name);
            socket.emit('set username', name);
        }

        const handleMessage = (msg) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on('chat message', handleMessage);

        return () => {
            socket.off('chat message', handleMessage);
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('chat message', message);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <div className="w-96 p-4 bg-gray-800 rounded-xl">
                <h1 className="text-xl font-bold mb-4">Vortex Chat</h1>
                <div className="h-64 overflow-y-auto bg-gray-700 p-2 rounded-lg">
                    {messages.map((msg, index) => (
                        <p key={index} className="p-1">
                            <span className="font-semibold text-blue-400">{msg.username}:</span> {msg.message}
                        </p>
                    ))}
                </div>
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="w-full p-2 mt-2 bg-gray-600 rounded" 
                    placeholder="Type a message..." 
                />
                <button 
                    onClick={sendMessage} 
                    className="w-full bg-blue-500 hover:bg-blue-600 mt-2 p-2 rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatApp;
