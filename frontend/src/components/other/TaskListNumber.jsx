const TaskListNumber = ({ tasks }) => {
  const counts = {
    new: tasks.filter((t) => t.status === 'new').length,
    active: tasks.filter((t) => t.status === 'active').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    failed: tasks.filter((t) => t.status === 'failed').length,
  }

  return (
    <div className='flex mt-10 justify-between gap-5'>
      <div className='rounded-xl px-9 py-6 w-[45%] bg-red-400 text-white'>
        <h2 className='text-3xl font-semibold'>{counts.new}</h2>
        <h2 className='text-xl font-medium'>New Task</h2>
      </div>
      <div className='rounded-xl px-9 py-6 w-[45%] bg-blue-400 text-white'>
        <h2 className='text-3xl font-semibold'>{counts.active}</h2>
        <h2 className='text-xl font-medium'>Active Task</h2>
      </div>
      <div className='rounded-xl px-9 py-6 w-[45%] bg-green-400 text-white'>
        <h2 className='text-3xl font-semibold'>{counts.completed}</h2>
        <h2 className='text-xl font-medium'>Completed</h2>
      </div>
      <div className='rounded-xl px-9 py-6 w-[45%] bg-yellow-400 text-white'>
        <h2 className='text-3xl font-semibold'>{counts.failed}</h2>
        <h2 className='text-xl font-medium'>Failed</h2>
      </div>
    </div>
  )
}

export default TaskListNumber
