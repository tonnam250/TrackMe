"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type DashboardData = {
  totalUsers: number;
  totalPackages: number;
  delivered: number;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("/api/dashboard");
  //       if (!res.ok) throw new Error("Network response was not ok");

  //       const json = await res.json();
  //       setData(json);
  //     } catch (err: any) {
  //       console.error(err);
  //       setError(err.message || "Failed to fetch data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // ตัวอย่างกราฟ dummy
  const chartData = [
    { day: "Mon", searches: 150 },
    { day: "Tue", searches: 200 },
    { day: "Wed", searches: 300 },
    { day: "Thu", searches: 220 },
    { day: "Fri", searches: 250 },
    { day: "Sat", searches: 180 },
    { day: "Sun", searches: 310 },
  ];

  return (
    <div className="min-h-screen bg-blue-100 pt-24 px-4 md:px-10">
      <h1 className="md:text-6xl font-extrabold text-blue-800 mb-14 drop-shadow-sm">Dashboard</h1>

      {/* Area Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="searches" stroke="#8884d8" fill="#7cc0e5ff" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Cards */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {data && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-blue-900 text-lg">Total Users</h2>
            <p className="text-4xl font-semibold">{data.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-blue-900 text-lg">Total Packages</h2>
            <p className="text-4xl font-semibold">{data.totalPackages}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-blue-900 text-lg">Delivered Packages</h2>
            <p className="text-4xl font-semibold">{data.delivered}</p>
          </div>
        </div>
      )}
    </div>
  );
}
