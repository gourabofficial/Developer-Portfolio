import React, { useState } from 'react'
import Navbar from './comopents/Navbar'
import Home from './comopents/Home'
import About from './comopents/About'
import Skills from './comopents/skills'
import Experience from './comopents/Exprecence'
import Projects from './comopents/Project'
import Certificate from './comopents/Cirtificate'
import Resume from './comopents/Resume'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const renderSection = () => {
    switch(activeSection) {
      case 'home': return <Home />
      case 'about': return <About />
      case 'skills': return <Skills />
      case 'experience': return <Experience />
      case 'projects': return <Projects />
      case 'certificates': return <Certificate />
      case 'resume': return <Resume />
      default: return <Home />
    }
  }

  return (
    <div className='bg-black text-white min-h-screen w-full overflow-x-hidden'>
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10">
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="pt-20">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}

export default App
