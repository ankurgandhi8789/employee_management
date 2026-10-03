import api from '../../utils/api'
import StatusBadge from '../common/StatusBadge'
import { CalendarIcon, TagIcon, CheckIcon, XIcon, ClockIcon, ArrowRightIcon } from '../common/Icons'

const accentBorder = {
  new: 'before:bg-sky-400',
  active: 'before:bg-amber-400',
  completed: 'before:bg-emerald-400',
  failed: 'before:bg-rose-400',
}

/**
 * Employee task card with status actions (accept / complete / fail / revert).
 */
const TaskCard = ({ task, onTaskUpdated }) => {
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/employee/task/${id}`, { status })
      onTaskUpdated?.()
    } catch (err) {
      console.error(err)
    }
  }

  const requestRevert = async (id) => {
    try {
      await api.patch(`/employee/task/${id}/revert-request`)
      onTaskUpdated?.()
    } catch (err) {
      console.error(err)
    }
  }

  const isDone = task.status === 'completed' || task.status === 'failed'

  return (
    <article
      className={`card card-hover relative flex flex-col overflow-hidden p-5 before:absolute before:inset-y-0 before:left-0 before:w-1 ${
        accentBorder[task.status] || 'before:bg-slate-500'
      }`}
    >
      <div className='flex items-center justify-between gap-2'>
        <StatusBadge status={task.status} />
        <span className='inline-flex items-center gap-1.5 text-xs text-slate-500'>
          <CalendarIcon className='h-3.5 w-3.5' />
          {task.date}
        </span>
      </div>

      <h3 className='mt-3.5 text-lg font-bold leading-snug text-white'>
        {task.title}
      </h3>
      <p className='mt-1.5 line-clamp-3 text-sm leading-relaxed text-slate-400'>
        {task.description}
      </p>

      <span className='mt-3 inline-flex w-fit items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300'>
        <TagIcon className='h-3.5 w-3.5 text-indigo-300' />
        {task.category}
      </span>

      {/* Actions */}
      <div className='mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-4'>
        {task.status === 'new' && (
          <button
            onClick={() => updateStatus(task._id, 'active')}
            className='btn-primary !px-4 !py-2 text-xs'
          >
            <ArrowRightIcon className='h-3.5 w-3.5' /> Accept Task
          </button>
        )}
        {task.status === 'active' && (
          <>
            <button
              onClick={() => updateStatus(task._id, 'completed')}
              className='inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20 active:scale-[0.98]'
            >
              <CheckIcon className='h-3.5 w-3.5' /> Mark Complete
            </button>
            <button
              onClick={() => updateStatus(task._id, 'failed')}
              className='inline-flex items-center gap-1.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20 active:scale-[0.98]'
            >
              <XIcon className='h-3.5 w-3.5' /> Mark Failed
            </button>
          </>
        )}
        {isDone && !task.revertRequest && (
          <button
            onClick={() => requestRevert(task._id)}
            className='btn-ghost !px-4 !py-2 text-xs'
          >
            <ClockIcon className='h-3.5 w-3.5' /> Request Revert
          </button>
        )}
        {isDone && task.revertRequest && (
          <span className='inline-flex items-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-300'>
            <ClockIcon className='h-3.5 w-3.5 animate-pulse' /> Awaiting manager approval
          </span>
        )}
      </div>
    </article>
  )
}

export default TaskCard
