"use client";
import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-blue-600 text-white flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold">Track Me</h1>
      <nav className="space-x-6 flex items-center">
        <a href="/" className="hover:underline">Home</a>
        <a href="/tracking" className="hover:underline">Tracking</a>
        <a href="/contact" className="hover:underline">Contact</a>

        {isLoggedIn ? (
          <a href="/profile" className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50">
            Profile
          </a>
        ) : (
          <button
            onClick={() => setIsLoggedIn(true)}
            className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50"
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
}
