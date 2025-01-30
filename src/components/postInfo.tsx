"use client";

import { deletePost } from "@/lib/action";
import Image from "next/image";
import { useEffect, useState } from "react";

const PostInfo = ({ postId, postImg }: { postId: number; postImg: string }) => {
    const [open, setOpen] = useState(false); // Controls the dropdown menu
    const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Controls the image preview modal

    const deletePostWithId = deletePost.bind(null, postId);

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        const handleScroll = () => setOpen(false);

        if (open) {
            // Set a timer to close the dropdown after 5 seconds
            timer = setTimeout(() => setOpen(false), 3000);
            // Add scroll event listener to close the dropdown on scroll
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            // Clear the timer and remove the scroll event listener when the dropdown is closed or component unmounts
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [open]);

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
                    <form action={deletePostWithId}>
                        <button className="text-red-500">Delete</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostInfo;