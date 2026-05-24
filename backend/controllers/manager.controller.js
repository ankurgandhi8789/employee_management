const Employee = require('../models/Employee');
const Task = require('../models/Task');

const createEmployee = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await Employee.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Employee email already exists' });

    const employee = await Employee.create({ name, email, password, managerId: req.user.id });
    res.status(201).json({ id: employee._id, name: employee.name, email: employee.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ managerId: req.user.id }).select('-password');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const assignTask = async (req, res) => {
  const { title, description, date, category, employeeId } = req.body;
  try {
    const employee = await Employee.findOne({ _id: employeeId, managerId: req.user.id });
    if (!employee) return res.status(404).json({ message: 'Employee not found in your team' });

    const task = await Task.create({
      title, description, date, category,
      employeeId, managerId: req.user.id, status: 'new',
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ managerId: req.user.id }).populate('employeeId', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ _id: req.params.id, managerId: req.user.id });
    if (!employee) return res.status(404).json({ message: 'Employee not found in your team' });
    await Task.deleteMany({ employeeId: req.params.id });
    res.json({ message: 'Employee removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRevertRequests = async (req, res) => {
  try {
    const tasks = await Task.find({ managerId: req.user.id, revertRequest: true }).populate('employeeId', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const approveRevert = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, managerId: req.user.id, revertRequest: true },
      { status: 'active', revertRequest: false },
      { returnDocument: 'after' }
    );
    if (!task) return res.status(404).json({ message: 'Request not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createEmployee, getEmployees, assignTask, getAllTasks, removeEmployee, getRevertRequests, approveRevert };
