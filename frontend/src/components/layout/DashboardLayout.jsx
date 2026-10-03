import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import Logo from '../common/Logo'
import Avatar from '../common/Avatar'
import { LogoutIcon } from '../common/Icons'

/**
 * Shared dashboard shell: sidebar navigation (desktop), top nav (mobile),
 * user card with logout, and a main content area.
 */
const DashboardLayout = ({ nav, active, onNavigate, children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = () => {
    setLoggingOut(true)
    logout()
    navigate('/')
  }

  const roleLabel = user?.role === 'manager' ? 'Manager' : 'Employee'

  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      {/* Ambient background glows */}
      <div className='pointer-events-none fixed -top-40 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl' />
      <div className='pointer-events-none fixed -bottom-40 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl' />

      <div className='relative mx-auto flex max-w-[1500px]'>
        {/* ---------- Sidebar (desktop) ---------- */}
        <aside className='sticky top-0 hidden h-screen w-72 shrink-0 flex-col justify-between border-r border-white/5 bg-slate-950/80 p-6 backdrop-blur lg:flex'>
          <div>
            <Logo />
            <nav className='mt-10 flex flex-col gap-1.5'>
              {nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-item ${active === item.id ? 'nav-item-active' : ''}`}
                >
                  <item.icon className='h-5 w-5 shrink-0' />
                  <span className='flex-1 text-left'>{item.label}</span>
                  {item.badge > 0 && (
                    <span className='flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold text-white'>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* User card */}
          <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
            <div className='flex items-center gap-3'>
              <Avatar name={user?.name || '?'} ring />
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-semibold text-white'>
                  {user?.name || 'User'}
                </p>
                <p className='truncate text-xs text-slate-500'>{user?.email}</p>
              </div>
            </div>
            <div className='mt-3 flex items-center justify-between border-t border-white/5 pt-3'>
              <span className='rounded-full bg-indigo-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-indigo-300'>
                {roleLabel}
              </span>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className='inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-rose-300'
              >
                <LogoutIcon className='h-4 w-4' /> Logout
              </button>
            </div>
          </div>
        </aside>

        {/* ---------- Main ---------- */}
        <main className='min-w-0 flex-1'>
          {/* Mobile top bar */}
          <div className='sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 px-4 py-3 backdrop-blur lg:hidden'>
            <div className='flex items-center justify-between'>
              <Logo subtitle={false} />
              <button
                onClick={handleLogout}
                className='btn-ghost !px-3 !py-2 text-slate-400'
                aria-label='Logout'
              >
                <LogoutIcon className='h-4 w-4' />
              </button>
            </div>
            {/* Mobile nav pills */}
            <div className='mt-3 flex gap-2 overflow-x-auto pb-1'>
              {nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    active === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <item.icon className='h-3.5 w-3.5' />
                  {item.label}
                  {item.badge > 0 && (
                    <span className='flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white'>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className='p-5 sm:p-8 lg:p-10'>{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
