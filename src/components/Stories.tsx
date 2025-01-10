import Image from 'next/image'
import React from 'react'

function Stories() {
    return (
        <div className='p-4 bg-white rounded-md shadow-md overflow-scroll text-xs scrollbar-hide'>
            <div className='flex gap-8 w-max'>
                <div className='flex flex-col items-center gap-2 cursor-pointer '>
                    <Image src="https://images.pexels.com/photos/30120603/pexels-photo-30120603/free-photo-of-black-and-white-portrait-of-a-young-adult.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                    <span className='font-md'>Vasil</span>
                </div>
                <div className='flex flex-col items-center gap-2 cursor-pointer '>
                    <Image src="https://images.pexels.com/photos/30120603/pexels-photo-30120603/free-photo-of-black-and-white-portrait-of-a-young-adult.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                    <span className='font-md'>Vasil</span>
                </div>
                <div className='flex flex-col items-center gap-2 cursor-pointer '>
                    <Image src="https://images.pexels.com/photos/30120603/pexels-photo-30120603/free-photo-of-black-and-white-portrait-of-a-young-adult.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                    <span className='font-md'>Vasil</span>
                </div>
                <div className='flex flex-col items-center gap-2 cursor-pointer '>
                    <Image src="https://images.pexels.com/photos/30120603/pexels-photo-30120603/free-photo-of-black-and-white-portrait-of-a-young-adult.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                    <span className='font-md'>Vasil</span>
                </div>
            </div>
        </div>
    )
}

export default Stories
