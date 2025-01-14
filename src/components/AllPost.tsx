import React from 'react';
import Post from './Post';
import { auth } from '@clerk/nextjs/server';
import { getPostByUsername, getPostOnHome } from '@/api/utils';

async function AllPost({ username }: { username?: string }) {
  const { userId } = auth();

  let posts: any[] = [];

  try {
    if (username) {
      const response = await getPostByUsername({ username });
      posts = response.data; // Extracting the data from the Axios response
    } else if (userId) {
      const response = await getPostOnHome({ userId });
      posts = response.data; // Extracting the data from the Axios response
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }  

  return (
    <div className="p-4 bg-white shadow-md rounded-xl flex flex-col gap-12">
      {posts?.length ? (
        posts.map((post) => <Post key={post.postId} post={post} />)
      ) : (
        'No Posts to show!'
      )}
    </div>
  );
}

export default AllPost;
