"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { allUserFetch } from "@/lib/action";

function Navbar() {
    const [searchWord, setSearchWord] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (word: string) => {
        setIsLoading(true);
        const results = await allUserFetch(word);
        setSearchResults(results || []);
        setIsLoading(false);
    };

    useEffect(() => {
        if (searchWord.length > 0) {
            handleSearch(searchWord);
        } else {
            setSearchResults([]);
        }
    }, [searchWord]);

    const handleResultClick = () => {
        setSearchWord(""); // Clear the search input
        setSearchResults([]); // Clear the search results
    };

    return (
        <div className="flex items-center justify-between h-24 relative">
            <div className="hidden lg:block w-[20%]">
                <Link href={"/"} className="font-bold text-xl text-sky-600 flex items-center justify-center">
                    <Image src="/logo.png" width={70} height={70} alt="logo" />
                    <span>Minglize</span>
                </Link>
            </div>
            <div className="lg:hidden md:block w-[20%]">
                <Link href={"/"} className="font-bold text-xl text-sky-600">
                    <Image src="/logo.png" width={70} height={70} alt="logo" />
                </Link>
            </div>
            <ClerkLoaded>
                <SignedIn>
                    <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="p-2 w-full bg-sky-100 rounded-xl outline-none"
                                value={searchWord}
                                onChange={(e) => setSearchWord(e.target.value)}
                            />
                            {searchResults.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-2 z-10">
                                    {searchResults.map((user) => (
                                        <Link
                                            key={user.id}
                                            href={`/profile/${user.username}`}
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={handleResultClick}
                                        >
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={user.avatar || "/noAvatar.png"}
                                                    width={30}
                                                    height={30}
                                                    alt={user.username}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <span>{user.username}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {isLoading && (
                                <div className="absolute top-full left-0 w-full p-2 text-center text-gray-500">
                                    Loading...
                                </div>
                            )}
                        </div>
                    </div>
                </SignedIn>
            </ClerkLoaded>
            <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                <ClerkLoading>
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-rose motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                    >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                        </span>
                    </div>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className="cursor-pointer">
                            <Image src="/people.png" alt="" width={20} height={20} />
                        </div>
                        <div className="cursor-pointer">
                            <Image src="/messages.png" alt="" width={20} height={20} />
                        </div>
                        <div className="cursor-pointer">
                            <Image src="/notifications.png" alt="" width={20} height={20} />
                        </div>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2 text-sm">
                            <Image src="/login.png" alt="" width={20} height={20} />
                            <Link href="/sign-in">Login/Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </div>
    );
}

export default Navbar;
