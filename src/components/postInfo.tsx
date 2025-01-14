"use client";

import { deletePost } from "@/lib/action";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId, postImg }: { postId: number; postImg: string }) => {
    const [open, setOpen] = useState(false); // Controls the dropdown menu
    const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Controls the image preview modal

    const deletePostWithId = deletePost.bind(null, postId);

    return (
        <div className="relative">
            {/* Dropdown Trigger */}
            <Image
                src="/more.png"
                width={16}
                height={16}
                alt=""
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer"
            />

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute top-4 right-0flex flex-col p-6 bg-white/30 backdrop-blur-md shadow-lg rounded-xl border border-white/20">
                    {
                        postImg && <span className="cursor-pointer" onClick={() => setIsPreviewOpen(true)}
                        >View</span>
                    }
                    <form action={deletePostWithId}>
                        <button className="text-red-500">Delete</button>
                    </form>
                </div>
            )}

            {/* Image Preview Modal */}
            {isPreviewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
                    <div className="relative">
                        <Image
                            src={postImg}
                            alt="Post Image"
                            width={500}
                            height={500}
                            className="rounded-xl object-cover"
                        />
                        <button
                            onClick={() => setIsPreviewOpen(false)}
                            className="absolute top-2 right-2 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostInfo;