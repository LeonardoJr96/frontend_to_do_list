import { useState, type FormEvent } from 'react';
import { taskApi, type Task } from '../api/taskApi.ts';
import { TaskCard } from '../components/TaskCard';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GetTask() {
  const [searchId, setSearchId] = useState('');
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchId) return;

    setLoading(true);
    setError('');
    setTask(null);

    try {
      const data = await taskApi.getTaskById(Number(searchId));
      if (data && data.title) {
        setTask(data);
      } else {
        setError('Task block not found in registry.');
      }
    } catch (e: any) {
      setError(e.response?.status === 404 ? 'Task ID 404: Block not found.' : 'Internal Server Error fetching block.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Search Registry</h1>
        <p className="text-slate-400">Query specific payload ID from the database.</p>
      </header>

      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="number"
          placeholder="Enter Task ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="input-field flex-1 font-mono text-lg"
          required
        />
        <button type="submit" disabled={loading} className="btn-primary px-8 flex items-center gap-2">
          {loading ? "Scanning..." : <><Search size={20} /> Query</>}
        </button>
      </form>

      {error && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-4 bg-devops-danger/20 border border-devops-danger text-devops-danger rounded-lg font-mono">
          [ERROR]: {error}
        </motion.div>
      )}

      {task && (
        <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="pt-4">
          <h2 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-widest font-mono">Result:</h2>
          <TaskCard task={task} />
        </motion.div>
      )}
    </div>
  );
}
