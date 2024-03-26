const Task = require('../models/Task');


const getTasks = (req, res) => {
    if (req.currentUser){
        Task.find({author: req.currentUser})
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log('Error occured while searching tasks for this user', err);
                res.status(404).send('Not Found!');
            })
    }else{
        res.status(404).send('Not Found!');
    }
}

const getTaskById = (req, res) => {
    if(req.currentUser){
        Task.findById(req.params.id)
            .then((result) => {
                if(result.author.toString() === req.currentUser._id.toString()){
                    res.status(200).json({result});
                }else{
                    res.status(403).send('You do not have permission to view this page!');
                }
            })
            .catch((err) => {
                console.log('Error occured while searching task for this user', err);
                res.status(404).send('Not Found!');
            })
    }else{
        res.status(403).send('Not Authorized!');
    }
}

const createTask = async (req, res) => {
    const {title, description} = req.body;
    try {
        if(req.currentUser){
            const author = req.currentUser._id;
            const task = await Task.create({title, description, author});
            res.status(201).json({task});
        } else{
            res.status(400).send('Cannot create new task');
        }
    } catch (err) {
        //Need to handle this errors
        console.log(err);
        res.status(400).json(err);
    }
}

const deleteTask = (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then((result) => {
            res.status(204).send('Task deleted');
        })
        .catch((err) => {
            console.log('Error occurred while deleting task:', err);
        })
}

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }else{
            res.status(200).json({ updatedTask });
        }
    } catch (err) {
        console.error('Error occurred while updating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getTasks,
    createTask,
    getTaskById,
    deleteTask,
    updateTask
}