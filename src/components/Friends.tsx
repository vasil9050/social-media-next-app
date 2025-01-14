import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { getFriendsReq } from "@/api/utils";

const FriendRequests = async () => {
    const { userId } = auth();

    if (!userId) return null;

    let allReq = [];

    try {
        "use server";
        const response = await getFriendsReq({
            userId: userId,
        });
        console.log("sentornot", response.data);
        allReq = response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }

    // Merge mutual connections
    const mergedConnections = [];
    const userMap = new Map();

    allReq.forEach((item) => {
        const existing = userMap.get(item.id);

        if (existing) {
            // If the user exists in the map, mark as mutual
            userMap.set(item.id, { ...item, type: "mutual" });
        } else {
            // Otherwise, add the user to the map
            userMap.set(item.id, item);
        }
    });

    mergedConnections.push(...userMap.values());

    return (
        <div className="p-4 bg-white rounded-xl shadow-md text-sm flex flex-col gap-4">
            {/* TOP */}
            <div className="font-medium">
                <span className="text-gray-500">Friends</span>
                <div className="mt-4">
                    {mergedConnections.map((friend: any) => (
                        <Link
                            href={`/profile/${friend.username}`}
                            key={friend.id}
                            className="flex items-center gap-4 mt-2"
                        >
                            <Image
                                src={friend.avatar || "/noAvatar.png"} // Use a default image if avatar is missing
                                width={40}
                                height={40}
                                alt={friend.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span>{friend.username}</span>
                            <span className="text-xs text-gray-400">
                                {friend.type === "follower"
                                    ? "follows you"
                                    : friend.type === "following"
                                        ? "you are following"
                                        : friend.type === "mutual"
                                            ? "mutually connected"
                                            : ""}
                            </span>
                        </Link>
                    ))}
                    {mergedConnections && mergedConnections.length === 0 && (
                        <span>No Friend</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendRequests;
