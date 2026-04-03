import { useState, useEffect } from 'react';
import { taskApi, type Task } from '../api/taskApi.ts';
import { motion } from 'framer-motion';
import { TaskCard } from '../components/TaskCard';
import { Activity, CheckCircle, Clock, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthStatus, setHealthStatus] = useState<boolean | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Health check parallel to tasks fetch
      const [apiHealth, tasksData] = await Promise.all([
        taskApi.checkHealth().catch(() => null),
        taskApi.getTasks()
      ]);
      setHealthStatus(!!apiHealth);
      setTasks(tasksData || []);
    } catch (e) {
      console.error(e);
      setHealthStatus(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status).length;
  const pending = total - completed;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">System Overview</h1>
        <p className="text-slate-400">Monitoring To-Do tasks orchestration.</p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Tasks" value={total} icon={Server} color="primary" delay={0.1} />
        <MetricCard title="Completed" value={completed} icon={CheckCircle} color="success" delay={0.2} />
        <MetricCard title="Pending" value={pending} icon={Clock} color="warning" delay={0.3} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 glass-card border-none bg-slate-800/80"
        >
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-xl bg-slate-900 border ${healthStatus ? 'border-devops-success shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-devops-danger shadow-[0_0_15px_rgba(239,68,68,0.3)]'}`}>
              <Activity className={healthStatus ? "text-devops-success" : "text-devops-danger"} size={26} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider font-mono">API Health</h3>
              <p className="text-2xl font-bold text-slate-100">{healthStatus === null ? '...' : (healthStatus ? 'ONLINE' : 'OFFLINE')}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Tasks Preview */}
      <div className="mt-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Recent Deployment Tasks</h2>
            <p className="text-slate-400 text-sm mt-1">Latest payloads received from the core.</p>
          </div>
          <Link to="/list" className="text-sm text-devops-primary hover:text-white font-medium flex items-center gap-1 transition-colors">
            View All Tasks &rarr;
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-40 bg-slate-800 rounded-xl" />)}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center p-12 glass-card border-dashed">
            <p className="text-slate-400 mb-4">No tasks in the current pipeline.</p>
            <Link to="/create"><button className="btn-primary">Provision New Task</button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {tasks.slice(-3).reverse().map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, delay }: any) {
  const getColors = () => {
    switch(color) {
      case 'success': return 'border-devops-success text-devops-success shadow-[0_0_15px_rgba(34,197,94,0.3)]';
      case 'warning': return 'border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
      default: return 'border-devops-primary text-devops-primary shadow-[0_0_15px_rgba(99,102,241,0.3)]';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="p-6 glass-card relative overflow-hidden group"
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className={`p-4 rounded-xl bg-slate-900 border ${getColors()}`}>
          <Icon size={26} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider font-mono">{title}</h3>
          <p className="text-4xl font-bold tracking-tighter text-slate-100">{value}</p>
        </div>
      </div>
      <div className={`absolute -right-6 -top-6 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity bg-current ${getColors()}`} />
    </motion.div>
  );
}
