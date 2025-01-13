import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import FriendRequestList from "./FriendRequestList";
import { getAllFollowReq } from "@/api/utils";

const FriendRequests = async () => {
    const { userId } = auth();

    if (!userId) return null;

    let allReq = null;

    try {
        "use server"
        const response = await getAllFollowReq({
            receiverId: userId
        });
        allReq = response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* TOP */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">Friend Requests</span>
                {/* <Link href="/" className="text-blue-500 text-xs">
                    See all
                </Link> */}
            </div>
            {/* USER */}
            <FriendRequestList request={allReq}/>

        </div>
    );
};

export default FriendRequests;