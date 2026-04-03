import { useState, useEffect } from 'react';
import { taskApi, type Task } from '../api/taskApi.ts';
import { TaskCard } from '../components/TaskCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskApi.getTasks();
      setTasks(data || []);
    } catch (e) {
      setError('Connection refused. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="flex justify-between items-end border-b border-slate-700/50 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Active Workloads</h1>
          <p className="text-slate-400">All currently tracked tasks in the cluster.</p>
        </div>
        <button onClick={fetchTasks} className="btn-primary py-1 px-3 text-sm">Refresh Node</button>
      </header>

      {error && (
        <div className="p-4 bg-devops-danger/20 border border-devops-danger text-devops-danger rounded-lg">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto pr-2 pb-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-40 bg-slate-800 rounded-xl animate-pulse" />)}
          </div>
        ) : tasks.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-500 font-mono">=== NO TASKS DETECTED IN PIPELINE ===</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} onDelete={handleDelete} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
