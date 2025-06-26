import React from 'react'
import Hero from '../components/Hero'
import Skills from '../components/skills'
import Experience from '../components/Exprecence'
import Projects from '../components/Project'
import Certificate from '../components/Cirtificate'
import Resume from '../components/Resume'
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
      
      {/* 3. Work Experience and Education Side by Side */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div id="experience" className="flex justify-center lg:justify-end lg:pr-8">
              <div className="w-full max-w-md">
                <Experience />
              </div>
            </div>
            <div id="education" className="flex justify-center lg:justify-start lg:pl-8">
              <div className="w-full max-w-md">
                <Education />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 4. Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Projects />
        </div>
      </section>
      
      {/* 5. Certificates Section */}
      <section id="certificates" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Certificate />
        </div>
      </section>
      
      {/* 6. Resume Section */}
      <section id="resume" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Resume />
        </div>
      </section>
    </div>
  )
}

export default Home