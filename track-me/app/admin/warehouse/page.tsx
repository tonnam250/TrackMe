"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Shipment {
  id: string;
  trackingId: string;
  carrier: string;
  status: string;
  sentTime: string;
  currentLocation: string;
}

export default function ShipmentManagementPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchShipments();
  }, []);

  async function fetchShipments() {
    try {
      setLoading(true);
      const res = await fetch("/api/shipments");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error fetching shipments");
      setShipments(data.shipments || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this shipment?")) return;

    try {
      const res = await fetch(`/api/shipments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete shipment");
      setMessage("Shipment deleted successfully!");
      // ลบออกจาก state ทันที
      setShipments((prev) => prev.filter((s) => s.id !== id));
      setTimeout(() => setMessage(""), 2000);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-blue-100 pt-24">
      <div className="flex justify-between items-center mb-10 px-6 md:px-10">
        <h1 className="md:text-6xl font-extrabold text-blue-800 mb-14 drop-shadow-sm">
          Warehouse
        </h1>
        <Link
          href="/admin/warehouse/addshipment"
          className="bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold shadow-md hover:scale-105 hover:bg-blue-800 transition-transform duration-200"
        >
          + Add Shipment
        </Link>
      </div>

      {message && (
        <p className="text-center text-green-700 font-semibold mb-4">
          {message}
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold mb-4">{error}</p>
      )}

      <div className="px-4 md:px-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-x-auto">
          <table className="w-full border-collapse text-left text-gray-800 min-w-[700px]">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-4 font-medium">Tracking #</th>
                <th className="p-4 font-medium">Courier</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Last Update</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
                >
                  <td className="p-4 font-medium">{s.trackingId}</td>
                  <td className="p-4">{s.carrier}</td>
                  <td className="p-4">{s.status}</td>
                  <td className="p-4">{new Date(s.sentTime).toLocaleString()}</td>
                  <td className="p-4">{s.currentLocation}</td>
                  <td className="p-4 text-center flex justify-center gap-2">
                    <button
                      onClick={() =>
                        (window.location.href = `/admin/warehouse/updateshipment/${s.id}`)
                      }
                      className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-150"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 hover:scale-105 transition-transform duration-150"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {shipments.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No shipments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
