import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Tracking() {
  return (
    <div className="bg-gray-100 min-h-screen">
        <Navbar />

      <section className="bg-gradient from-blue-100 to-white py-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col justify-center">
          <h1 className="text-8xl md:text-8xl font-extrabold text-blue-900 leading-tight mb-6">
            Track your <br /> Package
          </h1>
          <p className="text-xl font-light text-gray-700">
            Enter your tracking number to get the <br /> current status of your shipment
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/track-illustration.png"
            alt="Track Package"
            width={600}
            height={450}
            className="object-contain"
          />
        </div>
      </div>
    </section>

      <section className="border max-w-7xl mx-auto py-12 px-10 bg-white shadow-lg rounded-lg">
      <div className="bg-white p-6 rounded-md flex flex-col md:flex-row items-center gap-6 mb-8 text-xl">
        <select className="border rounded-md px-4 py-3 w-full md:w-auto text-black">
          <option>Select carrier</option>
          <option>Kerry Express</option>
          <option>Flash Express</option>
          <option>J&T Express</option>
          <option>DHL</option>
          <option>Thailand Post</option>
        </select>

        <input
          type="text"
          placeholder="Enter Tracking Number"
          className="border rounded-md px-4 py-3 flex-1 w-full text-black"
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md">
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="bg-white rounded-md flex items-center justify-center p-6">
          <Image src="/kerry.png" alt="Kerry Express" width={200} height={120} />
        </div>
        <div className="bg-white rounded-md flex items-center justify-center p-6">
          <Image src="/flash.png" alt="Flash Express" width={200} height={120} />
        </div>
        <div className="bg-white rounded-md flex items-center justify-center p-6">
          <Image src="/jtexpress.png" alt="J&T Express" width={200} height={120} />
        </div>
        <div className="bg-white rounded-md flex items-center justify-center p-6">
          <Image src="/dhl.png" alt="DHL" width={200} height={120} />
        </div>
        <div className="bg-white rounded-md flex items-center justify-center p-6">
          <Image src="/thailandpost.png" alt="Thailand Post" width={200} height={120} />
        </div>
      </div>
    </section>

    </div>
  );
}
