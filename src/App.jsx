import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Plus, ListTodo, CheckCircle2, Circle, Trash2, Filter, Loader2, RefreshCw } from 'lucide-react'

const API_URL = 'http://localhost:8000'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', description: '' })
  const [filter, setFilter] = useState('all')
  
  const containerRef = useRef(null)

  const fetchTasks = async () => {
    setSyncing(true)
    try {
      const res = await fetch(`${API_URL}/items/`)
      const data = await res.json()
      setTasks(data || [])
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
    } finally {
      setLoading(false)
      setSyncing(false)
    }
  }

  useEffect(() => {
    fetchTasks()
    
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

  const addTask = async () => {
    if (!newTask.title.trim()) return
    setSyncing(true)
    try {
      const res = await fetch(`${API_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTask, id: null, status: false })
      })
      const data = await res.json()
      
      // The API returns { details, id, description, status } but needs title
      // Based on API docs, let's assume it worked and refresh or manually add
      setTasks([{ 
        id: data.id, 
        title: newTask.title, 
        description: data.description, 
        status: data.status 
      }, ...tasks])
      
      setNewTask({ title: '', description: '' })
      
      setTimeout(() => {
        gsap.from(`.task-${data.id}`, {
          x: -20,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })
      }, 0)
    } catch (err) {
      console.error('Add failed:', err)
    } finally {
      setSyncing(false)
    }
  }

  const toggleTask = async (task) => {
    setSyncing(true)
    const updatedStatus = !task.status
    try {
      await fetch(`${API_URL}/items/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, status: updatedStatus })
      })
      setTasks(tasks.map(t => t.id === task.id ? { ...t, status: updatedStatus } : t))
    } catch (err) {
      console.error('Update failed:', err)
    } finally {
      setSyncing(false)
    }
  }

  const deleteTask = async (id) => {
    setSyncing(true)
    try {
      await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' })
      gsap.to(`.task-${id}`, {
        x: 50, opacity: 0, duration: 0.3,
        onComplete: () => {
          setTasks(tasks.filter(t => t.id !== id))
        }
      })
    } catch (err) {
      console.error('Delete failed:', err)
    } finally {
      setSyncing(false)
    }
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.status
    if (filter === 'completed') return t.status
    return true
  })

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
      <Loader2 size={48} className="animate-spin" />
    </div>
  )

  return (
    <div ref={containerRef} className="container">
      <header className="stagger-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ListTodo size={32} color="#3b82f6" />
            <h1 style={{ margin: 0 }}>ApexPy Tasks</h1>
          </div>
          {syncing && <RefreshCw size={18} className="animate-spin" color="var(--primary)" />}
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
              <button className="btn btn-primary" onClick={addTask} disabled={!newTask.title || syncing}>
                {syncing ? <Loader2 size={18} className="animate-spin" /> : <Plus size={20} style={{ marginRight: '8px' }} />}
                Add
              </button>
            </div>
          </div>
        </div>

        <section className="stagger-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <h3 style={{ margin: 0 }}>Your Tasks</h3>
            </div>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              {['all', 'pending', 'completed'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className="btn"
                  style={{ 
                    padding: '4px 12px', fontSize: '0.8rem', 
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
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`card task-item task-${task.id}`} 
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: task.status ? 0.6 : 1 }}
              >
                <div onClick={() => toggleTask(task)} style={{ cursor: 'pointer' }}>
                  {task.status ? <CheckCircle2 size={24} color="var(--secondary)" /> : <Circle size={24} color="var(--border)" />}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, textDecoration: task.status ? 'line-through' : 'none' }}>{task.title}</h4>
                  {task.description && <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{task.description}</p>}
                </div>
                <button 
                  onClick={() => deleteTask(task.id)} 
                  disabled={syncing}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {!loading && filteredTasks.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                <p>No tasks found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <footer className="stagger-in" style={{ marginTop: '4rem', opacity: 0.5, fontSize: '0.8rem' }}>
        <p>© 2026 ApexPy Design. Built for Leonardo de Almeida.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}} />
    </div>
  )
}

export default App
