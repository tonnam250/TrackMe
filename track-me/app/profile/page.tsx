"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [shipments] = useState([
    {
      tracking: "#0002",
      courier: "J&T",
      status: "In transit",
      lastUpdate: "18 Aug 2025 10:32",
      progress: 60,
    },
    {
      tracking: "#0003",
      courier: "J&T",
      status: "In transit",
      lastUpdate: "18 Aug 2025 10:32",
      progress: 85,
    },
  ]);

  const history = [
    { tracking: "#0001", courier: "SPX", status: "Delivered", date: "18 Aug 2025" },
    { tracking: "#0001", courier: "SPX", status: "Delivered", date: "18 Aug 2025" },
  ];

  return (
    <div className="min-h-screen bg-blue-100 pt-15">
      <div className="min-h-screen p-10">
      <h1 className="md:text-6xl font-extrabold text-blue-800 mb-14 drop-shadow-sm">Profile</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Information */}
          <section className="bg-white p-6 rounded-xl shadow border border-gray-200 text-black">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Information</h2>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john@gmail.com</p>
            <p><strong>Phone:</strong> +66 123 456 789</p>
            <p><strong>Address:</strong> 123 Sukhumvit Rd, Bangkok</p>
          </section>

          {/* Active Shipments */}
          <section className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Active Shipments</h2>
            {shipments.map((s, i) => (
              <div key={i} className="border border-gray-300 rounded-lg p-4 mb-4 text-black">
                <p><strong>Tracking:</strong> {s.tracking} <span className="ml-3"><strong>Courier:</strong> {s.courier}</span></p>
                <p><strong>Status:</strong> {s.status} <span className="ml-3"><strong>Last Update:</strong> {s.lastUpdate}</span></p>
                <div className="mt-2">
                  <p className="text-sm font-semibold">Progress:</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${s.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="mt-2 text-sm text-blue-700 hover:underline">
                  view more
                </button>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <section className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4 text-center text-black">
              <div>
                <div className="text-4xl">📦</div>
                <p><strong>Total Shipments:</strong> 2</p>
              </div>
              <div>
                <div className="text-4xl">✅</div>
                <p><strong>Delivered:</strong> 2</p>
              </div>
              <div>
                <div className="text-4xl">🚚</div>
                <p><strong>In Transit:</strong> 2</p>
              </div>
              <div>
                <div className="text-4xl">⚠️</div>
                <p><strong>Issues:</strong> 0</p>
              </div>
            </div>
          </section>

          {/* Shipment History */}
          <section className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Shipment History</h2>
            <table className="w-full text-left border-collapse text-black">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2">Tracking #</th>
                  <th>Courier</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-2">{h.tracking}</td>
                    <td>{h.courier}</td>
                    <td>{h.status}</td>
                    <td>{h.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
      </div>
    </div>
  );
}
