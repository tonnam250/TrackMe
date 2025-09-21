"use client"

import Link from "next/link"
import { useState } from "react"

export default function HomeNav() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-[#0052CC] w-full h-[70px] sm:h-[70px] md:h-22 md:text-2xl md:px-5 lg:h-20 lg:text-2xl lg:px-8 flex justify-between items-center text-white text-md sm:text-xl px-2 sm:px-4 fixed z-20">
            <div className="flex justify-center align-middle">
                <p>Track Me</p>
            </div>
            {/* mobile nav */}
            <div className="sm:hidden flex justify-center items-center">
                <button id="menu-btn" className="" onClick={() => setIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h14M5 12h14M5 7h14" />
                    </svg>
                </button>
            </div>
            {/* end mobile nav */}

            {/* desktop nav */}
            <div className="hidden sm:flex sm:justify-center sm:items-center sm:space-x-2 md:space-x-5">
                <a href="/">Home</a>
                <a href="/Tracking">Tracking</a>
                <a href="/">Contact</a>
                <a href="/" className="p-2 bg-white text-[#0052CC] rounded-lg shadow-lg">Sign In</a>
            </div>
            {/* desktop nav */}

            {/* sidebar */}
            <div className={`fixed h-full w-56 right-0 top-0 bg-[#2271e7] flex flex-col items-center justify-between pt-24 pb-10 px-5 transition-transform duration-300 ${ isOpen ? "translate-x-0" : "translate-x-60"}`}>
                <button className="absolute top-16 -left-4 bg-white rounded-full text-[#0052CC]" onClick={() => setIsOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 5l6 7l-6 7" />
                    </svg>
                </button>

                <div className="flex flex-col justify-center items-center space-y-10">
                    <a href="/">Home</a>
                    <a href="/Tracking">Tracking</a>
                    <a href="/">Contact</a>
                </div>
                <a href="/" className="p-2 bg-white text-[#0052CC] rounded-lg shadow-lg w-full text-center">Sign In</a>
            </div>
            {/* end sidebar */}
        </div>
    )
}