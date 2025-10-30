"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomeNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <div className="bg-[#0052CC] w-full h-[70px] sm:h-[70px] md:h-22 md:text-2xl md:px-5 lg:h-20 lg:text-2xl lg:px-8 flex justify-between items-center text-white text-md sm:text-xl px-2 sm:px-4 fixed z-20">

            {/* Logo */}
            <div className="flex justify-center align-middle">
                <p className="font-bold tracking-wide">Track Me</p>
            </div>

            {/* Desktop nav */}
            <div className="hidden sm:flex sm:justify-center sm:items-center sm:space-x-4 md:space-x-6">
                <Link href="/">Home</Link>
                <Link href="/tracking">Tracking</Link>
                <Link href="/contact">Contact</Link>

                {!isSignedIn ? (
                    <Link
                        href="/signin"
                        className="px-3 py-1 bg-white text-[#0052CC] rounded-lg"
                    >
                        Sign In
                    </Link>
                ) : (
                    <>
                        <Link href="/profile" className="px-3 py-1 bg-white text-[#0052CC] rounded-lg">
                            Profile
                        </Link>
                        <button
                            onClick={() => setIsSignedIn(false)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg"
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex justify-center items-center">
                <button onClick={() => setIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 17h14M5 12h14M5 7h14"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile sidebar */}
            <div
                className={`fixed h-full w-56 right-0 top-0 bg-[#2271e7] flex flex-col items-center justify-start pt-24 pb-10 px-5 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-60"
                    }`}
            >
                <button
                    className="absolute top-16 -left-4 bg-white rounded-full text-[#0052CC] border-2 border-[#2271e7]"
                    onClick={() => setIsOpen(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m9 5l6 7l-6 7"
                        />
                    </svg>
                </button>

                <div className="flex flex-col justify-center items-center space-y-6 text-white text-lg">
                    <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/tracking" onClick={() => setIsOpen(false)}>Tracking</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

                    {!isSignedIn ? (
                        <Link
                            href="/signin"
                            className="px-3 py-1 bg-white text-[#0052CC] rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign In
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/profile"
                                className="px-3 py-1 bg-white text-[#0052CC] rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() => setIsSignedIn(false)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg"
                            >
                                Sign Out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
