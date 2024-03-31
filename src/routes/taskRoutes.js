const {Router} = require('express');
const {getTasks, createTask, getTaskById, deleteTask, updateTask, getAllTasks} = require('../controllers/taskController');
const {requireAuth, getCurrentUser, checkRole} = require('../../middleware/authMiddleware');


const router = Router();

router.post('/new-task', requireAuth, getCurrentUser, createTask);
router.get('/tasks', requireAuth, getCurrentUser, getTasks);
router.get('/task/:id', requireAuth, getCurrentUser, getTaskById);
router.delete('/task/:id', requireAuth, getCurrentUser, deleteTask);
router.put('/update-task/:id', requireAuth, getCurrentUser, updateTask);

// Bonus route
router.get('/all-tasks', requireAuth, getCurrentUser, checkRole(['admin']), getAllTasks);

module.exports = router;