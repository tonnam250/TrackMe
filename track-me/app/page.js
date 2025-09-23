import Navbar from "./components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center text-white"
      style={{ backgroundImage: "url('/home.png')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 px-4 py-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-10">
          Welcome to Track Me!
        </h1>
        <p className="text-lg md:text-2xl mb-10">“ ── The package tracking website.”</p>
        <a href="/tracking">
        <button className="bg-blue-500 hover:bg-blue-700 px-6 py-4 rounded-md font-semibold text-2xl border border-black">
          Track Now
        </button>
        </a>
      </div>

      <div className="relative z-10  w-full py-12 text-center text-white-900">
        <h2 className="text-3xl font-bold mb-6">Why Us?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fast */}
          <div>
            <Image
              src="/fast.png"
              alt="Fast"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold mb-3 text-2xl">Fast</h3>
            <p>Track your package quickly</p>
          </div>

          {/* Accurate */}
          <div>
            <Image
              src="/accurate.png"
              alt="Accurate"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold mb-3 text-2xl">Accurate</h3>
            <p>Get accurate updates</p>
          </div>

          {/* Easy */}
          <div>
            <Image
              src="/easy.png"
              alt="Easy to use"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold mb-3 text-2xl">Easy to use</h3>
            <p>Simple and user-friendly</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
