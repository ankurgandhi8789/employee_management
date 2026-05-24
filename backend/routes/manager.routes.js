const express = require('express');
const { createEmployee, getEmployees, assignTask, getAllTasks, removeEmployee, getRevertRequests, approveRevert } = require('../controllers/manager.controller');
const protect = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect(['manager']));

router.post('/employee', createEmployee);
router.get('/employees', getEmployees);
router.post('/task', assignTask);
router.get('/tasks', getAllTasks);

router.delete('/employee/:id', removeEmployee);
router.get('/revert-requests', getRevertRequests);
router.patch('/task/:id/approve-revert', approveRevert);

module.exports = router;
