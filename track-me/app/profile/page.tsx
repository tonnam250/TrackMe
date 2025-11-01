"use client";

import { useEffect, useState } from "react";

type Shipment = {
  tracking: string;
  courier: string;
  status: string;
  lastUpdate: string;
  progress: number;
};

type Users = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<Users | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await fetch("/api/profile");
  //       if (!res.ok) throw new Error("Failed to fetch profile");

  //       const json = await res.json();
  //       setUser(json.user);
  //       setShipments(json.shipments);
  //     } catch (err: any) {
  //       console.error(err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  // if (loading) return <p className="p-10">Loading...</p>;
  // if (error) return <p className="p-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-blue-100 pt-25 md:px-10">
      <h1 className="md:text-6xl font-extrabold text-blue-800 mb-14 drop-shadow-sm">Profile</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Information */}
          <section className="bg-white p-6 rounded-xl shadow border border-gray-200 text-black">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Information</h2>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Name:</strong> {user?.first_name} {user?.last_name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>Address:</strong> {user?.address}</p>
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
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${s.progress}%` }}></div>
                  </div>
                </div>
                <button className="mt-2 text-sm text-blue-700 hover:underline">view more</button>
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
                <p><strong>Total Shipments:</strong> {shipments.length}</p>
              </div>
              <div>
                <div className="text-4xl">✅</div>
                <p><strong>Delivered:</strong> {shipments.filter(s => s.status === "Delivered").length}</p>
              </div>
              <div>
                <div className="text-4xl">🚚</div>
                <p><strong>In Transit:</strong> {shipments.filter(s => s.status === "In transit").length}</p>
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
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                {shipments
                  .filter((s) => s.status === "Delivered")
                  .map((h, i) => (
                    <tr key={i} className="border-b border-gray-200">
                      <td className="py-2">{h.tracking}</td>
                      <td>{h.courier}</td>
                      <td>{h.status}</td>
                      <td>{h.lastUpdate}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>

        </div>
      </div>
    </div>
  );
}
