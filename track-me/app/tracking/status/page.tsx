"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Checkpoint {
  date: string;
  time: string;
  status: string;
  location: string;
}

export default function TrackingStatusPage() {
  const searchParams = useSearchParams();
  const trackingId = searchParams.get("tracking");

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const steps = [
    "To be processed",
    "Processing",
    "Prepared",
    "Shipping Soon",
    "In transit",
    "Out for delivery",
    "Delivered",
  ];

//   useEffect(() => {
//     async function fetchTracking() {
//       if (!trackingId) {
//         setError("No tracking ID provided.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(`/api/tracking/${trackingId}`);
//         const data = await res.json();

//         if (!res.ok) {
//           setError(data.message || "Tracking not found.");
//         } else {
//           setCheckpoints(data.checkpoints || []);
//           setCurrentStep(data.currentStep || 0);
//         }
//       } catch (err) {
//         setError("Error fetching tracking data.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchTracking();
//   }, [trackingId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-500">
//         Loading tracking data...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
//         {error}
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-blue-100 pt-30">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-300 text-black">
        {/* Step Progress */}
        <div className="relative flex justify-between items-center mb-12">
        {/* เส้นแนวนอน */}
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 -translate-y-1/2 z-0">
            <div
            className="h-[3px] bg-green-500 transition-all duration-500"
            style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
            />
        </div>

        {/* วงกลม */}
        {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center z-10 w-full pt-5">
            <div
                className={`h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${
                index <= currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                />
                </svg>
            </div>
            <p className="text-xs text-center mt-2 font-medium">{step}</p>
            </div>
        ))}
        </div>

        {/* Checkpoint List */}
        <div className="border rounded-lg p-4 bg-white max-h-[300px] overflow-y-auto">
          <h2 className="font-bold mb-3">Checkpoint timezone</h2>
          <div className="space-y-4">
            {checkpoints.length > 0 ? (
              checkpoints.map((cp, i) => (
                <div key={i}>
                  <p className="text-sm text-gray-500">
                    {cp.date} <span className="ml-1">{cp.time}</span>
                  </p>
                  <p className="font-semibold">{cp.status}</p>
                  <p className="text-sm whitespace-pre-line">{cp.location}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic text-center">
                No tracking data available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}