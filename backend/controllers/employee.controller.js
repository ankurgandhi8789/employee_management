const Task = require('../models/Task');

const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ employeeId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ['active', 'completed', 'failed'];
  if (!allowed.includes(status))
    return res.status(400).json({ message: 'Invalid status' });

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, employeeId: req.user.id },
      { status },
      { returnDocument: 'after' }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const requestRevert = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, employeeId: req.user.id, status: { $in: ['completed', 'failed'] } },
      { revertRequest: true },
      { returnDocument: 'after' }
    );
    if (!task) return res.status(404).json({ message: 'Task not found or not completed' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMyTasks, updateTaskStatus, requestRevert };
