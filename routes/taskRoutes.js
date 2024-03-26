const {Router} = require('express');
const {getTasks, createTask, getTaskById, deleteTask, updateTask} = require('../controllers/taskController');
const {requireAuth, getCurrentUser} = require('../middleware/authMiddleware');


const router = Router();

router.post('/new-task', requireAuth, getCurrentUser, createTask);
router.get('/tasks', requireAuth, getCurrentUser, getTasks);
router.get('/task/:id', requireAuth, getCurrentUser, getTaskById);
router.delete('/task/:id', requireAuth, getCurrentUser, deleteTask);
router.put('/update-task/:id', requireAuth, getCurrentUser, updateTask);

module.exports = router;