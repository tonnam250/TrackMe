"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddShipmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    trackingId: "",  // เปลี่ยนจาก tracking
    carrier: "",     // เปลี่ยนจาก courier
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),  // จะส่ง { trackingId, carrier } ตาม API
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error adding shipment");

      setMessage("Shipment added successfully!");
      setTimeout(() => router.push("/admin/warehouse"), 1000); // กลับไปหน้า warehouse
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 pt-24 flex justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-200">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
          Add Shipment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div>
            <label className="block mb-2 font-semibold text-blue-900">
              Tracking Number
            </label>
            <input
              type="text"
              name="trackingId" // เปลี่ยนตรงนี้
              value={formData.trackingId}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-900">
              Courier
            </label>
            <select
              name="carrier" // เปลี่ยนตรงนี้
              value={formData.carrier}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            >
              <option value="">-- Select Courier --</option>
              <option value="Kerry Express">Kerry Express</option>
              <option value="Flash Express">Flash Express</option>
              <option value="DHL">DHL</option>
              <option value="J&T Express">J&T Express</option>
              <option value="Thailand Post">Thailand Post</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white w-full py-4 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            {loading ? "Saving..." : "Add Shipment"}
          </button>

          {message && (
            <p className="text-center mt-4 text-blue-800 font-semibold">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
