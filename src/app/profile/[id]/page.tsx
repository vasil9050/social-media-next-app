import AllPost from '@/components/AllPost'
import LeftSideMenu from '@/components/LeftSideMenu'
import RightSideMenu from '@/components/RightSideMenu'
import Image from 'next/image'
import React from 'react'

function ProfilePage() {
  return (
    <div className='flex gap-6 pt-6'>
      <div className="hidden xl:block w-[20%]">
        <LeftSideMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className='flex flex-col items-center justify-center'>
            <div className='w-full h-64 relative'>
              <Image src='https://images.pexels.com/photos/29532721/pexels-photo-29532721/free-photo-of-modern-interior-of-oculus-world-trade-center.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' fill className='rounded-md' />
              <Image src='https://images.pexels.com/photos/20117788/pexels-photo-20117788/free-photo-of-desert-mountain-range.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' width={128} height={128} className='rounded-full w-32 h-32 absolute left-0 right-0 m-auto -bottom-16 ring-white ring-4 z-10' />
            </div>
            <h1 className='mt-20 mb-4 text-2xl font-medium'>Vasil B</h1>
            <div className='flex items-center justify-center gap-12 mb-4'>
              <div className='flex flex-col items-center'>
                <span className='font-medium'>125</span>
                <span className='text-sm'>Posts</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-medium'>125</span>
                <span className='text-sm'>followers</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-medium'>125</span>
                <span className='text-sm'>Following</span>
              </div>
            </div>
          </div>
          <AllPost />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]"><RightSideMenu /></div>
    </div>
  )
}

export default ProfilePage
