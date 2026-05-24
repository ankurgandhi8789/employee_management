import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='flex items-end text-white'>
      <h1 className='text-2xl font-medium'>
        Hello <br />
        <span className='text-3xl'>{user?.name} 👋</span>
      </h1>
    </div>
  )
}

export default Header
