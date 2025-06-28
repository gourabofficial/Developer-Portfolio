import React from 'react'
import Hero from '../components/Hero'
import Skills from '../components/skills'
import Experience from '../components/Exprecence'
import Projects from '../components/Project'
import Contact from '../components/Contect'
import Education from '../components/Education'
import Footer from '../components/footer'

const Home = () => {
  return (
    <div className="w-full" data-scroll-section>
      {/* 1. Hero Section - Always visible */}
      <section 
        id="home" 
        className="min-h-screen"
        data-scroll
        data-scroll-speed="-0.3"
      >
        <Hero />
      </section>
      
      {/* 2. Skills and Contact Side by Side */}
      <section 
        className="py-20"
        data-scroll
        data-scroll-speed="0.05"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div 
              id="skills" 
              className="flex justify-center lg:justify-end lg:pr-8"
              data-scroll
              data-scroll-class="slideInLeft"
            >
              <div className="w-full max-w-md">
                <Skills />
              </div>
            </div>
            <div 
              id="contact" 
              className="flex justify-center lg:justify-start lg:pl-8"
              data-scroll
              data-scroll-class="slideInRight"
            >
              <div className="w-full max-w-md">
                <Contact />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className='h-8'></div>

      {/* 3. Work Experience Section */}
      <section 
        id="experience" 
        className="py-16"
        data-scroll
        data-scroll-class="slideInUp"
        data-scroll-speed="0.1"
      >
        <div className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl mx-auto">
            <Experience />
          </div>
        </div>
      </section>

      <div className='h-8'></div>
      
      {/* 4. Education Section */}
      <section 
        id="education" 
        className="py-16"
        data-scroll
        data-scroll-class="slideInUp"
        data-scroll-speed="0.05"
      >
        <div className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl mx-auto">
            <Education />
          </div>
        </div>
      </section>
      <div className='h-8'></div>

      {/* 5. Projects Section */}
      <section 
        id="projects" 
        className="py-16"
        data-scroll
        data-scroll-class="scale"
        data-scroll-speed="0.15"
      >
        <div className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl mx-auto">
            <Projects />
          </div>
        </div>
      </section>
      
      <div className='h-24'></div>

      {/* 6. Footer Section */}
      <section 
        id="footer" 
        className="relative w-full"
        data-scroll
        data-scroll-class="slideInUp"
        data-scroll-speed="0.05"
      >
        <Footer />
      </section>
      
    </div>
  )
}

export default Home