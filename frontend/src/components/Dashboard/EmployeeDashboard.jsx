import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthProvider'
import DashboardLayout from '../layout/DashboardLayout'
import StatCard from '../common/StatCard'
import TaskCard from '../tasks/TaskCard'
import api from '../../utils/api'
import {
  TasksIcon, ClockIcon, CheckIcon, InboxIcon, TrendingUpIcon,
} from '../common/Icons'

const greeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const filters = [
  { id: 'all', label: 'All Tasks' },
  { id: 'new', label: 'New' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'failed', label: 'Failed' },
]

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const { user } = useAuth()

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/employee/tasks')
      setTasks(data)
      setApiError('')
    } catch (err) {
      setApiError(err.response?.data?.message || 'Could not reach the server. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const counts = {
    new: tasks.filter((t) => t.status === 'new').length,
    active: tasks.filter((t) => t.status === 'active').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    failed: tasks.filter((t) => t.status === 'failed').length,
  }
  const total = tasks.length
  const completionRate = total ? Math.round((counts.completed / total) * 100) : 0

  const filtered = filterStatus === 'all' ? tasks : tasks.filter((t) => t.status === filterStatus)

  const nav = [
    { id: 'overview', label: 'Overview', icon: TrendingUpIcon },
    { id: 'tasks', label: 'My Tasks', icon: TasksIcon },
  ]

  return (
    <DashboardLayout nav={nav} active={activeTab} onNavigate={setActiveTab}>
      {/* Page heading */}
      <div>
        <h1 className='text-2xl font-extrabold tracking-tight text-white sm:text-3xl'>
          {greeting()}, <span className='text-gradient'>{user?.name?.split(' ')[0] || 'there'}</span>
        </h1>
        <p className='mt-1 text-sm text-slate-500'>
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} · You have {counts.new + counts.active} open task{counts.new + counts.active === 1 ? '' : 's'} today.
        </p>
      </div>

      {apiError && (
        <div className='mt-6 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300'>
          {apiError}
        </div>
      )}

      {loading ? (
        <div className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='card h-28 animate-pulse bg-white/[0.03]' />
          ))}
        </div>
      ) : (
        <>
          {activeTab === 'overview' && (
            <div className='mt-8'>
              <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                <StatCard icon={TasksIcon} label='Total Tasks' value={total} tone='indigo' />
                <StatCard icon={InboxIcon} label='New' value={counts.new} tone='sky' />
                <StatCard icon={ClockIcon} label='Active' value={counts.active} tone='amber' />
                <StatCard icon={CheckIcon} label='Completed' value={counts.completed} tone='emerald' sub={`${counts.failed} failed`} />
              </div>

              {/* Progress */}
              <div className='card mt-5 p-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300'>
                      <TrendingUpIcon className='h-5 w-5' />
                    </span>
                    <div>
                      <h3 className='font-bold text-white'>Your Progress</h3>
                      <p className='text-xs text-slate-500'>Share of your tasks marked complete</p>
                    </div>
                  </div>
                  <span className='text-2xl font-extrabold text-emerald-300'>{completionRate}%</span>
                </div>
                <div className='mt-4 h-2.5 overflow-hidden rounded-full bg-white/5'>
                  <div
                    className='h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700'
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>

              {/* Recent tasks preview */}
              <div className='mt-8'>
                <div className='mb-5 flex items-center justify-between'>
                  <div>
                    <h2 className='text-xl font-bold text-white'>Latest Tasks</h2>
                    <p className='mt-0.5 text-sm text-slate-500'>Your 4 most recent assignments.</p>
                  </div>
                  <button onClick={() => setActiveTab('tasks')} className='btn-ghost !px-4 !py-2 text-xs'>
                    View all
                  </button>
                </div>
                <div className='grid gap-5 md:grid-cols-2'>
                  {[...tasks].reverse().slice(0, 4).map((task) => (
                    <TaskCard key={task._id} task={task} onTaskUpdated={fetchTasks} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className='mt-8'>
              {/* Filter pills */}
              <div className='flex flex-wrap gap-2'>
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterStatus(f.id)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      filterStatus === f.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {f.label}
                    {f.id !== 'all' && (
                      <span className='ml-1.5 opacity-60'>({counts[f.id]})</span>
                    )}
                  </button>
                ))}
              </div>

              <div className='mt-6'>
                {filtered.length === 0 ? (
                  <div className='card flex flex-col items-center gap-3 py-16 text-slate-500'>
                    <InboxIcon className='h-10 w-10' />
                    <p className='text-sm font-medium'>
                      {filterStatus === 'all' ? 'No tasks assigned to you yet.' : `No ${filterStatus} tasks right now.`}
                    </p>
                  </div>
                ) : (
                  <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
                    {filtered.map((task) => (
                      <TaskCard key={task._id} task={task} onTaskUpdated={fetchTasks} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  )
}

export default EmployeeDashboard
