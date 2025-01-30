import React, { Suspense } from 'react'
import UserInfoCard from './UserInfoCard'
import FriendRequests from './FriendRequest';
import ProfileCard from './ProfileCard';
import Friends from './Friends';

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

function RightSideMenu({ type, user }: { user?: User, type: "home" | "profile" }) {
    return (
        <div className='flex flex-col gap-6'>
            {type === "home" && <ProfileCard />}
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
            <Suspense fallback="Loading...">
                <Friends />
            </Suspense>
        </div>
    )
}

export default RightSideMenu
