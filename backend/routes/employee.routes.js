const express = require('express');
const { getMyTasks, updateTaskStatus, requestRevert } = require('../controllers/employee.controller');
const protect = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect(['employee']));

router.get('/tasks', getMyTasks);
router.patch('/task/:id', updateTaskStatus);
router.patch('/task/:id/revert-request', requestRevert);

module.exports = router;
