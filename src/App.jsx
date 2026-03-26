import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Plus, ListTodo, CheckCircle2 } from 'lucide-react'

function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-in', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="container">
      <header className="stagger-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <ListTodo size={32} color="#3b82f6" />
          <h1 style={{ margin: 0 }}>ApexPy Tasks</h1>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>Premium To-Do Management Interface</p>
      </header>

      <main>
        <div className="card stagger-in" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input type="text" placeholder="Add a new task..." />
            <button className="btn btn-primary">
              <Plus size={20} style={{ marginRight: '8px' }} />
              Add Task
            </button>
          </div>
        </div>

        <section className="stagger-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Your Tasks</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>2 pending items</span>
          </div>
          
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <CheckCircle2 size={24} color="var(--secondary)" />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>Design System Implementation</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Apply ApexPy visual identity and tokens.</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.5 }}>
            <div style={{ width: '24px', height: '24px', border: '2px solid var(--border)', borderRadius: '50%' }}></div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>Setup Backend Integration</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Connect with FastAPI endpoints.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="stagger-in" style={{ marginTop: '4rem', opacity: 0.5, fontSize: '0.8rem' }}>
        <p>© 2026 ApexPy Design. Built for Leonardo de Almeida.</p>
      </footer>
    </div>
  )
}

export default App
