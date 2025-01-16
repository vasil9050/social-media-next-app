"use server"

import { acceptFollowReq, addPostReq, createFollowReq, createLikeReq, deleteFollow, deleteFollowReq, deleteLikeReq, deletePostReq, getAllUserReq, getChats, getFriendsReq, getIsFollowed, getIsFollowReqRes, getLikeReq, getUserReq, sendMessageReq, updateUserReq } from "@/api/utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
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
        return { success: false, error: true }
    }

    const { userId } = auth();

    if (!userId) {
        return { success: false, error: true }
    }

    const data = {
        id: userId,
        ...validatedFields.data
    }

    console.log(data);

    await updateUserReq(data);

    return { success: true, error: false }
}

export const switchLike = async (postId: number) => {
    const { userId } = auth();

    if (!userId) throw new Error("User is not authenticated!");

    try {
        const response = await getLikeReq({
            userId: userId,
            postId: postId
        })
        console.log("existingLike response.data>>>", response.data);
        let existingLike = response.data
        console.log("existingLike >>>", existingLike.id);

        if (existingLike.id) {
            console.log("existingLike >>>", existingLike.id);
            await deleteLikeReq({
                id: existingLike.id
            })
        } else {
            await createLikeReq({
                userId: userId,
                postId: postId
            })
        }
    } catch (err) {
        console.log(err);
        throw new Error("Something went wrong");
    }
};

export const addPost = async (formData: FormData, img: string) => {
    const desc = formData.get("desc") as string;

    const Desc = z.string().min(1).max(255);

    const validatedDesc = Desc.safeParse(desc);

    if (!validatedDesc.success) {
        console.log("description is not valid");
        return;
    }
    const { userId } = auth();

    if (!userId) throw new Error("User is not authenticated!");

    console.log(userId, desc, img);

    const data = {
        userId: userId,
        desc: desc,
        img: img
    }
    try {
        console.log(data);
        const response = await addPostReq(data);
        console.log(response.data);
        revalidatePath("/")
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (postId: number) => {
    const { userId } = auth();

    if (!userId) throw new Error("User is not authenticated!");

    console.log("delete post", postId);

    try {
        await await deletePostReq({
            id: postId,
            userId: userId,
        })
        revalidatePath("/")
    } catch (err) {
        console.log(err);
    }
};

export const getFriendRequests = async () => {
    const { userId } = auth();

    if (!userId) {
        throw new Error('User not authenticated');
    }

    try {
        const response = await getFriendsReq({
            userId: userId,
        });
        console.log('Sent or not:', response.data);

        // Merge mutual connections
        const mergedConnections = [];
        const userMap = new Map();

        response.data.forEach((item: { id: any }) => {
            const existing = userMap.get(item.id);
            if (existing) {
                userMap.set(item.id, { ...item, type: 'mutual' });
            } else {
                userMap.set(item.id, item);
            }
        });

        mergedConnections.push(...userMap.values());
        return mergedConnections;
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        throw error;
    }
};

// Server-side function to send a message
export const sendMessage = async (senderId: string, receiverId: string, message: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error('User not authenticated');
    }
    try {
        // You can implement the message sending logic here or use an existing utility
        await sendMessageReq({
            senderId: currentUserId, receiverId, message
        });
        console.log('Message sent:', currentUserId, receiverId, message);
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const fetchMessages = async (senderId: string, receiverId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error('User not authenticated');
    }

    console.log(currentUserId, receiverId);


    try {
        const response = await getChats({
            senderId: currentUserId,
            receiverId
        });

        console.log('Fetched messages:', response.data);
        return response.data.history;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const currentUserFetch = () => {
    const { userId: currentUserId } = auth();
    if (!currentUserId) return '';
    return currentUserId;
}

export const userFetch = async (id: string) => {

    console.log(id)
    try {
        const response = await getUserReq({ id: id });
        return response.data.username
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

export const userFetchById = async () => {
    const { userId } = auth();

    if (!userId) return null;

    let userData = null;
    try {
        const response = await getUserReq({ id: userId });
        userData = response.data;
        return userData
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

export const allUserFetch = async (word: string) => {
    try {
        const response = await getAllUserReq({ word: word });
        console.log("search", response);
        return response.data
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

