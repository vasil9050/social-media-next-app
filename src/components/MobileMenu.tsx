"use client"

import { userFetchById } from '@/lib/action';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface User {
    username: string;
}

function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        const fetchingUser = async () => {
            const fetachData = await userFetchById();
            setUserData(fetachData)
        }
        fetchingUser();
    }, [])


    return (
        <div className='md:hidden'>
            <div className='flex flex-col gap-[4] cursor-pointer' onClick={() => setIsOpen(prev => !prev)}>
                <div className={`w-6 h-1 bg-sky-500 rounded-sm ${isOpen ? "rotate-45" : " "} origin-left ease-in-out duration-500`} />
                <div className={`w-6 h-1 bg-sky-500 rounded-sm ${isOpen ? "opacity-0" : " "} ease-in-out duration-500`} />
                <div className={`w-6 h-1 bg-sky-500 rounded-sm ${isOpen ? "-rotate-45" : " "} origin-left ease-in-out duration-500`} />
            </div>
            {
                isOpen && (
                    <div className='absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10'>
                        <Link href={'/'}>Home</Link>
                        <Link href={`/profile/${userData?.username}`}>My Profile</Link>
                    </div>
                )
            }
        </div>

    )
}

export default MobileMenu
