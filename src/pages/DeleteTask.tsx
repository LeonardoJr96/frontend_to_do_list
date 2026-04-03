import { useState, type FormEvent } from 'react';
import { taskApi } from '../api/taskApi.ts';
import { Trash2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DeleteTask() {
  const [deleteId, setDeleteId] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleRequestDelete = (e: FormEvent) => {
    e.preventDefault();
    if (deleteId) setConfirmOpen(true);
  };

  const executeDelete = async () => {
    setLoading(true);
    setMsg({ type: '', text: '' });
    try {
      await taskApi.deleteTask(Number(deleteId));
      setMsg({ type: 'success', text: 'Task block successfully purged.' });
      setDeleteId('');
    } catch (e: any) {
      setMsg({ type: 'error', text: e.response?.status === 404 ? 'ID not found.' : 'Failed to purge block.' });
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-devops-danger">Terminate Task</h1>
        <p className="text-slate-400">Permanently drop a payload from the registry.</p>
      </header>

      <form onSubmit={handleRequestDelete} className="flex gap-4">
        <input
          type="number"
          placeholder="Task ID to drop..."
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          className="input-field w-40 font-mono text-lg"
          required
        />
        <button type="submit" className="btn-danger flex items-center gap-2">
          <Trash2 size={20} /> Request Terminate
        </button>
      </form>

      {msg.text && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`p-4 rounded-lg flex items-center ${msg.type === 'error' ? 'bg-devops-danger/20 text-devops-danger border-devops-danger' : 'bg-devops-success/20 text-devops-success border-devops-success'} border`}>
          {msg.text}
        </motion.div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmOpen && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} className="glass-card p-6 border-devops-danger/50 max-w-sm w-full">
            <div className="flex items-center gap-3 text-devops-danger mb-4">
              <AlertTriangle size={28} />
              <h3 className="text-xl font-bold">Confirm Deletion</h3>
            </div>
            <p className="text-slate-300 mb-6">Are you absolutely sure you want to purge ID <span className="font-mono text-white font-bold">{deleteId}</span>?</p>
            <div className="flex gap-4 justify-end">
              <button onClick={() => setConfirmOpen(false)} className="px-4 py-2 hover:bg-slate-700/50 rounded-lg text-slate-300 transition-colors">Cancel</button>
              <button onClick={executeDelete} disabled={loading} className="btn-danger">{loading ? 'Purging...' : 'Confirm Purge'}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
