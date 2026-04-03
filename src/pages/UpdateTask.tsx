import { useState, useEffect, type FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { taskApi, type Task } from '../api/taskApi.ts';
import { TaskForm } from '../components/TaskForm';
import { motion } from 'framer-motion';

export default function UpdateTask() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchId, setSearchId] = useState(searchParams.get('id') || '');
  const [task, setTask] = useState<Task | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const fetchTask = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setMsg({ type: '', text: '' });
    try {
      const data = await taskApi.getTaskById(Number(id));
      if(data && data.title){
        setTask(data);
      } else {
        setMsg({ type: 'error', text: 'Task ID not found.' });
      }
    } catch (e) {
      setTask(null);
      setMsg({ type: 'error', text: 'Task not found or server offline.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchId) {
      fetchTask(searchId);
    }
  }, []); // Only on mount

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    fetchTask(searchId);
  };

  const handleUpdate = async (updatedTask: Omit<Task, 'id'>) => {
    if (!task?.id) return;
    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      await taskApi.updateTask(task.id, updatedTask);
      setMsg({ type: 'success', text: 'Payload patched successfully.' });
      setTimeout(() => navigate('/list'), 1500);
    } catch (e) {
      setMsg({ type: 'error', text: 'Failed to patch payload.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Patch Workload</h1>
        <p className="text-slate-400">Modify an existing block in the registry.</p>
      </header>

      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="number"
          placeholder="Task ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="input-field w-32 font-mono"
          required
        />
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "..." : "Fetch"}
        </button>
      </form>

      {msg.text && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`p-4 rounded-lg flex items-center ${msg.type === 'error' ? 'bg-devops-danger/20 text-devops-danger border-devops-danger' : 'bg-devops-success/20 text-devops-success border-devops-success'} border`}>
          {msg.text}
        </motion.div>
      )}

      {task && (
        <div className="pt-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="mb-4 text-sm text-slate-400 font-mono">Modifying ID: {task.id}</div>
          <TaskForm initialData={task} onSubmit={handleUpdate} isLoading={saving} buttonText="Commit Changes" />
        </div>
      )}
    </div>
  );
}
