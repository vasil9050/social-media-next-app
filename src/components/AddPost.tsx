import Image from 'next/image'
import React from 'react'

function AddPost() {
    return (
        <div className='p-4 bg-white shadow-md rounder-lg flex gap-4 justify-between text-sm'>
            <Image src="https://images.pexels.com/photos/30088706/pexels-photo-30088706/free-photo-of-nyc-ferry-by-iconic-manhattan-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={48} height={48} className='w-12 h-12 object-cover rounded-full' />
            <div className='flex-1'>
                <div className='flex gap-4'>
                    <textarea name="" id="" className='bg-sky-50 rounded-lg flex-1 items-center gap-2 cursor-pointer1 p-2' placeholder='Whats on your mind'></textarea>
                </div>
                <div className='flex items-center gap-4 mt-4 text-gray-400'>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Image src="/addimage.png" alt="" width={20} height={20} />
                        Photo
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost
