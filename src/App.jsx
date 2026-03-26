import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function App() {
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
  }, [])

  return (
    <div className="app-container">
      <header ref={headerRef}>
        <h1>Premium To-Do List</h1>
        <p>v1: Initial Setup</p>
      </header>
      <main>
        <div className="card">
          <p>This is the initial setup for the Premium To-Do List API.</p>
          <p>Design and features will be added in the next versions.</p>
        </div>
      </main>
      <footer>
        <p>Built with React & GSAP</p>
      </footer>
    </div>
  )
}

export default App
