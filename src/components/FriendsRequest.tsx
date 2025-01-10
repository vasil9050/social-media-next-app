import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function FriendsRequest() {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            {/* TOP */}
            <div className='flex justify-between items-center font-medium'>
                <span className='text-grey-500'>Friend Requests</span>
                <Link href='/' className='text-blue-500 text-xs'>See all</Link>
            </div>
            {/* BOTTOM */}
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <Image src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={40} height={40} alt='' className='w-10 h-10 rounded-full object-cover' />
                    <span>wayne</span>
                </div>
                <div className='flex gap-3 justify-end'>
                    <Image src="/accept.png" alt='' width={20} height={20} className='cursor-pointer' />
                    <Image src="/reject.png" alt='' width={20} height={20} className='cursor-pointer' />
                </div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <Image src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={40} height={40} alt='' className='w-10 h-10 rounded-full object-cover' />
                    <span>wayne</span>
                </div>
                <div className='flex gap-3 justify-end'>
                    <Image src="/accept.png" alt='' width={20} height={20} className='cursor-pointer' />
                    <Image src="/reject.png" alt='' width={20} height={20} className='cursor-pointer' />
                </div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <Image src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={40} height={40} alt='' className='w-10 h-10 rounded-full object-cover' />
                    <span>wayne</span>
                </div>
                <div className='flex gap-3 justify-end'>
                    <Image src="/accept.png" alt='' width={20} height={20} className='cursor-pointer' />
                    <Image src="/reject.png" alt='' width={20} height={20} className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default FriendsRequest
