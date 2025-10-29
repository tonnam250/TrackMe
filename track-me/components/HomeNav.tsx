"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomeNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="bg-[#0052CC] w-full h-[70px] sm:h-[70px] md:h-22 md:text-2xl md:px-5 lg:h-20 lg:text-2xl lg:px-8 flex justify-between items-center text-white text-md sm:text-xl px-2 sm:px-4 fixed z-20">
      {/* Logo */}
      <div className="flex justify-center align-middle">
        <p className="font-bold tracking-wide">Track Me</p>
      </div>

      {/* mobile nav button */}
      <div className="sm:hidden flex justify-center items-center">
        <button id="menu-btn" onClick={() => setIsOpen(!isOpen)}>
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

      {/* desktop nav */}
      <div className="hidden sm:flex sm:justify-center sm:items-center sm:space-x-2 md:space-x-5 relative">
        <Link href="/">Home</Link>
        <Link href="/Tracking">Tracking</Link>
        <Link href="/contact">Contact</Link>

        {/* Setting Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM12 8a4 4 0 1 1-4 4a4 4 0 0 1 4-4Z"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
              {!isSignedIn ? (
                <>
                  <Link
                    href="/signin"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsSignedIn(false);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* sidebar (mobile) */}
      <div
        className={`fixed h-full w-56 right-0 top-0 bg-[#2271e7] flex flex-col items-center justify-between pt-24 pb-10 px-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-60"
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

        <div className="flex flex-col justify-center items-center space-y-10 text-white text-lg">
          <Link href="/">Home</Link>
          <Link href="/Tracking">Tracking</Link>
          <Link href="/contact">Contact</Link>

          {/* Setting Dropdown (mobile) */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 py-1 bg-white text-[#0052CC] rounded-lg"
            >
              Setting
            </button>

            {isDropdownOpen && (
              <div className="flex flex-col bg-white text-gray-800 rounded-lg shadow-lg w-36">
                {!isSignedIn ? (
                  <>
                    <Link
                      href="/signin"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsSignedIn(false);
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
