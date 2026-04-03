import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import type { Task } from '../api/taskApi.ts';
import { Save, CheckCircle2, Circle } from 'lucide-react';

interface TaskFormProps {
  initialData?: Partial<Task>;
  onSubmit: (task: Omit<Task, 'id'>) => Promise<void>;
  isLoading?: boolean;
  buttonText?: string;
}

export function TaskForm({ initialData = {}, onSubmit, isLoading = false, buttonText = "Save Task" }: TaskFormProps) {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [status, setStatus] = useState(initialData.status || false);

  useEffect(() => {
    if (initialData.title !== undefined) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setStatus(initialData.status || false);
    }
  }, [initialData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, description, status });
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="space-y-6 w-full max-w-2xl bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-md"
    >
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-slate-300 font-mono tracking-wider">TITLE</label>
        <input 
          id="title"
          type="text" 
          required 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="input-field text-lg"
          placeholder="e.g. Implement Redis caching"
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-slate-300 font-mono tracking-wider">DESCRIPTION</label>
        <textarea 
          id="description"
          rows={4}
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="input-field resize-none"
          placeholder="Provide detailed instructions..."
        />
      </div>

      <div className="flex items-center gap-4 py-2">
        <button
          type="button"
          onClick={() => setStatus(!status)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 transition-colors"
        >
          {status ? (
            <CheckCircle2 className="text-devops-success" size={20} />
          ) : (
            <Circle className="text-slate-500" size={20} />
          )}
          <span className="font-medium text-slate-300">
            {status ? "Completed" : "Pending"}
          </span>
        </button>
        <span className="text-xs text-slate-500 italic">Toggle completion status</span>
      </div>

      <div className="pt-4 border-t border-slate-700/50">
        <button 
          type="submit" 
          disabled={isLoading || !title.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              <Save size={20} /> 
              {buttonText}
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
