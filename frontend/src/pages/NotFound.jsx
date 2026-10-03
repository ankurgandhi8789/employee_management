import { Link } from 'react-router-dom'
import Logo from '../components/common/Logo'
import { ArrowLeftIcon } from '../components/common/Icons'

const NotFound = () => (
  <div className='flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-center'>
    <Logo />
    <h1 className='text-gradient mt-10 text-7xl font-extrabold tracking-tight sm:text-8xl'>404</h1>
    <h2 className='mt-4 text-xl font-bold text-white sm:text-2xl'>Page not found</h2>
    <p className='mt-2 max-w-sm text-sm text-slate-500'>
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link to='/' className='btn-primary mt-8'>
      <ArrowLeftIcon className='h-4 w-4' /> Back to home
    </Link>
  </div>
)

export default NotFound
