import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <div className="space-y-8">
          {/* 404 Error */}
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 bg-clip-text text-transparent">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
            <h2 className="text-3xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate('/')}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Go Home
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={() => navigate(-1)}
                className="group px-8 py-4 border-2 border-orange-500 text-orange-400 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                  Go Back
                </span>
              </button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-400/10 to-orange-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
  )
}

export default NotFound
