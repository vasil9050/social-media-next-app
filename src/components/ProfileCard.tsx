import { getUserReq } from '@/api/utils';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

async function ProfileCard() {
  const { userId } = auth();

  if (!userId) return null;

  let userData = null;

  try {
    const response = await getUserReq({ id: userId });
    userData = response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return <div>Failed to load user data.</div>;
  }

  const {
    avatar,
    cover,
    username,
    surname,
    followersCount = 0,
  } = userData || {};

  return (
    <div className="p-4 bg-white rounded-md shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src={cover || '/noCover.jpg'}
          alt="Cover Image"
          fill
          className="rounded-md"
        />
        <Image
          src={avatar || '/noAvatar.png'}
          alt="Avatar Image"
          width={48}
          height={48}
          className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-white ring-2 z-10"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">
          {username || 'Anonymous'} {surname || ''}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">{followersCount} followers</span>
        </div>
        <button className="bg-sky-400 text-white text-xs p-2 rounded-md">
          <Link href={`/profile/${username}`}>My Profile</Link>
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
