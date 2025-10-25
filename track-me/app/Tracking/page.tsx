"use client"

import { useState } from "react";
import Image from "next/image";

export default function Page() {
    const [carrier, setCarrier] = useState("");

    return (
        <div className="h-screen w-full bg-[#E6F0FA] flex flex-col justify-center items-center pt-26 text-[#052072] px-6">
            <div className="flex flex-col justify-start items-start h-56 w-full self-start space-y-2">
                <h1 className="text-4xl font-bold">Track your <br />Package</h1>
                <p>Enter your tracking number to get <br />the current status of your shipment</p>
            </div>
            <div className="bg-white border-2 border-gray-400 w-full h-full flex flex-col rounded-xl p-3">
                <div className="flex justify-center items-center h-16 w-full space-x-5">
                    <select name="select_carrier" id="select_carrier" defaultValue={''} className="border-2 border-gray-300 p-2 rounded-lg">
                        <option value="">Select carrier</option>
                        <option value="kerry">Kerry</option>
                        <option value="flash">Flash</option>
                        <option value="jt">J&T</option>
                        <option value="dhl">DHL</option>
                    </select>

                    <input type="text" placeholder="Enter Tracking Number" className="p-2 border-2 border-gray-300 rounded-lg w-72" />

                    <button className="p-2 bg-[#0052CC] text-white rounded-lg w-24">Search</button>
                </div>

                <div className="grid grid-cols-2 auto-rows-max justify-center items-center">
                    <div className="bg-white border-2 border-gray-300 w-24 h-24 rounded-lg flex items-center justify-items-center">
                        <Image
                            src="/images/Kerry-Express-Logo.png"
                            alt="kerry_logo"
                            width={200}
                            height={80}
                            className="h-auto"
                        />
                    </div>
                    <div className="bg-white border-2 border-gray-300 w-24 h-24 rounded-lg flex items-center justify-items-center">
                        <Image
                            src="/images/Kerry-Express-Logo.png"
                            alt="kerry_logo"
                            width={200}
                            height={80}
                            className="h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}