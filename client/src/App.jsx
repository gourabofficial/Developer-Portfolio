import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './comopents/Layout'
import NotFound from './comopents/NotFound'
import Home from './comopents/Home'
import Skills from './comopents/skills'
import Experience from './comopents/Exprecence'
import Projects from './comopents/Project'
import Certificate from './comopents/Cirtificate'
import Resume from './comopents/Resume'
import Contact from './comopents/Contect'
import Education from './comopents/Education'

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
                <div className="space-y-12">
                  {/* 1. Home Section */}
                  <section id="home" className="min-h-screen"><Home /></section>
                  
                  {/* 2. Skills and Contact Side by Side */}
                  <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid lg:grid-cols-2 gap-12">
                        <div id="skills"><Skills /></div>
                        <div id="contact"><Contact /></div>
                      </div>
                    </div>
                  </section>
                  
                  {/* 3. Work Experience and Education Side by Side */}
                  <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid lg:grid-cols-2 gap-12">
                        <div id="experience"><Experience /></div>
                        <div id="education">
                          {/* Extract Education from Experience component */}
                          <section className="py-4">
                            <div className="w-full">
                              {/* Section Header */}
                              <div className="text-left mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                  My <span className="text-orange-400">Education</span>
                                </h2>
                                <div className='h-2'></div>
                              </div>
                              {/* Education Container */}
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl max-w-lg">
                                <div className="p-8">
                                  <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center">
                                        
                                        
                                      </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-2">Bachelor of Science in Computer Science</h3>
                                    <div className="flex items-center text-orange-400 font-medium mb-2">
                                      <span>Sanaka Educational Trust</span>
                                    </div>
                                    <div className="flex items-center text-gray-400 mb-4">
                                      <span>2022 - 2026 • Durgapur, Molandighi, West Bengal</span>
                                    </div>
                                    
                                    <p className="text-gray-300 mb-4 leading-relaxed">
                                      Currently pursuing a comprehensive Computer Science degree with focus on software development, algorithms, and modern web technologies.
                                    </p>
                                    
                                    <div className="mb-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-300">GPA</span>
                                        <span className="text-sm font-bold text-orange-400">8.5/10</span>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-300 mb-3">Key Subjects</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {['Data Structures', 'Algorithms', 'Web Development', 'Database Management', 'Software Engineering'].map((subject, index) => (
                                          <span key={index} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-xs border border-gray-600/30">
                                            {subject}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
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
              } />
              
              <Route path="skills" element={<Skills />} />
              <Route path="experience" element={<Experience />} />
              <Route path="education" element={<Education />} />
              <Route path="projects" element={<Projects />} />
              <Route path="certificates" element={<Certificate />} />
              <Route path="resume" element={<Resume />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
