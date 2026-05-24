import { useState } from 'react'
import api from '../../utils/api'

const CreateEmployee = ({ onEmployeeCreated }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await api.post('/manager/employee', form)
      setSuccess('Employee created successfully!')
      setForm({ name: '', email: '', password: '' })
      onEmployeeCreated()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create employee')
    }
  }

  return (
    <div className='w-full rounded-md p-5 mt-5 shadow-2xl bg-[#1c1c1c]'>
      <h2 className='text-white text-xl font-semibold mb-4'>Add Employee to Team</h2>
      {error && <p className='text-red-400 mb-3'>{error}</p>}
      {success && <p className='text-emerald-400 mb-3'>{success}</p>}
      <form onSubmit={handleSubmit} className='flex gap-4 items-end flex-wrap'>
        <div className='flex flex-col gap-1'>
          <h3 className='font-semibold text-sm text-gray-400'>Name</h3>
          <input type='text' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder='Employee name' required
            className='border-2 border-gray-400 bg-transparent text-white rounded-sm placeholder:text-gray-400 outline-none px-3 py-1'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='font-semibold text-sm text-gray-400'>Email</h3>
          <input type='email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder='employee@email.com' required
            className='border-2 border-gray-400 bg-transparent text-white rounded-sm placeholder:text-gray-400 outline-none px-3 py-1'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='font-semibold text-sm text-gray-400'>Password</h3>
          <input type='password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder='Set password' required
            className='border-2 border-gray-400 bg-transparent text-white rounded-sm placeholder:text-gray-400 outline-none px-3 py-1'
          />
        </div>
        <button type='submit' className='bg-emerald-600 text-white px-6 py-2 rounded-sm hover:bg-emerald-700 transition text-lg'>
          Add Employee
        </button>
      </form>
    </div>
  )
}

export default CreateEmployee
