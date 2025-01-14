"use client"
import { switchLike } from '@/lib/action';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image'
import { useOptimistic, useState } from 'react';

function PostInteracion({ postId, likes }: { postId: number; likes: string[] }) {
    const { isLoaded, userId } = useAuth()
    const [likeState, setLikeState] = useState({
        likeCount: likes?.length,
        isLiked: userId ? likes?.includes(userId) : false
    })
    console.log(">>>", postId, likes);
    const [optimisticLike, switchOptimisticLike] = useOptimistic(likeState, (state, value) => {
        return {
            likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
            isLiked: !state.isLiked,
        }
    })

    const likeAction = async () => {
        switchOptimisticLike("");
        try {
            switchLike(postId);
            setLikeState(state => ({
                likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
                isLiked: !state.isLiked,
            }))
        } catch (error) {

        }
    }

    return (
        <div>
            {/* INTERACT */}
            <div className='flex item-center justify-between text-sm my-4'>
                <div className="flex gap-8">
                    <div className='flex items-center gap-4 bg-sky-50 p-2 rounded-xl'>
                        <form action={likeAction}>
                            <button>
                                <Image src={optimisticLike.isLiked ? "/liked.png" : "/like.png"} width={16} height={16} className='cursor-pointer' alt="Like" />
                            </button>
                        </form>
                        <span className='text-grey-300'>|</span>
                        <span className='text-grey-500'>
                            {optimisticLike.likeCount}
                            <span className='hidden md:inline'> Likes</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostInteracion
