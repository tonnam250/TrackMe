"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateShipmentPage() {
  const router = useRouter();
  const params = useParams();
  const shipmentId = params.shipmentId; // ดึง shipmentId จาก dynamic route

  const [formData, setFormData] = useState({
    trackingId: "",
    carrier: "",
    status: "",
    currentLocation: "",
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
          trackingId: data.shipment.trackingId || "",
          carrier: data.shipment.carrier || "",
          status: data.shipment.status || "",
          currentLocation: data.shipment.currentLocation || "",
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        body: JSON.stringify({
          status: formData.status,
          currentLocation: formData.currentLocation,
        }),
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
      setTimeout(() => router.push("/admin/warehouse"), 1000);
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
          {/* Tracking ID (ล็อค) */}
          <div>
            <label className="block mb-2 font-semibold text-blue-900">
              Tracking ID
            </label>
            <input
              type="text"
              name="trackingId"
              value={formData.trackingId}
              disabled
              className="w-full border border-gray-400 rounded-lg p-3 bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Carrier (ล็อค) */}
          <div>
            <label className="block mb-2 font-semibold text-blue-900">
              Carrier
            </label>
            <input
              type="text"
              name="carrier"
              value={formData.carrier}
              disabled
              className="w-full border border-gray-400 rounded-lg p-3 bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-semibold text-blue-900">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            >
              <option value="">-- Select Status --</option>
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Current Location */}
          <div>
            <label className="block mb-2 font-semibold text-blue-900">
              Current Location
            </label>
            <input
              type="text"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* ปุ่มบันทึก */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white w-full py-4 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {/* ปุ่มลบ */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white w-full py-4 rounded-lg font-semibold hover:bg-red-700 transition mt-2"
          >
            Delete Shipment
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
