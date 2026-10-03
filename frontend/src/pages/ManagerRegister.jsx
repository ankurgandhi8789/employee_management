import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import api from '../utils/api'
import AuthLayout from '../components/layout/AuthLayout'
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeSlashIcon, ArrowRightIcon } from '../components/common/Icons'
import authSide from '../assets/auth-side.jpg'

const ManagerRegister = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/manager/register', form)
      login(data.user, data.token)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      image={authSide}
      quote='Talent wins games, but teamwork and intelligence win championships.'
      author='— Michael Jordan'
    >
      <div className='card p-8 sm:p-10'>
        <h1 className='text-2xl font-extrabold tracking-tight text-white sm:text-3xl'>
          Create your <span className='text-gradient'>manager account</span>
        </h1>
        <p className='mt-2 text-sm text-slate-500'>
          Free forever — set up your workspace in seconds.
        </p>

        {error && (
          <div className='mt-6 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-4'>
          <div>
            <label className='field-label'>Full name</label>
            <div className='relative'>
              <UserIcon className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
              <input
                type='text' value={form.name} onChange={set('name')}
                placeholder='Jane Smith' required
                className='field !pl-11'
              />
            </div>
          </div>
          <div>
            <label className='field-label'>Email address</label>
            <div className='relative'>
              <MailIcon className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
              <input
                type='email' value={form.email} onChange={set('email')}
                placeholder='manager@company.com' required
                className='field !pl-11'
              />
            </div>
          </div>
          <div>
            <label className='field-label'>Password</label>
            <div className='relative'>
              <LockIcon className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password} onChange={set('password')}
                placeholder='At least 6 characters' required minLength={6}
                className='field !pl-11 !pr-11'
              />
              <button
                type='button'
                onClick={() => setShowPassword((v) => !v)}
                className='absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeSlashIcon className='h-4 w-4' /> : <EyeIcon className='h-4 w-4' />}
              </button>
            </div>
          </div>

          <button type='submit' disabled={loading} className='btn-primary mt-2 w-full !py-3'>
            {loading ? 'Creating account…' : <>Create Account <ArrowRightIcon className='h-4 w-4' /></>}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-slate-500'>
          Already have an account?{' '}
          <Link to='/manager/login' className='font-semibold text-indigo-300 transition hover:text-indigo-200'>
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default ManagerRegister
