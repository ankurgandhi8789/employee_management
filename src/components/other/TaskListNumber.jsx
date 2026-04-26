import React from 'react'

const TaskListNumber = () => {
  return (
    <div className='flex mt-10 justify-between gap-5 screen'>
      <div className='rounded-xl px-9 py-6 w-[45%] bg-red-400 text-white'>
        <h2 className='text-3xl font-semibold'>0</h2>
        <h2 className='text-xl font-medium'>New Task</h2>
      </div>
      <div className='rounded-xl px-9 py-6 w-[45%] bg-blue-400 text-white'>
        <h2 className='text-3xl font-semibold'>0</h2>
        <h2 className='text-xl font-medium'>New Task</h2>
      </div>
      <div className='rounded-xl px-9 py-6 w-[45%] bg-green-400 text-white'>
        <h2 className='text-3xl font-semibold'>0</h2>
        <h2 className='text-xl font-medium'>New Task</h2>
      </div>
      <div className='rounded-xl px-9 py-6 w-[45%] bg-yellow-400 text-white'>
        <h2 className='text-3xl font-semibold'>0</h2>
        <h2 className='text-xl font-medium'>New Task</h2>
      </div>
    </div>
  )
}

export default TaskListNumber