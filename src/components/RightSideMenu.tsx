import React from 'react'
import FriendsRequest from './FriendsRequest'
import UserInfoCard from './UserInfoCard'

function RightSideMenu({ userId }: { userId?: string }) {
    return (
        <div className='flex flex-col gap-6'>
            <UserInfoCard />
            <FriendsRequest />
        </div>
    )
}

export default RightSideMenu
