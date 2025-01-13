"use server"

import { acceptFollowReq, createFollowReq, deleteFollow, deleteFollowReq, getIsFollowed, getIsFollowReqRes, updateUserReq } from "@/api/utils";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

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

export const updateProfile = async (
    prevState: { success: boolean, error: boolean },
    payload: { formData: FormData, cover: string }) => {

    const { formData, cover } = payload;
    const fields = Object.fromEntries(formData);
    console.log(fields)

    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== "")
    );

    const Profile = z.object({
        cover: z.string().optional(),
        name: z.string().max(60).optional(),
        surname: z.string().max(60).optional(),
        description: z.string().max(255).optional(),
        city: z.string().max(60).optional(),
        school: z.string().max(60).optional(),
        work: z.string().max(60).optional(),
        website: z.string().max(60).optional(),
    });

    const validatedFields = Profile.safeParse({ ...filteredFields, cover });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return {success:false, error:true}
    }

    const { userId } = auth();

    if (!userId) {
        return {success:false, error:true}
    }

    const data = {
        id: userId,
        ...validatedFields.data
    }

    console.log(data);
    
    await updateUserReq(data);
    
    return {success:true, error:false}
}