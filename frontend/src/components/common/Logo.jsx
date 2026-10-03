import { Link } from 'react-router-dom'
import { BoltIcon } from './Icons'

const sizes = {
  sm: { box: 'h-8 w-8', icon: 'h-4.5 w-4.5', text: 'text-base' },
  md: { box: 'h-9 w-9', icon: 'h-5 w-5', text: 'text-lg' },
  lg: { box: 'h-11 w-11', icon: 'h-6 w-6', text: 'text-xl' },
}

const Logo = ({ size = 'md', subtitle = true }) => {
  const s = sizes[size] || sizes.md
  return (
    <Link to='/' className='group inline-flex items-center gap-2.5'>
      <span
        className={`${s.box} flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-600/30 transition group-hover:scale-105 group-hover:shadow-indigo-500/40`}
      >
        <BoltIcon className={s.icon} />
      </span>
      <span className='leading-tight'>
        <span className={`block font-extrabold tracking-tight text-white ${s.text}`}>
          EMS
        </span>
        {subtitle && (
          <span className='block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
            Employee MS
          </span>
        )}
      </span>
    </Link>
  )
}

export default Logo
