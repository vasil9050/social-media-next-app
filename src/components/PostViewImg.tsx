"use client";

import { deletePost } from "@/lib/action";
import Image from "next/image";
import { useState } from "react";

const PostViewImg = ({ postId, postImg }: { postId: number; postImg: string })  => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Controls the image preview modal

    const deletePostWithId = deletePost.bind(null, postId);

    return (
        <div>
            {/* Image Thumbnail */}
            {postImg && (
                <div className="w-full min-h-96 relative">
                    <Image
                        src={postImg}
                        fill
                        className="object-cover rounded-md cursor-pointer"
                        alt="Post content"
                        onClick={() => setIsPreviewOpen(true)}
                    />
                </div>
            )}

            {/* Image Preview Modal */}
            {isPreviewOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
                    onClick={() => setIsPreviewOpen(false)}
                >
                    <div
                        className="relative p-4 w-full max-w-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={postImg}
                            alt="Post Image"
                            layout="responsive"
                            width={700}
                            height={500}
                            className="rounded-xl object-contain"
                        />
                        <button
                            onClick={() => setIsPreviewOpen(false)}
                            className="absolute top-2 right-2 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            ❌
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostViewImg;
