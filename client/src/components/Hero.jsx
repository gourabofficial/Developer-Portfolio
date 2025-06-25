import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  
  

  
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Floating Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-400/10 to-orange-500/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-r from-orange-300/15 to-orange-400/15 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Name and Details */}
        <div className="text-left space-y-6">
          {/* Name */}
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                Gourab Ganguly
              </span>
            </h1>
          </div>
      <div className="h-5"></div>
          {/* Typing Animation */}
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-orange-300 mb-6">
              Full Stack Developer
            </h2>
          </div>
         
          {/* Description */}
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Passionate about creating exceptional digital experiences through
              clean code, innovative design, and cutting-edge technologies.
              Specialized in building scalable web applications with modern
              frameworks.
            </p>
          </div>
          <div className="h-5"></div>
          {/* Download CV Button */}
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
            <button
              onClick={() => navigate("/resume")}
              className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform relative z-10" />
              <span className="relative  z-10">Download CV</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>  

        {/* Right Side - Can be used for image or additional content */}
        <div className="hidden lg:block opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards]">
          <div className="relative ml-auto">
            <div className="w-[450px] h-80 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-2xl border border-orange-500/20 overflow-hidden">
              <img
                src="/assets/IMG_20230619_115914.jpg"
                alt="Gourab Ganguly"
                className="w-full h-full object-cover object-center rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
