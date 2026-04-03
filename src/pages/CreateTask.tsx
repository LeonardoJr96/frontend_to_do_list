import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskApi } from '../api/taskApi.ts';
import { TaskForm } from '../components/TaskForm';
import { motion } from 'framer-motion';

export default function CreateTask() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (task: any) => {
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    
    try {
      await taskApi.createTask(task);
      setSuccessMsg('Task successfully provisioned in the database.');
      setTimeout(() => navigate('/list'), 1500);
    } catch (e) {
      setErrorMsg('Pipeline failed: Could not persist task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto h-full flex flex-col pt-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Deploy New Task</h1>
        <p className="text-slate-400">Add a new execution block to the pipeline.</p>
      </header>
      
      {successMsg && (
        <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="p-4 bg-devops-success/20 border border-devops-success text-devops-success rounded-lg">
          {successMsg}
        </motion.div>
      )}

      {errorMsg && (
        <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="p-4 bg-devops-danger/20 border border-devops-danger text-devops-danger rounded-lg">
          {errorMsg}
        </motion.div>
      )}

      <TaskForm onSubmit={handleSubmit} isLoading={loading} buttonText="Execute Deployment" />
    </div>
  );
}
