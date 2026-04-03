import { motion } from 'framer-motion';
import type { Task } from '../api/taskApi.ts';
import { Trash2, Edit3, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onDelete?: (id: number) => void;
  onClick?: () => void;
}

export function TaskCard({ task, onDelete, onClick }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={clsx(
        "p-5 rounded-xl border bg-slate-800/60 backdrop-blur-sm cursor-pointer transition-colors shadow-lg relative group",
        task.status ? "border-devops-success/30 hover:border-devops-success/50" : "border-devops-primary/30 hover:border-devops-primary/50"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {task.status ? (
            <CheckCircle className="text-devops-success drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" size={20} />
          ) : (
            <Clock className="text-devops-primary drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]" size={20} />
          )}
          <span className="text-xs font-mono font-semibold text-slate-400">ID: {task.id}</span>
        </div>
        
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
          <Link to={`/update?id=${task.id}`} onClick={(e) => e.stopPropagation()}>
            <button className="p-2 bg-slate-700/50 hover:bg-devops-primary/40 rounded-md text-slate-300 hover:text-white transition-colors">
              <Edit3 size={16} />
            </button>
          </Link>
          {onDelete && (
            <button 
              onClick={(e) => { e.stopPropagation(); if (task.id) onDelete(task.id); }}
              className="p-2 bg-slate-700/50 hover:bg-devops-danger/40 rounded-md text-slate-300 hover:text-white transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      
      <h3 className={clsx(
        "text-lg font-bold mb-2 tracking-tight",
        task.status ? "text-slate-300 line-through decoration-devops-success/50" : "text-slate-100"
      )}>
        {task.title}
      </h3>
      <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
        {task.description || 'No description provided.'}
      </p>
      
      {/* Decorative Glow */}
      <div className={clsx(
        "absolute -bottom-1 -right-1 w-12 h-12 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity",
        task.status ? "bg-devops-success" : "bg-devops-primary"
      )} />
    </motion.div>
  );
}
