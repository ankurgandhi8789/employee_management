const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  status: {
    type: String,
    enum: ['new', 'active', 'completed', 'failed'],
    default: 'new',
  },
  revertRequest: { type: Boolean, default: false },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
