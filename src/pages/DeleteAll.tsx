import { useState } from 'react';
import { taskApi } from '../api/taskApi.ts';
import { ShieldAlert, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function DeleteAll() {
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handlePurge = async () => {
    setLoading(true);
    try {
      await taskApi.deleteAllTasks();
      setConfirmOpen(false);
      navigate('/list');
    } catch (e) {
      console.error(e);
      alert("System Error: Could not drop schemas.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-16 flex flex-col items-center text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-devops-danger/20 flex items-center justify-center border border-devops-danger text-devops-danger shadow-[0_0_30px_rgba(239,68,68,0.4)] mb-4">
        <ShieldAlert size={48} />
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight text-white">Nuclear Option</h1>
      <p className="text-slate-400 text-lg max-w-md">
        This action will permanently drop <strong className="text-white">ALL tasks</strong> from the target database. There is no rollback protocol.
      </p>

      <div className="pt-8">
        <button 
          onClick={() => setConfirmOpen(true)}
          className="px-8 py-4 bg-devops-danger/80 hover:bg-devops-danger text-white font-bold rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300 text-lg flex items-center gap-3 hover:scale-105"
        >
          <AlertOctagon size={24} /> INITIALIZE PURGE SEQUENCE
        </button>
      </div>

      {confirmOpen && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} className="glass-card p-8 border-devops-danger max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-devops-danger mb-4">CRITICAL WARNING</h3>
            <p className="text-slate-300 mb-8 font-mono bg-black/50 p-4 rounded text-sm text-left">
              &gt; SYS_DROP_ALL executing...<br/>
              &gt; WARNING: Action cannot be undone.<br/>
              &gt; Do you wish to proceed?
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setConfirmOpen(false)} 
                className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-medium transition-colors"
              >
                ABORT
              </button>
              <button 
                onClick={handlePurge} 
                disabled={loading} 
                className="flex-1 px-4 py-3 bg-devops-danger hover:bg-red-600 rounded-lg text-white font-bold transition-colors shadow-[0_0_15px_rgba(239,68,68,0.8)]"
              >
                {loading ? 'PURGING...' : 'PROCEED'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
