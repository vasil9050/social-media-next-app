"use client"

import { switchFollow } from '@/lib/action';
import React, { useOptimistic, useState } from 'react'

function UserIteractionInfoCard({
    userId,
    isFollowing,
    isFollowReqSent,
}: {
    userId: string;
    isFollowing: boolean;
    isFollowReqSent: boolean;
}) {
    const [userState, setUserState] = useState({
        following: isFollowing,
        followReqSent: isFollowReqSent
    })

    const follow = async () => {
        switchOptimisticFollow("");
        try {
            await switchFollow(userId)
            setUserState((prev) => ({
                ...prev,
                following: prev.following && false,
                followReqSent: !prev.following && !prev.followReqSent ? true : false
            }))
        } catch (error) {
            console.log(error);
        }
    }

    const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
        userState, (state) => ({
            ...state,
            following: state.following && false,
            followReqSent: !state.following && !state.followReqSent ? true : false
        })
    )

    console.log('userState', userState);

    return (
        <>
            <form action={follow}>
                <button className='w-full bg-sky-400 text-white text-sm rounded-md p-2'>
                    {optimisticFollow.following ? "Following" : optimisticFollow.followReqSent ? 'Friend Request Sent' : "Follow"}
                </button>
            </form>
        </>
    )
}

export default UserIteractionInfoCard
