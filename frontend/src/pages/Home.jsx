import { useNavigate } from 'react-router-dom'
import Logo from '../components/common/Logo'
import {
  TasksIcon, UsersIcon, ChartIcon, ShieldIcon, BoltIcon,
  ArrowRightIcon, CheckIcon, ClockIcon,
} from '../components/common/Icons'
import heroTeam from '../assets/hero-team.jpg'
import portalManager from '../assets/portal-manager.jpg'
import portalEmployee from '../assets/portal-employee.jpg'

const features = [
  { icon: TasksIcon, title: 'Task Management', desc: 'Assign, track and manage tasks across your entire team in real-time.' },
  { icon: UsersIcon, title: 'Team Overview', desc: 'Monitor employee performance and workload from a single dashboard.' },
  { icon: ChartIcon, title: 'Progress Tracking', desc: 'Follow every task from new → active → completed with live stats.' },
  { icon: ShieldIcon, title: 'Role-Based Access', desc: 'Separate portals for managers and employees, secured with JWT auth.' },
  { icon: BoltIcon, title: 'Revert Workflow', desc: 'Employees can request a task revert — managers approve in one click.' },
  { icon: ClockIcon, title: 'Real-Time Status', desc: 'Always know who is working on what, and what is falling behind.' },
]

const stats = [
  { value: '500+', label: 'Companies Using' },
  { value: '10k+', label: 'Tasks Managed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Availability' },
]

