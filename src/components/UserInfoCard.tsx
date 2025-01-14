import { getIsFollowed, getIsFollowReqRes } from '@/api/utils';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UserIteractionInfoCard from './UserIteractionInfoCard';
import UpdateUser from './UpdateUser';

interface User {
    id?: string;
    username: string;
    avatar?: string;
    cover?: string;
    name?: string;
    surname?: string;
    description?: string;
    city?: string;
    school?: string;
    work?: string;
    website?: string;
}

async function UserInfoCard({ user }: { user?: User }) {

    let isFollow = false;
    let isFollowingsent = false;
    let userData = null;

    const { userId: currentUserId } = auth();

    if (currentUserId && user?.id) {
        try {
            "use server"
            const response = await getIsFollowReqRes({
                senderId: currentUserId,
                receiverId: user?.id,
            });
            userData = response.data;
            console.log(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const { isFollowreq } = userData || {}

    console.log("isFollowreqisFollowreqisFollowreq", isFollowreq, userData);


    isFollowreq ? (isFollowingsent = true) : (isFollowingsent = false)

    if (currentUserId && user?.id) {
        try {
            "use server"
            const response = await getIsFollowed({
                followerId: currentUserId,
                followingId: user?.id,
            });
            userData = response.data;
            console.log(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const { isFollowing } = userData || {}

    isFollowing ? (isFollow = true) : (isFollow = false)

    return (
        <div className='p-4 bg-white rounded-xl shadow-md text-sm flex flex-col gap-4'>
            <div className='flex justify-between items-center font-medium'>
                <span className='text-grey-500'>User Information</span>
                {(currentUserId && user?.id && currentUserId !== user.id) ? '' : <UpdateUser user={user} />}
            </div>
            <div className='flex flex-col gap-4 text-gray-500'>
                <div className='flex items-center gap-2'>
                    <span className='text-xl text-black'>{user?.name && user?.surname ? user.name + " " + user.surname : user?.username}</span>
                    <span className='text-sm'>@{user?.username}</span>
                </div>
                {user?.description && <p>{user?.description}</p>}
                {user?.city &&
                    <div className='flex items-center gap-2'>
                        <Image src="/map.png" alt='' width={16} height={16} />
                        <span>Living in <b>{user?.city}</b></span>
                    </div>
                }
                {user?.school &&
                    <div className='flex items-center gap-2'>
                        <Image src="/school.png" alt='' width={16} height={16} />
                        <span>Went to <b>{user?.school}</b></span>
                    </div>
                }
                {user?.website &&
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-1 items-center'>
                            <Image src="/link.png" alt='' width={16} height={16} />
                            <Link href={user?.website} className='text-blue-500 font-medium'>{user?.website}</Link>
                        </div>
                    </div>
                }
                {(currentUserId && user?.id && currentUserId !== user.id) &&
                    <UserIteractionInfoCard
                        userId={user?.id}
                        isFollowing={isFollow}
                        isFollowReqSent={isFollowingsent}
                    />}
            </div>
        </div>
    )
}

export default UserInfoCard
