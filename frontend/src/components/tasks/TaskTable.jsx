import StatusBadge from '../common/StatusBadge'
import Avatar from '../common/Avatar'
import { InboxIcon } from '../common/Icons'

/**
 * Manager view of all tasks — clean table layout with employee, task,
 * category, date and status columns.
 */
const TaskTable = ({ tasks }) => {
  return (
    <div className='card overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[720px] text-left text-sm'>
          <thead>
            <tr className='border-b border-white/5 bg-white/[0.03] text-xs uppercase tracking-wider text-slate-500'>
              <th className='px-5 py-3.5 font-semibold'>Employee</th>
              <th className='px-5 py-3.5 font-semibold'>Task</th>
              <th className='px-5 py-3.5 font-semibold'>Category</th>
              <th className='px-5 py-3.5 font-semibold'>Date</th>
              <th className='px-5 py-3.5 font-semibold'>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 && (
              <tr>
                <td colSpan='5'>
                  <div className='flex flex-col items-center gap-2 py-12 text-slate-500'>
                    <InboxIcon className='h-8 w-8' />
                    <p className='text-sm'>No tasks assigned yet.</p>
                  </div>
                </td>
              </tr>
            )}
            {tasks.map((task) => (
              <tr
                key={task._id}
                className='border-b border-white/5 transition last:border-0 hover:bg-white/[0.03]'
              >
                <td className='px-5 py-3.5'>
                  <div className='flex items-center gap-3'>
                    <Avatar name={task.employeeId?.name || 'Unknown'} size='sm' />
                    <span className='font-semibold text-white'>
                      {task.employeeId?.name || 'Unknown'}
                    </span>
                  </div>
                </td>
                <td className='max-w-xs px-5 py-3.5'>
                  <p className='truncate font-medium text-slate-200'>{task.title}</p>
                  <p className='truncate text-xs text-slate-500'>{task.description}</p>
                </td>
                <td className='px-5 py-3.5'>
                  <span className='rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300'>
                    {task.category}
                  </span>
                </td>
                <td className='px-5 py-3.5 text-slate-400'>{task.date}</td>
                <td className='px-5 py-3.5'>
                  <StatusBadge status={task.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TaskTable
