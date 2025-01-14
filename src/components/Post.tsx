import Image from 'next/image';
import React from 'react';
import PostInteracion from './PostInteracion';
import PostInfo from './postInfo';
import { auth } from '@clerk/nextjs/server';

interface PostType {
    postId: number; // Unique identifier for the post
    description: string | null; // Post description or null if not provided
    image: string | ""; // Image URL or null if not provided
    postCreatedAt: string; // ISO string for the post creation date
    userId: string; // ID of the user who created the post
    username: string; // Username of the user
    avatar: string | null; // URL of the user's avatar or null
    likesCount: number; // Number of likes on the post
    commentsCount: number; // Number of comments on the post
    likedUsers: string[];
}

export default function Post({ post }: { post: PostType }) {
    console.log("post.likedUsers >>>", post.likedUsers);

    const {userId} = auth()

    return (
        <div className='flex flex-col gap-4'>
            {/* USER */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Image
                        src={post.avatar || '/noAvatar.png'} // Fallback to a default avatar
                        width={40}
                        height={40}
                        alt={post.username}
                        className='w-10 h-10 rounded-full'
                    />
                    <span className='font-md'>{post.username}</span>
                </div>
                {/* <Image src="/more.png" width={16} height={16} alt="More options" /> */}
                {userId === post.userId && <PostInfo postId={post.postId} postImg={post?.image} />}
            </div>
            {/* DESC */}
            <div className='flex flex-col gap-4'>
                {post.image && (
                    <div className='w-full min-h-96 relative'>
                        <Image
                            src={post.image}
                            fill
                            className='object-cover rounded-md'
                            alt="Post content"
                        />
                    </div>
                )}
                {post.description && <p>{post.description}</p>}
            </div>
            <PostInteracion postId={post.postId} likes={post.likedUsers} />
        </div>
    );
}
