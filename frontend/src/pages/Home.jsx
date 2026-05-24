import { useNavigate } from 'react-router-dom'

const features = [
  { icon: '📋', title: 'Task Management', desc: 'Assign, track and manage tasks across your entire team in real-time.' },
  { icon: '👥', title: 'Team Overview', desc: 'Monitor employee performance and workload from a single dashboard.' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Stay updated with task statuses — new, active, completed or failed.' },
  { icon: '🔐', title: 'Role Based Access', desc: 'Separate portals for managers and employees with secure JWT auth.' },
]

const stats = [
  { value: '500+', label: 'Companies Using' },
  { value: '10k+', label: 'Tasks Managed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Availability' },
]

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#1c1c1c] text-white'>

      {/* Navbar */}
      <nav className='flex items-center justify-between px-10 py-4 mx-6 mt-4 border-2 border-gray-700 rounded-2xl'>
        <div className='flex items-center gap-2'>
          <span className='text-emerald-500 text-2xl font-bold'>⚡</span>
          <span className='text-xl font-bold tracking-wide'>EMS</span>
        </div>
        <div className='flex gap-3'>
          <button onClick={() => navigate('/manager/login')}
            className='border border-emerald-600 text-emerald-400 px-5 py-2 rounded-full text-sm hover:bg-emerald-600/10 transition'>
            Manager Login
          </button>
          <button onClick={() => navigate('/employee/login')}
            className='bg-emerald-600 text-white px-5 py-2 rounded-full text-sm hover:bg-emerald-700 transition'>
            Employee Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className='flex flex-col items-center text-center px-6 pt-20 pb-16'>
        <span className='bg-emerald-600/15 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase'>
          Employee Management System
        </span>
        <h1 className='text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl'>
          Manage Your Team <br />
          <span className='text-emerald-500'>Smarter & Faster</span>
        </h1>
        <p className='text-gray-400 mt-6 text-lg max-w-xl'>
          Streamline task assignments, track employee progress, and keep your entire workforce aligned — all from one powerful dashboard.
        </p>
        <div className='flex gap-4 mt-10'>
          <button onClick={() => navigate('/manager/register')}
            className='bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition text-base'>
            Get Started Free
          </button>
          <button onClick={() => navigate('/manager/login')}
            className='border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-full font-semibold hover:border-gray-400 transition text-base'>
            Sign In
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className='grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-800 border-y border-gray-800 mx-10 rounded-xl overflow-hidden mb-20'>
        {stats.map((s) => (
          <div key={s.label} className='bg-[#1c1c1c] flex flex-col items-center py-8'>
            <span className='text-3xl font-bold text-emerald-400'>{s.value}</span>
            <span className='text-gray-500 text-sm mt-1'>{s.label}</span>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className='px-10 pb-20'>
        <h2 className='text-center text-3xl font-bold mb-2'>Everything You Need</h2>
        <p className='text-center text-gray-500 mb-12'>Built for modern teams to stay productive and organized.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((f) => (
            <div key={f.title} className='border border-gray-700 rounded-xl p-6 hover:border-emerald-600 hover:bg-emerald-600/5 transition'>
              <span className='text-3xl'>{f.icon}</span>
              <h3 className='text-white font-semibold mt-4 mb-2'>{f.title}</h3>
              <p className='text-gray-500 text-sm leading-relaxed'>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Login Cards */}
      <section className='px-10 pb-24'>
        <h2 className='text-center text-3xl font-bold mb-2'>Choose Your Portal</h2>
        <p className='text-center text-gray-500 mb-12'>Access your dedicated dashboard based on your role.</p>
        <div className='flex flex-col md:flex-row gap-6 justify-center items-center'>

          <div className='border-2 border-emerald-600 rounded-2xl p-10 w-full max-w-sm flex flex-col items-center gap-5 hover:bg-emerald-600/10 transition'>
            <span className='text-6xl'>👔</span>
            <div className='text-center'>
              <h3 className='text-xl font-bold'>Manager Portal</h3>
              <p className='text-gray-500 text-sm mt-1'>Create teams, assign tasks and monitor progress.</p>
            </div>
            <button onClick={() => navigate('/manager/login')}
              className='w-full bg-emerald-600 text-white py-2.5 rounded-full font-medium hover:bg-emerald-700 transition'>
              Login as Manager
            </button>
            <button onClick={() => navigate('/manager/register')}
              className='w-full border-2 border-emerald-600 text-emerald-400 py-2.5 rounded-full font-medium hover:bg-emerald-600/10 transition'>
              Register
            </button>
          </div>

          <div className='border-2 border-gray-600 rounded-2xl p-10 w-full max-w-sm flex flex-col items-center gap-5 hover:bg-gray-600/10 transition'>
            <span className='text-6xl'>👷</span>
            <div className='text-center'>
              <h3 className='text-xl font-bold'>Employee Portal</h3>
              <p className='text-gray-500 text-sm mt-1'>View assigned tasks and update your work status.</p>
            </div>
            <button onClick={() => navigate('/employee/login')}
              className='w-full bg-gray-600 text-white py-2.5 rounded-full font-medium hover:bg-gray-700 transition'>
              Login as Employee
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-gray-800 text-center py-6 text-gray-600 text-sm'>
        © {new Date().getFullYear()} EMS — Employee Management System. Crafted by <span className='text-emerald-500 font-medium'>Ankur Gandhi</span>. All rights reserved.
      </footer>

    </div>
  )
}

export default Home
