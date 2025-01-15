'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useOptimistic } from 'react';
import Chat from './Chat.tsx';
import { getFriendRequests, sendMessage } from '@/lib/action';
import { auth } from '@clerk/nextjs/server';

const Friends = () => {
    const [currentChatUser, setCurrentChatUser] = useState<{ id: string; username: string } | null>(null);
    const [mergedConnections, setMergedConnections] = useState<any[]>([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            const data = await getFriendRequests();
            setMergedConnections(data);
        };

        fetchFriendRequests();
    }, []);

    const handleSendMessage = async (receiverId: string, message: string) => {
        try {
            await sendMessage('userId', receiverId, message); // Replace 'userId' with actual user ID
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-md text-sm flex flex-col gap-4">
            <div className="font-medium">
                <span className="text-gray-500">Friends</span>
                <div className="mt-4">
                    {mergedConnections.map((friend) => (
                        <div className="flex items-center justify-between gap-4 mt-2" key={friend.id}>
                            <div className="flex items-center gap-4">
                                <Image
                                    src={friend.avatar || '/noAvatar.png'}
                                    width={40}
                                    height={40}
                                    alt={friend.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <span>{friend.username}</span>
                                    <span className="text-xs text-gray-400">
                                        {friend.type === 'follower'
                                            ? 'follows you'
                                            : friend.type === 'following'
                                            ? 'you are following'
                                            : friend.type === 'mutual'
                                            ? 'mutually connected'
                                            : ''}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="cursor-pointer"
                                onClick={() => setCurrentChatUser({ id: friend.id, username: friend.username })}
                            >
                                <Image src="/messages.png" alt="Message" width={20} height={20} />
                            </div>
                        </div>
                    ))}
                    {mergedConnections.length === 0 && <span>No Friends</span>}
                </div>
            </div>

            {currentChatUser && (
                <Chat
                    chatUser={currentChatUser.username}
                    senderId={'userId'} // Replace with actual user ID
                    receiverId={currentChatUser.id}
                    onSendMessage={handleSendMessage}
                    onClose={() => setCurrentChatUser(null)}
                />
            )}
        </div>
    );
};

export default Friends;
