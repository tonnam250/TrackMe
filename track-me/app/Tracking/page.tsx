"use client"

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
    const [carrier, setCarrier] = useState("");
    const [shipmentId, setShipmentId] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (!shipmentId || !carrier) return; // ต้องกรอกทั้งคู่
        router.push(`/tracking/status?shipmentId=${shipmentId}&carrier=${carrier}`);
    };

    return (
        <div className="bg-blue-100 min-h-screen pt-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col justify-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 leading-tight mb-6">
                        Track your <br /> Package
                    </h1>
                    <p className="text-lg md:text-xl font-light text-gray-700">
                        Enter your tracking number to get the <br /> current status of your shipment
                    </p>
                </div>
                <div className="flex justify-center">
                    <Image
                        src="/images/track-illustration.png"
                        alt="Track Package"
                        width={600}
                        height={450}
                        className="object-contain"
                    />
                </div>
            </div>

            <section className="bg-white py-3 px-6 max-w-7xl mx-auto rounded-[2rem] shadow-2xl border border-gray-200">
                <div className="bg-white p-6 rounded-md flex flex-col md:flex-row items-center gap-6 mb-8 text-lg">
                    <select
                        name="select_carrier"
                        id="select_carrier"
                        value={carrier}
                        onChange={(e) => setCarrier(e.target.value)}
                        className="border-2 border-gray-300 rounded-md px-4 py-3 w-full md:w-auto text-black"
                    >
                        <option value="">Select carrier</option>
                        <option value="Kerry Express">Kerry Express</option>
                        <option value="Flash Express">Flash Express</option>
                        <option value="J&T Express">J&T Express</option>
                        <option value="DHL">DHL</option>
                        <option value="Thailand Post">Thailand Post</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Enter Tracking Number"
                        value={shipmentId}
                        onChange={(e) => setShipmentId(e.target.value)}
                        className="border-2 border-gray-300 rounded-md px-4 py-3 flex-1 w-full text-black"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-[#0052CC] hover:bg-blue-700 text-white px-8 py-3 rounded-md w-full md:w-32"
                    >
                        Search
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-center items-center">
                    <div className="bg-white rounded-md flex items-center justify-center p-6">
                        <Image src="/images/kerry.png" alt="Kerry Express" width={200} height={120} />
                    </div>
                    <div className="bg-white rounded-md flex items-center justify-center p-6">
                        <Image src="/images/flash.png" alt="Flash Express" width={200} height={120} />
                    </div>
                    <div className="bg-white rounded-md flex items-center justify-center p-6">
                        <Image src="/images/jtexpress.png" alt="J&T Express" width={200} height={120} />
                    </div>
                    <div className="bg-white rounded-md flex items-center justify-center p-6">
                        <Image src="/images/dhl.png" alt="DHL" width={200} height={120} />
                    </div>
                    <div className="bg-white rounded-md flex items-center justify-center p-6">
                        <Image src="/images/thailandpost.png" alt="Thailand Post" width={200} height={120} />
                    </div>
                </div>
            </section>
        </div>
    );
}
