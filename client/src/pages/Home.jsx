import React from 'react'
import Hero from '../components/Hero'
import Skills from '../components/skills'
import Experience from '../components/Exprecence'
import Projects from '../components/Project'
import Contact from '../components/Contect'
import Education from '../components/Education'

const Home = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section id="Hero" className="min-h-screen">
        <Hero />
      </section>
      
      {/* 2. Skills and Contact Side by Side */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div id="skills" className="flex justify-center lg:justify-end lg:pr-8">
              <div className="w-full max-w-md">
                <Skills />
              </div>
            </div>
            <div id="contact" className="flex justify-center lg:justify-start lg:pl-8">
              <div className="w-full max-w-md">
                <Contact />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className='h-6'></div>

      {/* 3. Work Experience Section */}
      <section id="experience" className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-4xl mx-auto">
              <Experience />
            </div>
          </div>
        </div>
      </section>

      <div className='h-6'></div>
      {/* 4. Education Section */}
      <section id="education" className="mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-4xl mx-auto">
              <Education />
            </div>
          </div>
        </div>
      </section>
      
      {/* 5. Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Projects />
        </div>
      </section>
      
      
    </div>
  )
}

export default Home