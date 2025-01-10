import Image from 'next/image'
import React from 'react'

export default function Post() {
    return (
        <div className='flex flex-col gap-4'>
            {/* USER */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Image src="https://images.pexels.com/photos/29298932/pexels-photo-29298932/free-photo-of-colorful-textiles-with-geometric-patterns-displayed.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={40} height={40} alt='' className='w-10 h-10 rounded-full' />
                    <span className='font-md'>Vicky</span>
                </div>
                <Image src="/more.png" width={16} height={16} alt='' />
            </div>
            {/* DESC */}
            <div className='flex flex-col gap-4'>
                <div className='w-full min-h-96 relative'>
                    <Image src="https://images.pexels.com/photos/30101081/pexels-photo-30101081/free-photo-of-colorful-houses-by-the-waterfront-in-portree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" fill className='object-cover rounded-md' alt='' />
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam itaque quo veritatis iure minus iste dolorum laudantium praesentium porro nihil repellendus sunt debitis eius reprehenderit doloremque tempora, aperiam similique quia?</p>
            </div>
            {/* INTERECT */}
            <div className='flex item-center justify-between text-sm my-4'>
                <div className="flex gap-8">
                    <div className='flex items-center gap-4 bg-sky-50 p-2 rounded-xl'>
                        <Image src="/like.png" width={16} height={16} className='cursor-pointer' alt='' />
                        <span className='text-grey-300'>|</span>
                        <span className='text-grey-500'>133<span className='hidden md:inline'>Likes</span></span>
                    </div>
                    <div className='flex items-center gap-4 bg-sky-50 p-2 rounded-xl'>
                        <Image src="/comment.png" width={16} height={16} className='cursor-pointer' alt='' />
                        <span className='text-grey-300'>|</span>
                        <span className='text-grey-500'>133<span className='hidden md:inline'>Comments</span></span>
                    </div>
                </div>
                <div className="">
                <div className='flex items-center gap-4 bg-sky-50 p-2 rounded-xl'>
                        <Image src="/share.png" width={16} height={16} className='cursor-pointer' alt='' />
                        <span className='text-grey-300'>|</span>
                        <span className='text-grey-500'>133<span className='hidden md:inline'>Share</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
