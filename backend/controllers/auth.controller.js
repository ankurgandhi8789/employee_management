const jwt = require('jsonwebtoken');
const Manager = require('../models/Manager');
const Employee = require('../models/Employee');

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

  
const registerManager = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await Manager.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const manager = await Manager.create({ name, email, password });
    console.log("yaha tk sab thick h")
    res.status(201).json({
      token: generateToken(manager._id, 'manager'),
      user: { id: manager._id, name: manager.name, email: manager.email, role: 'manager' },
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginManager = async (req, res) => {
  const { email, password } = req.body;
  try {
    const manager = await Manager.findOne({ email });
    if (!manager || !(await manager.matchPassword(password)))
      return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      token: generateToken(manager._id, 'manager'),
      user: { id: manager._id, name: manager.name, email: manager.email, role: 'manager' },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee || !(await employee.matchPassword(password)))
      return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      token: generateToken(employee._id, 'employee'),
      user: { id: employee._id, name: employee.name, email: employee.email, role: 'employee' },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerManager, loginManager, loginEmployee };
