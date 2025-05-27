import React from 'react';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center text-gray-900 w-[80vw] max-w-[1200px]">
        <div className="text-6xl font-semibold">I’m</div>
        <div className="text-8xl font-bold mt-4">Karthika Suresh</div>

        {/* Marquee container */}
        <h6 className="text-2xl text-gray-700 text-center max-w-xl mx-auto mt-12 overflow-hidden z-10">
          <span className="relative block w-full h-8 overflow-hidden">
            <span
              className="scrolling-text inline-flex whitespace-nowrap gap-[0.5vw] absolute left-0 top-0"
              style={{ animation: 'scroll 20s linear infinite' }}
            >
              <span>
                Student | Graphic Designer | UI/UX Designer | Web Developer |
              </span>
              <span>
                Student | Graphic Designer | UI/UX Designer | Web Developer |
              </span>
            </span>
          </span>
        </h6>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Home;
