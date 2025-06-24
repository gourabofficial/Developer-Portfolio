import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './comopents/Layout'
import NotFound from './comopents/NotFound'
import Home from './comopents/Home'
import About from './comopents/About'
import Skills from './comopents/skills'
import Experience from './comopents/Exprecence'
import Projects from './comopents/Project'
import Certificate from './comopents/Cirtificate'
import Resume from './comopents/Resume'

function App() {
  return (
    <Router>
      <div className='bg-black text-white min-h-screen w-full overflow-x-hidden'>
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <div className="space-y-0">
                  <section id="home"><Home /></section>
                  <section id="about"><About /></section>
                  <section id="skills"><Skills /></section>
                  <section id="experience"><Experience /></section>
                  <section id="projects"><Projects /></section>
                  <section id="certificates"><Certificate /></section>
                  <section id="resume"><Resume /></section>
                </div>
              } />
              <Route path="about" element={<About />} />
              <Route path="skills" element={<Skills />} />
              <Route path="experience" element={<Experience />} />
              <Route path="projects" element={<Projects />} />
              <Route path="certificates" element={<Certificate />} />
              <Route path="resume" element={<Resume />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
