"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen pt-15">
      <div className="min-h-screen p-10">
      <h1 className="md:text-6xl font-extrabold text-blue-800 mb-14 drop-shadow-sm">Dashboard</h1>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <AreaChart width={700} height={300} data={[
          { day: "Mon", searches: 150 },
          { day: "Tue", searches: 200 },
          { day: "Wed", searches: 300 },
          { day: "Thu", searches: 220 },
          { day: "Fri", searches: 250 },
          { day: "Sat", searches: 180 },
          { day: "Sun", searches: 310 },
        ]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="searches" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
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
    </div>
  );
}
