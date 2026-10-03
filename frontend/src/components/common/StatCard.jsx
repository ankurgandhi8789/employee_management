const tones = {
  indigo: { chip: 'bg-indigo-500/15 text-indigo-300', value: 'text-white' },
  sky: { chip: 'bg-sky-500/15 text-sky-300', value: 'text-white' },
  amber: { chip: 'bg-amber-500/15 text-amber-300', value: 'text-white' },
  emerald: { chip: 'bg-emerald-500/15 text-emerald-300', value: 'text-white' },
  rose: { chip: 'bg-rose-500/15 text-rose-300', value: 'text-white' },
}

const StatCard = ({ icon: IconCmp, label, value, tone = 'indigo', sub }) => {
  const t = tones[tone] || tones.indigo
  return (
    <div className='card card-hover p-5'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
            {label}
          </p>
          <p className={`mt-2 text-3xl font-extrabold tracking-tight ${t.value}`}>
            {value}
          </p>
          {sub && <p className='mt-1 text-xs text-slate-500'>{sub}</p>}
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.chip}`}>
          <IconCmp className='h-5 w-5' />
        </span>
      </div>
    </div>
  )
}

export default StatCard
