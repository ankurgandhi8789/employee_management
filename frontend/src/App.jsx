import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthProvider'
import Home from './pages/Home'
import ManagerLogin from './pages/ManagerLogin'
import ManagerRegister from './pages/ManagerRegister'
import EmployeeLogin from './pages/EmployeeLogin'
import ManagerDashboard from './components/Dashboard/ManagerDashboard'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to='/' />
  if (role && user.role !== role) return <Navigate to='/' />
  return children
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/manager/login' element={<ManagerLogin />} />
      <Route path='/manager/register' element={<ManagerRegister />} />
      <Route path='/employee/login' element={<EmployeeLogin />} />
      <Route path='/manager/dashboard' element={
        <ProtectedRoute role='manager'><ManagerDashboard /></ProtectedRoute>
      } />
      <Route path='/employee/dashboard' element={
        <ProtectedRoute role='employee'><EmployeeDashboard /></ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
