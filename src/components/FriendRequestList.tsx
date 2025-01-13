"use client";

import { actionFollowRequest, declineFollowRequest } from '@/lib/action';
import Image from 'next/image';
import React, { useOptimistic, useState } from 'react';

type FriendRequest = {
    id: number;
    senderId: string;
    senderUsername: string;
    senderAvatar: string;
};

function FriendsRequestList({ request }: { request: FriendRequest[] }) {
    console.log(">>>", request);

    const [reqState, setReqState] = useState(request);

    const accept = async (requestId: number, userId: string) => {
        removeOptimisticReq(requestId)
        try {
            await actionFollowRequest(userId);
            setReqState(prev => prev.filter(req => req.id !== requestId))
        } catch (error) {
        }
    }

    const decline = async (requestId: number, userId: string) => {
        removeOptimisticReq(requestId)
        try {
            await declineFollowRequest(userId);
            setReqState(prev => prev.filter(req => req.id !== requestId))
        } catch (error) {
        }
    }

    const [optimisticReq, removeOptimisticReq] = useOptimistic(
        reqState,
        (state, value: number) => state.filter((req) => req.id !== value));

    if (request.length === 0) return <div>No Requests</div>

    return (
        <div>
            {optimisticReq.map((req) => (
                <div
                    key={req.id}
                    className="flex justify-between items-center mb-4 border-b pb-2"
                >
                    <div className="flex items-center gap-4">
                        <Image
                            src={req.senderAvatar || "/noAvatar.png"} // Use a default image if avatar is missing
                            width={40}
                            height={40}
                            alt={req.senderUsername}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span>{req.senderUsername}</span>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <form action={() => accept(req.id, req.senderId)}>
                            <button>
                                <Image
                                    src="/accept.png"
                                    alt="Accept"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                            </button>
                        </form>

                        <form action={() => decline(req.id, req.senderId)}>
                            <button>
                                <Image
                                    src="/reject.png"
                                    alt="Reject"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FriendsRequestList;
