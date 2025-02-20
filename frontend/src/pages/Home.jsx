import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSpotify, FaApple, FaGooglePlay } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout } from '../lib/slices/auth.slice'

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const dispatch = useDispatch()

  // Listen to scroll events to track page scroll
  const handleScroll = () => {
    const scrollPosition = window.scrollY
    if (scrollPosition > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  }

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, type: 'spring' } },
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      {/* Navigation Bar */}
      <nav className={`fixed w-full top-0 left-0 z-50 ${isScrolled ? 'bg-blue-800' : 'bg-transparent'} transition-all ease-in-out duration-300`}>
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold">MelodyVerse</div>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 px-6 py-2 rounded-full text-white hover:bg-red-600 transition-all"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen text-center">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={scrollVariants}
        >
          <h1 className="text-6xl font-bold mb-4">Discover the Sound of Music</h1>
          <p className="text-xl mb-8">Stream your favorite songs, albums, and artists in one place.</p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-lg"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-semibold text-white"
            initial="hidden"
            animate="visible"
            variants={scrollVariants}
          >
            Why Choose Us?
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
          {/* Feature 1 */}
          <motion.div
            className="bg-gray-700 p-8 rounded-lg shadow-lg"
            initial="hidden"
            animate="visible"
            variants={featureVariants}
          >
            <h3 className="text-2xl font-semibold mb-4">Unlimited Music</h3>
            <p>Stream all the music you want, anytime, anywhere, without interruptions.</p>
          </motion.div>
          {/* Feature 2 */}
          <motion.div
            className="bg-gray-700 p-8 rounded-lg shadow-lg"
            initial="hidden"
            animate="visible"
            variants={featureVariants}
          >
            <h3 className="text-2xl font-semibold mb-4">High Quality Audio</h3>
            <p>Experience crystal-clear sound with high-quality streaming and downloads.</p>
          </motion.div>
          {/* Feature 3 */}
          <motion.div
            className="bg-gray-700 p-8 rounded-lg shadow-lg"
            initial="hidden"
            animate="visible"
            variants={featureVariants}
          >
            <h3 className="text-2xl font-semibold mb-4">Personalized Playlists</h3>
            <p>Let us help you discover new music based on your preferences and mood.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-8">
        <div className="flex justify-center space-x-6">
          <motion.a
            href="#"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl text-white"
          >
            <FaSpotify />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl text-white"
          >
            <FaApple />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl text-white"
          >
            <FaGooglePlay />
          </motion.a>
        </div>
        <div className="text-center text-white mt-6">
          <p>&copy; 2025 MusicVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
