"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // เพื่อเช็ค path ปัจจุบัน

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // path ปัจจุบัน

  // ฟังก์ชัน Sign Out
  const handleSignOut = () => {
    setIsLoggedIn(false);
    // redirect ไปหน้า Home หรือ Sign In ได้ถ้าต้องการ
  };

  // ตรวจสอบถ้าอยู่หน้า signin/signup จะซ่อนปุ่ม Sign In
  const hideSignInButton = pathname === "/signin" || pathname === "/signup";

  return (
    <header className="bg-blue-600 text-white flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold">Track Me</h1>
      <nav className="space-x-6 flex items-center">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/tracking" className="hover:underline">Tracking</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>

        {isLoggedIn ? (
          <>
            <Link
              href="/profile"
              className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50"
            >
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50"
            >
              Sign Out
            </button>
          </>
        ) : (
          !hideSignInButton && (
            <Link
              href="/signin"
              className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50"
            >
              Sign In
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
