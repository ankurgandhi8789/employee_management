import { useState } from 'react'
import api from '../../utils/api'
import { CheckCircleIcon } from '../common/Icons'

/**
 * Inline form for managers to add a new employee to their team.
 */
const CreateEmployee = ({ onEmployeeCreated }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await api.post('/manager/employee', form)
      setSuccess('Employee added — they can now log in with these credentials.')
      setForm({ name: '', email: '', password: '' })
      onEmployeeCreated?.()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='card p-6 sm:p-7'>
      <div className='flex items-center gap-3'>
        <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300'>
          <svg fill='none' viewBox='0 0 24 24' strokeWidth={1.8} stroke='currentColor' className='h-5 w-5' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z' />
          </svg>
        </span>
        <div>
          <h2 className='text-lg font-bold text-white'>Add Employee</h2>
          <p className='text-xs text-slate-500'>New members can log in with the credentials you set.</p>
        </div>
      </div>

      {error && (
        <div className='mt-4 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300'>
          {error}
        </div>
      )}
      {success && (
        <div className='mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300'>
          <CheckCircleIcon className='h-4 w-4' /> {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <div>
          <label className='field-label'>Full Name</label>
          <input type='text' value={form.name} onChange={set('name')}
            placeholder='Employee name' required className='field' />
        </div>
        <div>
          <label className='field-label'>Email</label>
          <input type='email' value={form.email} onChange={set('email')}
            placeholder='employee@company.com' required className='field' />
        </div>
        <div>
          <label className='field-label'>Password</label>
          <input type='password' value={form.password} onChange={set('password')}
            placeholder='Set a password' required minLength={3} className='field' />
        </div>
        <div className='flex items-end'>
          <button type='submit' disabled={loading} className='btn-primary w-full'>
            {loading ? 'Adding…' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateEmployee
