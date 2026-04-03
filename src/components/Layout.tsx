import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, PlusCircle, ListTodo, Search, 
  Edit3, Trash2, ShieldAlert, Activity 
} from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/create', label: 'Create', icon: PlusCircle },
  { path: '/list', label: 'List Tasks', icon: ListTodo },
  { path: '/get', label: 'Search', icon: Search },
  { path: '/update', label: 'Update', icon: Edit3 },
  { path: '/delete', label: 'Delete', icon: Trash2 },
  { path: '/delete-all', label: 'Purge', icon: ShieldAlert, danger: true },
  { path: '/health', label: 'API Health', icon: Activity },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }} 
        animate={{ x: 0 }} 
        className="w-64 glass-card m-4 flex flex-col border-r-0 rounded-l-2xl z-10"
      >
        <div className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-devops-primary to-devops-success bg-clip-text text-transparent italic tracking-wider shadow-sm">
            NEXUS TODO
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold font-mono">DevOps Core</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} to={item.path}>
                <div className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group cursor-pointer",
                  isActive 
                    ? (item.danger ? "bg-devops-danger/20 text-devops-danger" : "bg-devops-primary/20 text-devops-primary") 
                    : "text-slate-300 hover:bg-slate-700/30"
                )}>
                  <Icon size={20} className={clsx(
                    isActive && item.danger ? "text-devops-danger drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "",
                    isActive && !item.danger ? "text-devops-primary drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" : "",
                    !isActive && "group-hover:text-slate-100"
                  )} />
                  <span className="font-medium text-sm">{item.label}</span>
                  
                  {isActive && (
                    <motion.div layoutId="sidebar-indicator" className={clsx(
                      "w-1 h-6 rounded-full ml-auto",
                      item.danger ? "bg-devops-danger" : "bg-devops-primary"
                    )} />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 pl-0">
        <div className="glass-card h-full w-full relative overflow-hidden rounded-r-2xl border-l-0 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
