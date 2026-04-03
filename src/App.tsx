import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import ListTasks from './pages/ListTasks';
import GetTask from './pages/GetTask';
import UpdateTask from './pages/UpdateTask';
import DeleteTask from './pages/DeleteTask';
import DeleteAll from './pages/DeleteAll';
import HealthCheck from './pages/HealthCheck';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateTask />} />
          <Route path="list" element={<ListTasks />} />
          <Route path="get" element={<GetTask />} />
          <Route path="update" element={<UpdateTask />} />
          <Route path="delete" element={<DeleteTask />} />
          <Route path="delete-all" element={<DeleteAll />} />
          <Route path="health" element={<HealthCheck />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
