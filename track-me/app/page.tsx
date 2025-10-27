import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full w-full bg-center min-h-screen flex justify-center pt-10">
      <div className="bg-[url('/images/home-bg.jpg')] bg-cover bg-[center_left_-4rem] bg-blend-multiply bg-black/25 w-full absolute h-full inset-0 z-0"></div>
      <div className="flex flex-col justify-center text-white space-y-5 md:space-y-10 mt-10 md:mt-14 z-10 lg:mt-16">
        <div className="flex flex-col justify-center items-center md:space-y-3">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl">Welcome to Track Me!</h1>
          <h2 className="self-center sm:self-center sm:text-xl md:text-3xl lg:text-4xl">“ ── The package tracking website.”</h2>
        </div>
        <div className="flex justify-center items-center mt-3 sm:text-xl md:text-3xl lg:text-5xl">
          <a href="/Tracking">
            <button className="bg-[#0052CC] text-white p-2 md:p-3 lg:p-4 lg:rounded-2xl rounded-lg border border-black">
              Track Now
            </button>
          </a>
        </div>
        <div className="flex flex-col space-y-12 justify-center items-center mt-5 md:text-xl md:mt-10">
          <h3 className="text-2xl font-bold sm:mb-10 md:text-4xl">Why us?</h3>
          <div className="flex flex-col sm:flex-row sm:space-x-5 justify-center items-center">
            <div className="flex flex-col justify-center items-center md:space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-white md:w-22 md:h-22" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2c2.75 0 5.1 1 7.05 2.95S22 9.25 22 12s-1 5.1-2.95 7.05S14.75 22 12 22s-5.1-1-7.05-2.95S2 14.75 2 12s1-5.1 2.95-7.05S9.25 2 12 2" />
                <path fill="#0052CC" d="m11.5 20l4.86-9.73H13V4l-5 9.73h3.5z "></path>
              </svg>
              <p className="font-semibold">Fast</p>
              <p>Track your package quickly</p>
            </div>
            <div className="flex flex-col justify-center items-center md:space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 md:w-22 md:h-22 bg-white rounded-full p-1" viewBox="0 0 24 24">
                <g fill="#0052CC">
                  <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path fill="" d="M12 2c.896 0 1.764.118 2.59.339l-2.126 2.125A3 3 0 0 0 12.04 5H12a7 7 0 1 0 7 7v-.04q.29-.18.535-.425l2.126-2.125c.221.826.339 1.694.339 2.59c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m-.414 5.017c0 .851-.042 1.714.004 2.564l-.54.54a2 2 0 1 0 2.829 2.829l.54-.54c.85.046 1.712.004 2.564.004a5 5 0 1 1-5.397-5.397m6.918-4.89a1 1 0 0 1 .617.923v1.83h1.829a1 1 0 0 1 .707 1.707L18.12 10.12a1 1 0 0 1-.707.293H15l-1.828 1.829a1 1 0 0 1-1.415-1.415L13.586 9V6.586a1 1 0 0 1 .293-.708l3.535-3.535a1 1 0 0 1 1.09-.217" />
                </g>
              </svg>
              <p className="font-semibold">Accurate</p>
              <p>Get accurate update</p>
            </div>
            <div className="flex flex-col justify-center items-center md:space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 md:w-22 md:h-22 bg-white rounded-full p-1" viewBox="0 0 24 24">
                <path fill="#0052CC" d="M16 2c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3m3 6h-2c0-1.2-.75-2.28-1.87-2.7L8.97 11H1v11h6v-1.44l7 1.94l8-2.5v-1c0-1.66-1.34-3-3-3M5 20H3v-7h2zm8.97.41L7 18.5V13h1.61l5.82 2.17c.34.13.57.46.57.83c0 0-2-.05-2.3-.15l-2.38-.79l-.63 1.9l2.38.79c.51.17 1.04.25 1.58.25H19c.39 0 .74.24.9.57z" />
              </svg>
              <p className="font-semibold">Easy to use</p>
              <p>Simple and user-friendly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
