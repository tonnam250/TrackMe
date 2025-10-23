"use client";
import React from "react";
import Navbar from "../components/Navbar";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="min-h-screen bg-blue-100 p-10">
        <h1 className="md:text-6xl font-extrabold text-blue-800 mb-14 drop-shadow-sm">Contact</h1>

        <div className="bg-white p-12 rounded-[2rem] shadow-2xl border border-gray-200 w-full flex flex-col md:flex-row gap-12 min-h-[500px]">
            {/* Form */}
            <div className="flex-1">
            <h2 className="text-4xl font-semibold text-blue-800 mb-4">Sent a message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="text-black w-full border border-gray-600 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="text-black w-full border border-gray-600 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />
                <textarea
                    placeholder="Message"
                    rows={6}
                    className="text-black w-full border border-gray-600 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition w-full"
                >
                    Send Message
                </button>
                </form>
            </div>

            {/* Contact Info */}
            <div className="flex-1">
            <h2 className="text-4xl font-semibold text-blue-800 mb-4">Contact Info</h2>
            <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                <span>📧</span>
                <span>admin@example.com</span>
                </li>
                <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+123-456-7890</span>
                </li>
                <li className="flex items-center gap-2">
                <span>📍</span>
                <span>123 IT KMITL, Ladkrabang, Thailand</span>
                </li>
            </ul>

            {/* Map */}
            <div className="w-full h-64">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7751.596077742139!2d100.77557313365604!3d13.730673870428863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d66308ce98ffd%3A0xcb43a76f038c38ca!2sSchool%20of%20Information%20Technology%20KMITL!5e0!3m2!1sen!2sth!4v1761235796214!5m2!1sen!2sth"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                ></iframe>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}
