import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthProvider'
import DashboardLayout from '../layout/DashboardLayout'
import StatCard from '../common/StatCard'
import TaskTable from '../tasks/TaskTable'
import CreateTask from '../tasks/CreateTask'
import CreateEmployee from '../tasks/CreateEmployee'
import Avatar from '../common/Avatar'
import StatusBadge from '../common/StatusBadge'
import api from '../../utils/api'
import {
  UsersIcon, TasksIcon, ClockIcon, CheckIcon, BellIcon,
  TrendingUpIcon, ArrowRightIcon, CheckCircleIcon, InboxIcon,
} from '../common/Icons'

const greeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const SectionTitle = ({ title, sub }) => (
  <div className='mb-5'>
    <h2 className='text-xl font-bold text-white'>{title}</h2>
    {sub && <p className='mt-0.5 text-sm text-slate-500'>{sub}</p>}
  </div>
)

const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([])
  const [tasks, setTasks] = useState([])
  const [revertRequests, setRevertRequests] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterEmployee, setFilterEmployee] = useState('all')
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const notifRef = useRef(null)
  const { user } = useAuth()

  /* close notification dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotifications(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    setApiError('')
    try {
      const [empRes, taskRes, reqRes] = await Promise.all([
        api.get('/manager/employees'),
        api.get('/manager/tasks'),
        api.get('/manager/revert-requests'),
      ])
      setEmployees(empRes.data)
      setTasks(taskRes.data)
      setRevertRequests(reqRes.data)
    } catch (err) {
      setApiError(err.response?.data?.message || 'Could not reach the server. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const removeEmployee = async (id) => {
    if (!window.confirm('Remove this employee and all their tasks?')) return
    try {
      await api.delete(`/manager/employee/${id}`)
      fetchAll()
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to remove employee')
    }
  }

  const approveRevert = async (id) => {
    try {
      await api.patch(`/manager/task/${id}/approve-revert`)
      fetchAll()
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to approve revert')
    }
  }

  /* derived stats */
  const counts = {
    new: tasks.filter((t) => t.status === 'new').length,
    active: tasks.filter((t) => t.status === 'active').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    failed: tasks.filter((t) => t.status === 'failed').length,
  }
  const total = tasks.length
  const completionRate = total ? Math.round((counts.completed / total) * 100) : 0

  const filteredTasks = tasks.filter((t) => {
    const matchStatus = filterStatus === 'all' || t.status === filterStatus
    const empId = t.employeeId?._id || t.employeeId
    const matchEmp = filterEmployee === 'all' || empId === filterEmployee
    return matchStatus && matchEmp
  })

  const nav = [
    { id: 'overview', label: 'Overview', icon: TrendingUpIcon },
    { id: 'tasks', label: 'Tasks', icon: TasksIcon },
    { id: 'team', label: 'Team', icon: UsersIcon },
    { id: 'requests', label: 'Requests', icon: BellIcon, badge: revertRequests.length },
  ]

  return (
    <DashboardLayout nav={nav} active={activeTab} onNavigate={setActiveTab}>
      {/* Page heading + notifications */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-extrabold tracking-tight text-white sm:text-3xl'>
            {greeting()}, <span className='text-gradient'>{user?.name?.split(' ')[0] || 'Manager'}</span>
          </h1>
          <p className='mt-1 text-sm text-slate-500'>
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} · Here's what's happening with your team.
          </p>
        </div>

        {/* Notification bell */}
        <div className='relative' ref={notifRef}>
          <button
            onClick={() => setShowNotifications((v) => !v)}
            className='btn-ghost !rounded-full !p-3 relative'
            aria-label='Revert requests'
          >
            <BellIcon className='h-5 w-5' />
            {revertRequests.length > 0 && (
              <span className='absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white'>
                {revertRequests.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className='absolute right-0 top-full z-50 mt-2 w-80'>
              <div className='card overflow-hidden !bg-slate-900'>
                <div className='border-b border-white/5 px-4 py-3 text-sm font-bold text-white'>
                  Revert Requests
                </div>
                {revertRequests.length === 0 ? (
                  <p className='px-4 py-6 text-center text-sm text-slate-500'>No pending requests 🎉</p>
                ) : (
                  revertRequests.map((task) => (
                    <div key={task._id} className='flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3 last:border-0'>
                      <div className='min-w-0'>
                        <p className='truncate text-sm font-semibold text-white'>{task.title}</p>
                        <p className='truncate text-xs text-slate-500'>
                          {task.employeeId?.name} wants to revert to active
                        </p>
                      </div>
                      <button
                        onClick={() => approveRevert(task._id)}
                        className='btn-primary shrink-0 !rounded-lg !px-3 !py-1.5 text-xs'
                      >
                        Approve
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
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
          {/* ================= OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className='mt-8'>
              <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                <StatCard icon={UsersIcon} label='Team Members' value={employees.length} tone='indigo' />
                <StatCard icon={TasksIcon} label='Total Tasks' value={total} tone='sky' />
                <StatCard icon={ClockIcon} label='In Progress' value={counts.active + counts.new} tone='amber' sub={`${counts.new} new · ${counts.active} active`} />
                <StatCard icon={CheckIcon} label='Completed' value={counts.completed} tone='emerald' sub={`${counts.failed} failed`} />
              </div>

              {/* Completion rate */}
              <div className='card mt-5 p-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300'>
                      <TrendingUpIcon className='h-5 w-5' />
                    </span>
                    <div>
                      <h3 className='font-bold text-white'>Team Completion Rate</h3>
                      <p className='text-xs text-slate-500'>Share of assigned tasks marked complete</p>
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

              {/* Revert alert */}
              {revertRequests.length > 0 && (
                <button
                  onClick={() => setActiveTab('requests')}
                  className='mt-5 flex w-full items-center justify-between gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-left transition hover:bg-amber-400/15'
                >
                  <div className='flex items-center gap-3'>
                    <BellIcon className='h-5 w-5 shrink-0 text-amber-300' />
                    <p className='text-sm font-semibold text-amber-200'>
                      {revertRequests.length} revert request{revertRequests.length > 1 ? 's' : ''} waiting for your approval
                    </p>
                  </div>
                  <ArrowRightIcon className='h-4 w-4 shrink-0 text-amber-300' />
                </button>
              )}

              {/* Recent tasks */}
              <div className='mt-8'>
                <SectionTitle title='Recent Tasks' sub='Latest 5 assignments across your team.' />
                <TaskTable tasks={[...tasks].reverse().slice(0, 5)} />
              </div>
            </div>
          )}

          {/* ================= TASKS ================= */}
          {activeTab === 'tasks' && (
            <div className='mt-8'>
              <CreateTask employees={employees} onTaskCreated={fetchAll} />

              {/* Filters */}
              <div className='mt-6 flex flex-wrap items-center gap-3'>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className='field !w-auto'>
                  <option value='all' className='bg-slate-900'>All Statuses</option>
                  <option value='new' className='bg-slate-900'>New</option>
                  <option value='active' className='bg-slate-900'>Active</option>
                  <option value='completed' className='bg-slate-900'>Completed</option>
                  <option value='failed' className='bg-slate-900'>Failed</option>
                </select>
                <select value={filterEmployee} onChange={(e) => setFilterEmployee(e.target.value)} className='field !w-auto'>
                  <option value='all' className='bg-slate-900'>All Employees</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id} className='bg-slate-900'>{emp.name}</option>
                  ))}
                </select>
                {(filterStatus !== 'all' || filterEmployee !== 'all') && (
                  <button onClick={() => { setFilterStatus('all'); setFilterEmployee('all') }} className='btn-danger-ghost'>
                    Clear Filters
                  </button>
                )}
              </div>

              <div className='mt-5'>
                <TaskTable tasks={filteredTasks} />
              </div>
            </div>
          )}

          {/* ================= TEAM ================= */}
          {activeTab === 'team' && (
            <div className='mt-8'>
              <CreateEmployee onEmployeeCreated={fetchAll} />

              <div className='mt-6'>
                <SectionTitle title={`Your Team (${employees.length})`} sub={`Everyone you've created, with their current workload.`} />
                {employees.length === 0 ? (
                  <div className='card flex flex-col items-center gap-2 py-14 text-slate-500'>
                    <UsersIcon className='h-8 w-8' />
                    <p className='text-sm'>No employees in your team yet — add one above.</p>
                  </div>
                ) : (
                  <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
                    {employees.map((emp) => {
                      const empTasks = tasks.filter((t) => (t.employeeId?._id || t.employeeId) === emp._id)
                      const done = empTasks.filter((t) => t.status === 'completed').length
                      return (
                        <div key={emp._id} className='card card-hover p-5'>
                          <div className='flex items-start justify-between'>
                            <div className='flex items-center gap-3'>
                              <Avatar name={emp.name} size='lg' />
                              <div className='min-w-0'>
                                <p className='truncate font-bold text-white'>{emp.name}</p>
                                <p className='truncate text-xs text-slate-500'>{emp.email}</p>
                              </div>
                            </div>
                            <button onClick={() => removeEmployee(emp._id)} className='btn-danger-ghost !p-2' aria-label={`Remove ${emp.name}`}>
                              <svg fill='none' viewBox='0 0 24 24' strokeWidth={1.8} stroke='currentColor' className='h-4 w-4'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                              </svg>
                            </button>
                          </div>
                          <div className='mt-4 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3'>
                            <div className='text-center'>
                              <p className='text-lg font-extrabold text-white'>{empTasks.length}</p>
                              <p className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>Tasks</p>
                            </div>
                            <div className='h-8 w-px bg-white/10' />
                            <div className='text-center'>
                              <p className='text-lg font-extrabold text-emerald-300'>{done}</p>
                              <p className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>Done</p>
                            </div>
                            <div className='h-8 w-px bg-white/10' />
                            <div className='text-center'>
                              <p className='text-lg font-extrabold text-amber-300'>{empTasks.filter((t) => t.status === 'active' || t.status === 'new').length}</p>
                              <p className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>Open</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= REQUESTS ================= */}
          {activeTab === 'requests' && (
            <div className='mt-8'>
              <SectionTitle title='Revert Requests' sub='Employees asking to reopen completed or failed tasks.' />
              {revertRequests.length === 0 ? (
                <div className='card flex flex-col items-center gap-3 py-16 text-slate-500'>
                  <CheckCircleIcon className='h-10 w-10 text-emerald-400/70' />
                  <p className='text-sm font-medium'>All caught up — no pending requests.</p>
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  {revertRequests.map((task) => (
                    <div key={task._id} className='card flex flex-wrap items-center justify-between gap-4 p-5'>
                      <div className='flex min-w-0 items-center gap-4'>
                        <Avatar name={task.employeeId?.name || 'Unknown'} size='lg' />
                        <div className='min-w-0'>
                          <p className='truncate font-bold text-white'>{task.title}</p>
                          <p className='truncate text-sm text-slate-500'>
                            {task.employeeId?.name} · currently <StatusBadge status={task.status} />
                          </p>
                        </div>
                      </div>
                      <button onClick={() => approveRevert(task._id)} className='btn-primary'>
                        <CheckIcon className='h-4 w-4' /> Approve Revert
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  )
}

export default ManagerDashboard