const steps = [
  { n: '01', title: 'Create your workspace', desc: 'Register as a manager and set up your account in seconds — no credit card needed.' },
  { n: '02', title: 'Build your team', desc: 'Add employees with their login credentials and organize them under your management.' },
  { n: '03', title: 'Assign & track', desc: 'Assign tasks with due dates and categories, then watch progress update live.' },
]

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen overflow-x-clip bg-slate-950 text-white'>
      {/* Ambient glows */}
      <div className='pointer-events-none fixed -top-32 left-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-3xl' />
      <div className='pointer-events-none fixed top-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-3xl' />

      {/* ---------- Navbar ---------- */}
      <header className='sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
          <Logo />
          <div className='hidden items-center gap-8 text-sm font-medium text-slate-400 md:flex'>
            <a href='#features' className='transition hover:text-white'>Features</a>
            <a href='#how' className='transition hover:text-white'>How it works</a>
            <a href='#portals' className='transition hover:text-white'>Portals</a>
          </div>
          <div className='flex gap-2.5'>
            <button onClick={() => navigate('/manager/login')} className='btn-ghost !px-4 !py-2'>
              Manager Login
            </button>
            <button onClick={() => navigate('/employee/login')} className='btn-primary !px-4 !py-2'>
              Employee Login
            </button>
          </div>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className='relative mx-auto max-w-7xl px-6 pb-24 pt-16 lg:pt-24'>
        <div className='grid items-center gap-14 lg:grid-cols-2'>
          {/* Copy */}
          <div>
            <span className='section-pill'>
              <BoltIcon className='h-3.5 w-3.5' />
              Employee Management System
            </span>
            <h1 className='mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl'>
              Manage your team
              <br />
              <span className='text-gradient'>smarter & faster.</span>
            </h1>
            <p className='mt-6 max-w-lg text-lg leading-relaxed text-slate-400'>
              Streamline task assignments, track employee progress, and keep your entire
              workforce aligned — all from one powerful, beautifully simple dashboard.
            </p>
            <div className='mt-9 flex flex-wrap gap-3.5'>
              <button onClick={() => navigate('/manager/register')} className='btn-primary !px-7 !py-3 text-base'>
                Get Started Free <ArrowRightIcon className='h-4 w-4' />
              </button>
              <button onClick={() => navigate('/manager/login')} className='btn-ghost !px-7 !py-3 text-base'>
                Sign In
              </button>
            </div>
            <div className='mt-9 flex items-center gap-6 text-sm text-slate-500'>
              <span className='inline-flex items-center gap-2'>
                <CheckIcon className='h-4 w-4 text-emerald-400' /> Free forever
              </span>
              <span className='inline-flex items-center gap-2'>
                <CheckIcon className='h-4 w-4 text-emerald-400' /> No setup fees
              </span>
              <span className='inline-flex items-center gap-2'>
                <CheckIcon className='h-4 w-4 text-emerald-400' /> Secure by design
              </span>
            </div>
          </div>

          {/* Visual */}
          <div className='relative'>
            <div className='absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-transparent blur-2xl' />
            <div className='relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-indigo-950/50'>
              <img src={heroTeam} alt='Team collaborating around a table' className='h-full w-full object-cover' draggable='false' />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent' />
            </div>

            {/* Floating card: task done */}
            <div className='card absolute -left-4 top-8 hidden items-center gap-3 !bg-slate-900/90 p-4 backdrop-blur sm:flex lg:-left-10'>
              <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300'>
                <CheckIcon className='h-5 w-5' />
              </span>
              <div>
                <p className='text-sm font-bold text-white'>Task completed</p>
                <p className='text-xs text-slate-500'>Design review · just now</p>
              </div>
            </div>

            {/* Floating card: active tasks */}
            <div className='card absolute -bottom-6 right-4 hidden items-center gap-3 !bg-slate-900/90 p-4 backdrop-blur sm:flex lg:-right-6'>
              <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300'>
                <ClockIcon className='h-5 w-5' />
              </span>
              <div>
                <p className='text-sm font-bold text-white'>12 active tasks</p>
                <p className='text-xs text-slate-500'>across 5 team members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className='relative mx-auto max-w-7xl px-6 pb-24'>
        <div className='card grid grid-cols-2 gap-px overflow-hidden bg-white/5 md:grid-cols-4'>
          {stats.map((s) => (
            <div key={s.label} className='flex flex-col items-center bg-slate-950/80 py-9'>
              <span className='text-gradient text-3xl font-extrabold sm:text-4xl'>{s.value}</span>
              <span className='mt-1.5 text-sm text-slate-500'>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section id='features' className='relative mx-auto max-w-7xl scroll-mt-24 px-6 pb-24'>
        <div className='mx-auto mb-14 max-w-2xl text-center'>
          <span className='section-pill'>Features</span>
          <h2 className='mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl'>
            Everything you need, <span className='text-gradient'>nothing you don't</span>
          </h2>
          <p className='mt-4 text-slate-400'>
            Built for modern teams that want to stay productive and organized.
          </p>
        </div>
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((f) => (
            <div key={f.title} className='card card-hover group p-7'>
              <span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300 transition group-hover:scale-110 group-hover:bg-indigo-500/25'>
                <f.icon className='h-6 w-6' />
              </span>
              <h3 className='mt-5 text-lg font-bold text-white'>{f.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-slate-400'>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id='how' className='relative mx-auto max-w-7xl scroll-mt-24 px-6 pb-24'>
        <div className='mx-auto mb-14 max-w-2xl text-center'>
          <span className='section-pill'>How it works</span>
          <h2 className='mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl'>
            Up and running in <span className='text-gradient'>three steps</span>
          </h2>
        </div>
        <div className='grid gap-5 md:grid-cols-3'>
          {steps.map((s, i) => (
            <div key={s.n} className='card card-hover relative p-7'>
              <span className='text-gradient text-5xl font-extrabold opacity-60'>{s.n}</span>
              <h3 className='mt-4 text-lg font-bold text-white'>{s.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-slate-400'>{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRightIcon className='absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-indigo-400/50 md:block' />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Portals ---------- */}
      <section id='portals' className='relative mx-auto max-w-7xl scroll-mt-24 px-6 pb-24'>
        <div className='mx-auto mb-14 max-w-2xl text-center'>
          <span className='section-pill'>Portals</span>
          <h2 className='mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl'>
            Choose <span className='text-gradient'>your portal</span>
          </h2>
          <p className='mt-4 text-slate-400'>Access your dedicated dashboard based on your role.</p>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {/* Manager */}
          <div className='card card-hover group overflow-hidden'>
            <div className='relative h-52 overflow-hidden'>
              <img src={portalManager} alt='Manager working' className='h-full w-full object-cover transition duration-500 group-hover:scale-105' draggable='false' />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent' />
            </div>
            <div className='p-7'>
              <h3 className='text-xl font-bold text-white'>Manager Portal</h3>
              <p className='mt-2 text-sm leading-relaxed text-slate-400'>
                Create your team, assign tasks with due dates and categories, monitor
                progress live and approve revert requests.
              </p>
              <div className='mt-6 flex gap-3'>
                <button onClick={() => navigate('/manager/login')} className='btn-primary flex-1'>
                  Login as Manager
                </button>
                <button onClick={() => navigate('/manager/register')} className='btn-ghost flex-1'>
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* Employee */}
          <div className='card card-hover group overflow-hidden'>
            <div className='relative h-52 overflow-hidden'>
              <img src={portalEmployee} alt='Employee working' className='h-full w-full object-cover transition duration-500 group-hover:scale-105' draggable='false' />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent' />
            </div>
            <div className='p-7'>
              <h3 className='text-xl font-bold text-white'>Employee Portal</h3>
              <p className='mt-2 text-sm leading-relaxed text-slate-400'>
                View all your assigned tasks, accept them, mark them complete or failed,
                and request reverts when something changes.
              </p>
              <div className='mt-6 flex gap-3'>
                <button onClick={() => navigate('/employee/login')} className='btn-primary flex-1'>
                  Login as Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className='relative mx-auto max-w-7xl px-6 pb-24'>
        <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-10 text-center shadow-2xl shadow-indigo-950/50 sm:p-16'>
          <div className='pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl' />
          <div className='pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl' />
          <h2 className='relative text-3xl font-extrabold tracking-tight sm:text-4xl'>
            Ready to organize your team?
          </h2>
          <p className='relative mx-auto mt-4 max-w-xl text-indigo-100'>
            Join hundreds of companies managing their workforce the smart way. Free to start, easy to love.
          </p>
          <button
            onClick={() => navigate('/manager/register')}
            className='relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-700 shadow-xl transition hover:scale-[1.02] hover:bg-indigo-50'
          >
            Create your free account <ArrowRightIcon className='h-4 w-4' />
          </button>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className='relative border-t border-white/5'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row'>
          <Logo />
          <div className='flex items-center gap-6 text-sm text-slate-500'>
            <a href='#features' className='transition hover:text-white'>Features</a>
            <a href='#how' className='transition hover:text-white'>How it works</a>
            <a href='#portals' className='transition hover:text-white'>Portals</a>
          </div>
          <p className='text-sm text-slate-600'>
            © {new Date().getFullYear()} EMS · Crafted by <span className='font-semibold text-slate-400'>Ankur Gandhi</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
