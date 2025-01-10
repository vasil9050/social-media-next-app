import Image from 'next/image'
import React from 'react'

function ProfileCard() {
  return (
    <div className='p-4 bg-white rounded-md shadow-md text-sm flex flex-col gap-6'>
      <div className='h-20 relative'>
        <Image src='https://images.pexels.com/photos/29532721/pexels-photo-29532721/free-photo-of-modern-interior-of-oculus-world-trade-center.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' fill className='rounded-md' />
        <Image src='https://images.pexels.com/photos/20117788/pexels-photo-20117788/free-photo-of-desert-mountain-range.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' width={48} height={48} className='rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-white ring-2 z-10' />
      </div>
      <div className='h-20 flex flex-col gap-2 items-center'>
        <span className='font-semibold'>Vasil B</span>
        <div className='flex items-center gap-4'>
        <span className='text-xs text-grey-500'>500 followers</span>
      </div>
      <button className='bg-sky-400 text-white text-xs p-2 rounded-md'>My Profile</button>
      </div>
    </div>
  )
}

export default ProfileCard
