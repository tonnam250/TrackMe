"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UpdateShipmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shipmentId = searchParams.get("id"); // ดึง id จาก query เช่น /update-shipment?id=xxx

  const [formData, setFormData] = useState({
    tracking: "",
    courier: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // โหลดข้อมูล shipment เดิมมาแสดง
  useEffect(() => {
    if (!shipmentId) return;

    const fetchShipment = async () => {
      try {
        const res = await fetch(`/api/shipments/${shipmentId}`);
        if (!res.ok) throw new Error("Shipment not found");
        const data = await res.json();
        setFormData({
          tracking: data.tracking || "",
          courier: data.courier || "",
        });
      } catch (err: any) {
        setMessage(err.message);
      }
    };

    fetchShipment();
  }, [shipmentId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // อัปเดต shipment
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/shipments/${shipmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error updating shipment");

      setMessage("Shipment updated successfully!");
      setTimeout(() => router.push("/admin/warehouse"), 1000);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ลบ shipment
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this shipment?")) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/shipments/${shipmentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete shipment");
      setMessage("Shipment deleted successfully!");
      setTimeout(() => router.push("/warehouse"), 1000);
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
          Update Shipment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div>
            <label className="block mb-2 font-semibold text-blue-900">
              Tracking Number
            </label>
            <input
              type="text"
              name="tracking"
              value={formData.tracking}
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
              name="courier"
              value={formData.courier}
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
            {loading ? "Saving..." : "Save Changes"}
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
