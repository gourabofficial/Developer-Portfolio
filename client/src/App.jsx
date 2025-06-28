import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NotFound from './components/NotFound'
import Home from "./pages/Home"
import ScrollContainer from './components/ScrollContainer'


function App() {
  return (
    <Router>
      <div className='bg-black text-white min-h-screen w-full overflow-x-hidden'>
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <ScrollContainer className="relative z-10">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              {/* Redirect all section routes back to home */}
              <Route path="skills" element={<Home />} />
              <Route path="experience" element={<Home />} />
              <Route path="education" element={<Home />} />
              <Route path="projects" element={<Home />} />
              <Route path="contact" element={<Home />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ScrollContainer>
      </div>
    </Router>
  )
}

export default App
