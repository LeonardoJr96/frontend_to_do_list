import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Plus, ListTodo, CheckCircle2, Circle, Trash2, Filter } from 'lucide-react'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design System Implementation', description: 'Apply ApexPy visual identity.', status: true },
    { id: 2, title: 'Setup Backend Integration', description: 'Connect with FastAPI endpoints.', status: false }
  ])
  const [newTask, setNewTask] = useState({ title: '', description: '' })
  const [filter, setFilter] = useState('all') // all, pending, completed
  
  const containerRef = useRef(null)
  const listRef = useRef(null)

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

  const addTask = () => {
    if (!newTask.title.trim()) return
    const item = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      status: false
    }
    setTasks([item, ...tasks])
    setNewTask({ title: '', description: '' })
    
    // Animate new item
    setTimeout(() => {
      gsap.from(`.task-${item.id}`, {
        x: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
    }, 0)
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: !t.status } : t))
  }

  const deleteTask = (id) => {
    gsap.to(`.task-${id}`, {
      x: 50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setTasks(tasks.filter(t => t.id !== id))
      }
    })
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.status
    if (filter === 'completed') return t.status
    return true
  })

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Description (optional)" 
                style={{ flex: 1 }}
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
              <button className="btn btn-primary" onClick={addTask} disabled={!newTask.title}>
                <Plus size={20} style={{ marginRight: '8px' }} />
                Add
              </button>
            </div>
          </div>
        </div>

        <section className="stagger-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Filter size={18} color="var(--text-muted)" />
              <h3 style={{ margin: 0 }}>Your Tasks</h3>
            </div>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              {['all', 'pending', 'completed'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className="btn"
                  style={{ 
                    padding: '4px 12px', 
                    fontSize: '0.8rem', 
                    background: filter === f ? 'var(--primary)' : 'transparent',
                    color: filter === f ? 'white' : 'var(--text-muted)',
                    borderRadius: '6px'
                  }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`card task-item task-${task.id}`} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  opacity: task.status ? 0.6 : 1,
                }}
              >
                <div onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer' }}>
                  {task.status ? <CheckCircle2 size={24} color="var(--secondary)" /> : <Circle size={24} color="var(--border)" />}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, textDecoration: task.status ? 'line-through' : 'none' }}>{task.title}</h4>
                  {task.description && <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{task.description}</p>}
                </div>
                <button 
                  onClick={() => deleteTask(task.id)} 
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                <p>No tasks found in this category.</p>
              </div>
            )}
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
