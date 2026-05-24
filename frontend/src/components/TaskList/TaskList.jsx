import api from '../../utils/api'

const statusColor = {
  new: 'bg-red-400',
  active: 'bg-blue-400',
  completed: 'bg-green-400',
  failed: 'bg-yellow-400',
}

const TaskList = ({ tasks, onTaskUpdated }) => {
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/employee/task/${id}`, { status })
      onTaskUpdated()
    } catch (err) {
      console.error(err)
    }
  }

  const requestRevert = async (id) => {
    try {
      await api.patch(`/employee/task/${id}/revert-request`)
      onTaskUpdated()
      alert('Revert request sent to manager!')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='text-white h-[55%] overflow-x-auto flex items-center justify-start gap-5 py-5 w-full flex-nowrap mt-10'>
      {tasks.length === 0 && (
        <p className='text-gray-400 text-xl'>No tasks assigned to you yet.</p>
      )}
      {tasks.map((task) => (
        <div key={task._id} className={`flex-shrink-0 h-full w-[300px] ${statusColor[task.status]} rounded-xl p-5 flex flex-col justify-between`}>
          <div>
            <div className='flex justify-between items-center'>
              <h3 className='bg-black/30 px-3 py-1 rounded-sm text-sm capitalize'>{task.status}</h3>
              <h4 className='text-sm'>{task.date}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{task.title}</h2>
            <p className='text-sm mt-2'>{task.description}</p>
            <span className='text-xs mt-2 inline-block bg-black/20 px-2 py-1 rounded'>{task.category}</span>
          </div>
          <div className='flex gap-2 mt-4 flex-wrap'>
            {task.status === 'new' && (
              <button onClick={() => updateStatus(task._id, 'active')}
                className='bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition'>
                Accept
              </button>
            )}
            {task.status === 'active' && (
              <>
                <button onClick={() => updateStatus(task._id, 'completed')}
                  className='bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition'>
                  Complete
                </button>
                <button onClick={() => updateStatus(task._id, 'failed')}
                  className='bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition'>
                  Failed
                </button>
              </>
            )}
            {(task.status === 'completed' || task.status === 'failed') && !task.revertRequest && (
              <button onClick={() => requestRevert(task._id)}
                className='bg-black/30 text-white text-sm px-3 py-1 rounded hover:bg-black/50 transition'>
                Request Revert
              </button>
            )}
            {(task.status === 'completed' || task.status === 'failed') && task.revertRequest && (
              <span className='text-xs bg-black/30 px-3 py-1 rounded text-yellow-200'>⏳ Awaiting manager approval</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
