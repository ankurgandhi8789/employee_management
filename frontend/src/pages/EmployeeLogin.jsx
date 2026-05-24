import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import api from '../utils/api'

const EmployeeLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/employee/login', { email, password })
      login(data.user, data.token)
      navigate('/employee/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className='min-h-screen bg-[#1c1c1c] flex items-center justify-center'>
      <div className='border-2 border-emerald-600 rounded-xl p-16 w-full max-w-md'>
        <h2 className='text-white text-3xl font-bold text-center mb-8'>Employee Login</h2>
        {error && <p className='text-red-400 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email' value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder='Email' required
            className='bg-transparent border-2 border-emerald-600 text-gray-300 placeholder:text-gray-400 outline-none py-3 px-5 rounded-full text-lg'
          />
          <input
            type='password' value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder='Password' required
            className='bg-transparent border-2 border-emerald-600 text-gray-300 placeholder:text-gray-400 outline-none py-3 px-5 rounded-full text-lg'
          />
          <button type='submit' className='bg-emerald-600 text-white py-3 rounded-full text-lg font-medium hover:bg-emerald-700 transition mt-2'>
            Log in
          </button>
        </form>
        <p className='text-gray-400 text-center mt-4'>
          <Link to='/' className='text-gray-500 hover:text-gray-300'>← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}

export default EmployeeLogin
