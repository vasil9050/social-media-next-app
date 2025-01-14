import React from 'react'
import ProfileCard from './ProfileCard'
import Link from 'next/link'
import Image from 'next/image'

function LeftSideMenu({ type }: { type: "home" | "profile" }) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='p-4 bg-white rounded-md shadow-md text-sm text-grey-500 flex flex-col gap-2'>
        <Link href="/" className='flex items-center gap-4 p-2 hover:bg-sky-50'>
          <Image src="/posts.png" alt='' width={20} height={20} />
          <span>My Post</span>
        </Link>
        <hr className='border-t-1 border-gray-50 w-36 self-center' />
        <Link href="/" className='flex items-center gap-4 p-2 hover:bg-sky-50'>
          <Image src="/settings.png" alt='' width={20} height={20} />
          <span>settings</span>
        </Link>
      </div>
    </div>
  )
}

export default LeftSideMenu
