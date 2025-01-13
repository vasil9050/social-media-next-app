import React, { Suspense } from 'react'
import UserInfoCard from './UserInfoCard'
import FriendRequests from './FriendRequest';

interface User {
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

function RightSideMenu({ user }: { user?: User }) {
    return (
        <div className='flex flex-col gap-6'>
            {user &&
                <>
                    <Suspense fallback="Loading...">
                        <UserInfoCard user={user} />
                    </Suspense>
                </>
            }
            <Suspense fallback="Loading...">
                <FriendRequests />
            </Suspense>
        </div>
    )
}

export default RightSideMenu
