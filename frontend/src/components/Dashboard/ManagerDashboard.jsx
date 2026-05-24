import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import CreateEmployee from '../other/CreateEmployee'
import AllTask from '../other/AllTask'
import api from '../../utils/api'

const LogoutButton = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  return (
    <button onClick={() => { logout(); navigate('/') }}
      className='bg-red-600 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-red-700 transition'>
      Log out
    </button>
  )
}

const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([])
  const [tasks, setTasks] = useState([])
  const [activeTab, setActiveTab] = useState('tasks')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterEmployee, setFilterEmployee] = useState('all')
  const [revertRequests, setRevertRequests] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotifications(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchEmployees = async () => {
    const { data } = await api.get('/manager/employees')
    setEmployees(data)
  }

  const fetchTasks = async () => {
    const { data } = await api.get('/manager/tasks')
    setTasks(data)
  }

  const fetchRevertRequests = async () => {
    const { data } = await api.get('/manager/revert-requests')
    setRevertRequests(data)
  }

  useEffect(() => {
    fetchEmployees()
    fetchTasks()
    fetchRevertRequests()
  }, [])

  const removeEmployee = async (id) => {
    if (!window.confirm('Remove this employee and all their tasks?')) return
    await api.delete(`/manager/employee/${id}`)
    fetchEmployees()
    fetchTasks()
  }

  const approveRevert = async (id) => {
    await api.patch(`/manager/task/${id}/approve-revert`)
    fetchRevertRequests()
    fetchTasks()
  }

  return (
    <div className='min-h-screen bg-[#1c1c1c] w-full p-10 text-white'>
      <div className='flex justify-between items-start'>
        <Header />
        {/* Notification Bell + Logout */}
        <div className='flex items-center gap-3'>
          <div className='relative' ref={notifRef}>
            <button onClick={() => setShowNotifications(!showNotifications)}
              className='relative bg-[#2a2a2a] border border-gray-700 p-3 rounded-xl hover:border-emerald-500 transition'>
              <span className='text-xl'>🔔</span>
              {revertRequests.length > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold'>
                  {revertRequests.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className='absolute right-0 mt-2 w-80 bg-[#2a2a2a] border border-gray-700 rounded-xl shadow-xl z-50'>
                <div className='px-4 py-3 border-b border-gray-700 font-semibold text-white'>Revert Requests</div>
                {revertRequests.length === 0 && (
                  <p className='text-gray-500 text-sm text-center py-6'>No pending requests</p>
                )}
                {revertRequests.map((task) => (
                  <div key={task._id} className='px-4 py-3 border-b border-gray-800 flex justify-between items-center gap-3'>
                    <div>
                      <p className='text-white text-sm font-medium'>{task.title}</p>
                      <p className='text-gray-400 text-xs'>{task.employeeId?.name} wants to revert to active</p>
                    </div>
                    <button onClick={() => approveRevert(task._id)}
                      className='bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition font-medium shrink-0'>
                      OK
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <LogoutButton />
        </div>
      </div>

      <div className='flex gap-4 mt-8'>
        <button onClick={() => setActiveTab('tasks')}
          className={`px-6 py-2 rounded-sm text-lg font-medium transition ${activeTab === 'tasks' ? 'bg-emerald-600' : 'border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-600/10'}`}>
          Assign Tasks
        </button>
        <button onClick={() => setActiveTab('team')}
          className={`px-6 py-2 rounded-sm text-lg font-medium transition ${activeTab === 'team' ? 'bg-emerald-600' : 'border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-600/10'}`}>
          Manage Team ({employees.length})
        </button>
      </div>

      {activeTab === 'tasks' && (
        <>
          <CreateTask employees={employees} onTaskCreated={fetchTasks} />

          {/* Filters */}
          <div className='flex flex-wrap gap-3 mt-6'>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className='bg-[#2a2a2a] border border-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-emerald-500'>
              <option value='all'>All Status</option>
              <option value='new'>New</option>
              <option value='active'>Active</option>
              <option value='completed'>Completed</option>
              <option value='failed'>Failed</option>
            </select>
            <select value={filterEmployee} onChange={(e) => setFilterEmployee(e.target.value)}
              className='bg-[#2a2a2a] border border-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-emerald-500'>
              <option value='all'>All Employees</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>{emp.name}</option>
              ))}
            </select>
            {(filterStatus !== 'all' || filterEmployee !== 'all') && (
              <button onClick={() => { setFilterStatus('all'); setFilterEmployee('all') }}
                className='text-sm text-red-400 border border-red-400 px-3 py-1 rounded-lg hover:bg-red-400/10 transition'>
                Clear Filters
              </button>
            )}
          </div>

          <AllTask tasks={tasks.filter((t) => {
            const matchStatus = filterStatus === 'all' || t.status === filterStatus
            const matchEmp = filterEmployee === 'all' || t.employeeId?._id === filterEmployee || t.employeeId === filterEmployee
            return matchStatus && matchEmp
          })} />
        </>
      )}

      {activeTab === 'team' && (
        <>
          <CreateEmployee onEmployeeCreated={fetchEmployees} />
          <div className='bg-[#1c1c1c] border border-gray-700 rounded mt-5 overflow-auto max-h-72'>
            {employees.length === 0 && <p className='text-gray-400 text-center p-10'>No employees in your team yet.</p>}
            {employees.map((emp) => (
              <div key={emp._id} className='flex justify-between items-center px-5 py-3 border-b border-gray-700'>
                <span className='text-white font-medium'>{emp.name}</span>
                <span className='text-gray-400 text-sm'>{emp.email}</span>
                <span className='text-emerald-400 text-sm'>
                  {tasks.filter((t) => t.employeeId?._id === emp._id || t.employeeId === emp._id).length} tasks
                </span>
                <button onClick={() => removeEmployee(emp._id)}
                  className='text-red-400 border border-red-400 px-3 py-1 rounded text-sm hover:bg-red-400/10 transition'>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ManagerDashboard
