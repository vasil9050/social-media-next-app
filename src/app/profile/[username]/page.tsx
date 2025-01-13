import { getUserbyusernameReq } from '@/api/utils';
import AllPost from '@/components/AllPost';
import LeftSideMenu from '@/components/LeftSideMenu';
import RightSideMenu from '@/components/RightSideMenu';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

async function ProfilePage({ params }: { params: { username: string } }) {
  const uname = params.username;

  let userData = null;

  try {
    const response = await getUserbyusernameReq({ username: uname });
    userData = response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return notFound();
  }

  const isEmptyObject = (obj: any) => {
    return Object.values(obj).every((value) => value === null || value === undefined);
  };

  if (!userData) return notFound();

  const {
    avatar,
    cover,
    username,
    name,
    surname,
    followersCount = 0,
    followingsCount = 0,
    posts = [],
  } = userData || {};

  const postsfiltered = posts.filter((item: any) => !isEmptyObject(item));


  return (
    <div className='flex gap-6 pt-6'>
      {/* Left Menu */}
      <div className="hidden xl:block w-[20%]">
        <LeftSideMenu type="profile" />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {/* Profile Header */}
          <div className='flex flex-col items-center justify-center'>
            <div className='w-full h-64 relative'>
              <Image
                src={cover || 'noCover.png'}
                alt={`${username}'s cover`}
                fill
                className='rounded-md'
              />
              <Image
                src={avatar || 'noAvatar.png'}
                alt={`${username}'s avatar`}
                width={128}
                height={128}
                className='rounded-full w-32 h-32 absolute left-0 right-0 m-auto -bottom-16 ring-white ring-4 z-10'
              />
            </div>
            <h1 className='mt-20 mb-4 text-2xl font-medium'>
              {name && surname ? name + " " + surname : username}
            </h1>
            <div className='flex items-center justify-center gap-12 mb-4'>
              <div className='flex flex-col items-center'>
                <span className='font-medium'>{postsfiltered.length}</span>
                <span className='text-sm'>Posts</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-medium'>{followersCount}</span>
                <span className='text-sm'>Followers</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-medium'>{followingsCount}</span>
                <span className='text-sm'>Following</span>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <AllPost />
        </div>
      </div>

      {/* Right Menu */}
      <div className="hidden lg:block w-[30%]">
        <RightSideMenu user={userData} />
      </div>
    </div>
  );
}

export default ProfilePage;
