"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { getPostReq, addPostReq } from '@/api/utils';
import { useUser } from '@clerk/nextjs';
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from './AddPostButton';
import { addPost } from '@/lib/action';

function AddPost() {
    const { user, isLoaded } = useUser()
    const [desc, setdesc] = useState("");
    const [img, setImg] = useState<any>("");


    if (!isLoaded) {
        return "Loading.."
    }

    return (
        <div className='p-4 bg-white shadow-md rounded-xl flex gap-4 justify-between text-sm'>
            <Image src="https://images.pexels.com/photos/30088706/pexels-photo-30088706/free-photo-of-nyc-ferry-by-iconic-manhattan-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={48} height={48} className='w-12 h-12 object-cover rounded-full' />
            <div className='flex-1'>
                <form action={(formdata) => addPost(formdata, img?.secure_url || "")} className='flex gap-4'>
                    <textarea name="desc" id="" className='bg-sky-50 rounded-xl flex-1 items-center gap-2 cursor-pointer1 p-2' placeholder='Whats on your mind'></textarea>
                    <AddPostButton />
                </form>

                <div className='flex items-center gap-4 mt-4 text-gray-400'>
                    <CldUploadWidget
                        uploadPreset="minglize"
                        onSuccess={(result, { widget }) => { setImg(result?.info); widget.close() }
                        }
                    >
                        {({ open }) => {
                            return (
                                <div className='flex items-center gap-2 cursor-pointer' onClick={() => open()}>
                                    <Image src="/addimage.png" alt="" width={20} height={20} />
                                    Photo
                                </div>
                            );
                        }}
                    </CldUploadWidget>
                </div>
            </div>
        </div>
    )
}

export default AddPost
