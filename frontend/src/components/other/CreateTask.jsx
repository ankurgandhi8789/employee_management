import { useState } from 'react'
import api from '../../utils/api'

const CreateTask = ({ employees, onTaskCreated }) => {
  const [form, setForm] = useState({ title: '', description: '', date: '', category: '', employeeId: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await api.post('/manager/task', form)
      setSuccess('Task assigned successfully!')
      setForm({ title: '', description: '', date: '', category: '', employeeId: '' })
      onTaskCreated()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task')
    }
  }

  return (
    <div className='w-full rounded-md p-5 mt-5 shadow-2xl bg-[#1c1c1c]'>
      <h2 className='text-white text-xl font-semibold mb-4'>Assign New Task</h2>
      {error && <p className='text-red-400 mb-3'>{error}</p>}
      {success && <p className='text-emerald-400 mb-3'>{success}</p>}
      <form onSubmit={handleSubmit} className='flex items-start justify-between gap-5'>
        <div className='flex flex-col gap-4 w-[45%]'>
          <div>
            <h3 className='font-semibold text-sm text-gray-400'>Task Title</h3>
            <input type='text' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder='e.g. Design landing page' required
              className='border-2 border-gray-400 bg-transparent text-white rounded-sm placeholder:text-gray-400 w-full outline-none px-2 py-1'
            />
          </div>
          <div>
            <h3 className='font-semibold text-sm text-gray-400'>Date</h3>
            <input type='date' value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required
              className='w-full border-2 border-gray-400 bg-transparent text-white rounded-sm outline-none px-2 py-1'
            />
          </div>
          <div>
            <h3 className='font-semibold text-sm text-gray-400'>Assign To</h3>
            <select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} required
              className='w-full border-2 border-gray-400 bg-[#1c1c1c] text-white rounded-sm outline-none px-2 py-1'
            >
              <option value=''>Select employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div>
            <h3 className='font-semibold text-sm text-gray-400'>Category</h3>
            <input type='text' value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder='Design, Dev, etc.' required
              className='border-2 w-full border-gray-400 bg-transparent text-white rounded-sm placeholder:text-gray-400 outline-none px-2 py-1'
            />
          </div>
        </div>
        <div className='flex flex-col gap-5 w-[45%]'>
          <div>
            <h3 className='font-semibold text-sm text-gray-400'>Description</h3>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder='Task description...' required rows='10'
              className='border-2 border-emerald-700 bg-transparent text-white rounded-md outline-none w-full px-2 py-1 placeholder:text-gray-400'
            />
          </div>
          <button type='submit' className='text-white bg-emerald-600 text-xl py-2 rounded-sm hover:bg-emerald-700 transition'>
            Create Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
