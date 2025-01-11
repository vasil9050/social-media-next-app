import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import React from 'react'
import { getPostReq, addPostReq } from '@/api/utils';
const { userId } = auth()

function AddPost() {

    const testAction = async (formData: FormData) => {
        "use server"
        if (!userId) return;
        const desc = formData.get("desc") as string
        const data = {
            userId: userId,
            desc: desc
        }
        try {
            console.log(data);
            const response = await addPostReq(data);
            console.log(response.data);
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='p-4 bg-white shadow-md rounder-lg flex gap-4 justify-between text-sm'>
            <Image src="https://images.pexels.com/photos/30088706/pexels-photo-30088706/free-photo-of-nyc-ferry-by-iconic-manhattan-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={48} height={48} className='w-12 h-12 object-cover rounded-full' />
            <div className='flex-1'>
                <form action={testAction} className='flex gap-4'>
                    <textarea name="desc" id="" className='bg-sky-50 rounded-lg flex-1 items-center gap-2 cursor-pointer1 p-2' placeholder='Whats on your mind'></textarea>
                    <button>Send</button>
                </form>
                <div className='flex items-center gap-4 mt-4 text-gray-400'>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Image src="/addimage.png" alt="" width={20} height={20} />
                        Photo
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost
