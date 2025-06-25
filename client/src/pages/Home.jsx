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
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <section id="Hero" className="min-h-screen"><Hero /></section>
      
      {/* 2. Skills and Contact Side by Side */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div id="skills">
              <Skills />
            </div>
            <div id="contact">
              <Contact />
            </div>
          </div>
        </div>
      </section>
      
      {/* 3. Work Experience and Education Side by Side */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div id="experience">
              <Experience />
            </div>
            <div id="education">
              <Education />
            </div>
          </div>
        </div>
      </section>
      
      {/* 4. Projects Section */}
      <section id="projects" className="py-16"><Projects /></section>
      
      {/* 5. Certificates Section */}
      <section id="certificates" className="py-16"><Certificate /></section>
      
      {/* 6. Resume Section */}
      <section id="resume" className="py-16"><Resume /></section>
    </div>
  )
}

export default Home