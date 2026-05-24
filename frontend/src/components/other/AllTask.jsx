const statusColor = {
  new: 'bg-red-400',
  active: 'bg-blue-400',
  completed: 'bg-green-400',
  failed: 'bg-yellow-400',
}

const AllTask = ({ tasks }) => {
  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5 h-60 overflow-auto'>
      {tasks.length === 0 && <p className='text-gray-400 text-center mt-10'>No tasks assigned yet.</p>}
      {tasks.map((task) => (
        <div key={task._id} className={`${statusColor[task.status]} mb-2 py-2 px-4 flex justify-between rounded items-center`}>
          <h2 className='font-semibold w-1/4'>{task.employeeId?.name}</h2>
          <h3 className='w-1/3 text-center'>{task.title}</h3>
          <h4 className='text-sm w-1/4 text-center'>{task.category}</h4>
          <span className='capitalize text-sm font-medium bg-black/20 px-3 py-1 rounded-full'>{task.status}</span>
        </div>
      ))}
    </div>
  )
}

export default AllTask
