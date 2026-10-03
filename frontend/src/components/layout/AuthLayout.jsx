import { Link } from 'react-router-dom'
import Logo from '../common/Logo'
import { ArrowLeftIcon } from '../common/Icons'

/**
 * Split-screen layout for auth pages.
 * Left: full-height image panel with overlay + quote (desktop only).
 * Right: centered form content.
 */
const AuthLayout = ({ image, quote, author, children }) => (
  <div className='grid min-h-screen bg-slate-950 lg:grid-cols-2'>
    {/* Visual panel */}
    <div className='relative hidden overflow-hidden lg:block'>
      <img
        src={image}
        alt=''
        className='absolute inset-0 h-full w-full object-cover'
        draggable='false'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-indigo-950/25' />
      <div className='absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-600/25 blur-3xl' />

      <div className='relative flex h-full flex-col justify-between p-12'>
        <Logo size='lg' />
        <div className='max-w-md'>
          <svg viewBox='0 0 24 24' fill='currentColor' className='h-10 w-10 text-indigo-400/80'>
            <path d='M7.5 21a3.75 3.75 0 01-3.75-3.75V15h4.5L10.5 6H6a3.75 3.75 0 00-3.75 3.75M7.5 21h4.5V15m-4.5 0h4.5m0-9l-2.25 9m2.25-9H18a3.75 3.75 0 013.75 3.75V17.25A3.75 3.75 0 0118 21h-3.75' stroke='none' opacity='0' />
            <path d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.644 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z' />
          </svg>
          <p className='mt-5 text-2xl font-semibold leading-snug text-white'>
            {quote}
          </p>
          {author && (
            <p className='mt-4 text-sm font-medium text-indigo-300'>{author}</p>
          )}
        </div>
      </div>
    </div>

    {/* Form panel */}
    <div className='relative flex items-center justify-center p-6 sm:p-10'>
      <div className='pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl' />
      <div className='w-full max-w-md'>
        <div className='mb-10 flex items-center justify-between lg:hidden'>
          <Logo />
        </div>
        {children}
        <Link
          to='/'
          className='mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-300'
        >
          <ArrowLeftIcon className='h-4 w-4' /> Back to home
        </Link>
      </div>
    </div>
  </div>
)

export default AuthLayout
