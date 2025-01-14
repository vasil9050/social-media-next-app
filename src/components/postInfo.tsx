"use client";

import { deletePost } from "@/lib/action";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
    const [open, setOpen] = useState(false);

    const deletePostWithId = deletePost.bind(null, postId);
    return (
        <div className="relative">
            <Image
                src="/more.png"
                width={16}
                height={16}
                alt=""
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer"
            />
            {open && (
                <div className="absolute top-4 right-0flex flex-col p-6 bg-white/30 backdrop-blur-md shadow-lg rounded-xl border border-white/20">
                    <span className="cursor-pointer">View</span>
                    <form action={deletePostWithId}>
                        <button className="text-red-500">Delete</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostInfo;