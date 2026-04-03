import { useState, useEffect } from 'react';
import { taskApi } from '../api/taskApi.ts';
import { Activity, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HealthCheck() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState('Pinging core server...');

  const performCheck = async () => {
    setLoading(true);
    setStatusText('Resolving handshakes with backend...');
    
    // Artificial delay for futuristic dashboard effect
    await new Promise(r => setTimeout(r, 800));
    
    try {
      const data = await taskApi.checkHealth();
      setResponse(data);
      setStatusText('Connection Established. System optimal.');
    } catch (e: any) {
      setResponse({ error: e.message || "Connection refused." });
      setStatusText('CRITICAL: Core offline or inaccessible.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performCheck();
  }, []);

  return (
    <div className="space-y-6 max-w-2xl mx-auto pt-10">
      <header className="flex items-center gap-4 mb-8">
        <div className={`p-4 rounded-xl ${response?.error ? 'bg-devops-danger/20 text-devops-danger' : 'bg-devops-primary/20 text-devops-primary'}`}>
          <Activity size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Diagnostics</h1>
          <p className="text-slate-400">Live health telemetry block.</p>
        </div>
      </header>

      <div className="glass-card overflow-hidden">
        <div className="bg-slate-900 border-b border-slate-700/50 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
            <Terminal size={16} /> /dev/api/health
          </div>
          <button onClick={performCheck} disabled={loading} className="text-xs text-devops-primary hover:text-white uppercase font-bold tracking-wider">
            Re-run Diagnostic
          </button>
        </div>
        
        <div className="p-6 font-mono text-sm">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} key={statusText} className="mb-4 text-slate-400">
            &gt; {statusText}
          </motion.div>

          {loading ? (
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-devops-primary rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-devops-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
              <span className="w-2 h-2 bg-devops-primary rounded-full animate-bounce" style={{animationDelay: '0.4s'}} />
            </div>
          ) : (
            <motion.pre 
              initial={{opacity:0, y:10}} 
              animate={{opacity:1, y:0}} 
              className={`p-4 rounded bg-black/50 overflow-x-auto ${response?.error ? 'text-devops-danger' : 'text-devops-success'}`}
            >
              {JSON.stringify(response, null, 2)}
            </motion.pre>
          )}
        </div>
      </div>
    </div>
  );
}
