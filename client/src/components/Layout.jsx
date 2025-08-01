import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import ScrollProgress from './ScrollProgress'

const Layout = () => {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <motion.main 
        className="pt-24 lg:pt-28 pb-32"
        style={{ position: 'relative', zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </>
  )
}

export default Layout
