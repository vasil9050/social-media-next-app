import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function UserInfoCard({ userId }: { userId?: string }) {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            <div className='flex justify-between items-center font-medium'>
                <span className='text-grey-500'>User Information</span>
                <Link href='/' className='text-blue-500 text-xs'>See all</Link>
            </div>
            <div className='flex flex-col gap-4 text-gray-500'>
                <div className='flex items-center gap-2'>
                    <span className='text-xl text-black'>Vasil</span>
                    <span className='text-sm'>@vasilb</span>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatibus culpa facere modi eligendi.</p>
                <div className='flex items-center gap-2'>
                    <Image src="/map.png" alt='' width={16} height={16} />
                    <span>Living in <b>Rajkot</b></span>
                </div>
                <div className='flex items-center gap-2'>
                    <Image src="/school.png" alt='' width={16} height={16} />
                    <span>Went to <b>Rajkumar collage</b></span>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-1 items-center'>
                        <Image src="/link.png" alt='' width={16} height={16} />
                        <Link href="https://vasil.com" className='text-blue-500 font-medium'>vasil</Link>
                    </div>
                </div>
                <button className='bg-sky-400 text-white text-sm rounded-md p-2'>Follow</button>
            </div>
        </div>
    )
}

export default UserInfoCard
