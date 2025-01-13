"use server"

import { acceptFollowReq, createFollowReq, deleteFollow, deleteFollowReq, getIsFollowed, getIsFollowReqRes } from "@/api/utils";
import { auth } from "@clerk/nextjs/server";

export const switchFollow = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error("User is not authenticated!");
    }

    try {
        const response = await getIsFollowed({
            followerId: currentUserId,
            followingId: userId
        });
        const existingFollow = response.data;
        console.log("existingFollow", existingFollow);

        if (existingFollow && existingFollow.id) {
            await deleteFollow({
                id: existingFollow.id
            });
        } else {
            const response = await getIsFollowReqRes({
                senderId: currentUserId,
                receiverId: userId
            });
            const existingFollowRequest = response.data;
            console.log("existingFollowRequest", existingFollowRequest);

            if (existingFollowRequest && existingFollowRequest.id) {
                await deleteFollowReq({
                    id: existingFollowRequest.id
                });
            } else {
                await createFollowReq({
                    senderId: currentUserId,
                    receiverId: userId
                })
            }
        }
    } catch (err) {
        console.log(err);
        throw new Error("Something went wrong!");
    }
};

export const actionFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth();
    try {
        if (!currentUserId) {
            throw new Error("User is not authenticated!");
        }
        const response = await acceptFollowReq({
            senderId: userId,
            receiverId: currentUserId
        });
        const accpeted = response.data;
        console.log("existingFollowRequest", accpeted);
    } catch (error) {
        console.log(error);
    }
}

export const declineFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth();
    try {
        if (!currentUserId) {
            throw new Error("User is not authenticated!");
        }
        console.log(currentUserId, userId);
        
        const response = await getIsFollowReqRes({
            senderId: userId,
            receiverId: currentUserId
        });
        const existingFollowRequest = response.data;
        console.log("existingFollowRequest", existingFollowRequest);

        if (existingFollowRequest && existingFollowRequest.id) {
            await deleteFollowReq({
                id: existingFollowRequest.id
            });
        }
    } catch (error) {
        console.log(error);
    }
}