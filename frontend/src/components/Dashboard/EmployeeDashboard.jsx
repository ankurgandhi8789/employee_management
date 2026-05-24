import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import Header from '../other/Header'
import TaskListNumber from '../other/TaskListNumber'
import TaskList from '../TaskList/TaskList'
import api from '../../utils/api'

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const { logout } = useAuth()
  const navigate = useNavigate()

  const fetchTasks = async () => {
    const { data } = await api.get('/employee/tasks')
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const filtered = filterStatus === 'all' ? tasks : tasks.filter((t) => t.status === filterStatus)

  return (
    <div className='p-10 bg-[#1c1c1c] min-h-screen'>
      <div className='flex justify-between items-start'>
        <Header />
        <button onClick={() => { logout(); navigate('/') }}
          className='bg-red-600 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-red-700 transition'>
          Log out
        </button>
      </div>
      <TaskListNumber tasks={tasks} />

      {/* Filter */}
      <div className='flex gap-2 mt-6 flex-wrap'>
        {['all', 'new', 'active', 'completed', 'failed'].map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition border ${
              filterStatus === s
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'border-gray-600 text-gray-400 hover:border-emerald-500 hover:text-emerald-400'
            }`}>
            {s === 'all' ? 'All Tasks' : s}
          </button>
        ))}
      </div>

      <TaskList tasks={filtered} onTaskUpdated={fetchTasks} />
    </div>
  )
}

export default EmployeeDashboard
