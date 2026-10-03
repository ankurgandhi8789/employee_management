import { useState } from 'react'
import api from '../../utils/api'
import { PlusIcon, CheckCircleIcon } from '../common/Icons'

/**
 * Form for managers to assign a new task to one of their employees.
 */
const CreateTask = ({ employees, onTaskCreated }) => {
  const [form, setForm] = useState({ title: '', description: '', date: '', category: '', employeeId: '' })
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
      await api.post('/manager/task', form)
      setSuccess('Task assigned successfully!')
      setForm({ title: '', description: '', date: '', category: '', employeeId: '' })
      onTaskCreated?.()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='card p-6 sm:p-7'>
      <div className='flex items-center gap-3'>
        <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300'>
          <PlusIcon />
        </span>
        <div>
          <h2 className='text-lg font-bold text-white'>Assign New Task</h2>
          <p className='text-xs text-slate-500'>Create a task and assign it to a team member.</p>
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

      <form onSubmit={handleSubmit} className='mt-6 grid gap-5 lg:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <div>
            <label className='field-label'>Task Title</label>
            <input type='text' value={form.title} onChange={set('title')}
              placeholder='e.g. Design the landing page' required className='field' />
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='field-label'>Due Date</label>
              <input type='date' value={form.date} onChange={set('date')} required className='field' />
            </div>
            <div>
              <label className='field-label'>Category</label>
              <input type='text' value={form.category} onChange={set('category')}
                placeholder='Design, Dev…' required className='field' />
            </div>
          </div>
          <div>
            <label className='field-label'>Assign To</label>
            <select value={form.employeeId} onChange={set('employeeId')} required className='field'>
              <option value='' className='bg-slate-900'>Select an employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id} className='bg-slate-900'>{emp.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex flex-col'>
          <label className='field-label'>Description</label>
          <textarea value={form.description} onChange={set('description')}
            placeholder='Describe the task, expectations and any useful links…' required rows={8}
            className='field flex-1 resize-none' />
          <button type='submit' disabled={loading} className='btn-primary mt-4 w-full sm:w-auto sm:self-end'>
            {loading ? 'Assigning…' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
