const styles = {
  new: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  active: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  completed: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  failed: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
}

const dots = {
  new: 'bg-sky-400',
  active: 'bg-amber-400',
  completed: 'bg-emerald-400',
  failed: 'bg-rose-400',
}

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
      styles[status] || 'border-white/20 bg-white/10 text-slate-300'
    }`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${dots[status] || 'bg-slate-400'}`} />
    {status || 'unknown'}
  </span>
)

export default StatusBadge
