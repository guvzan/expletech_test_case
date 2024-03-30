const Task = require('../models/Task');


const getTasks = async (req, res) => {
    try {
        // Parse query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortField = req.query.sortField || 'createdAt';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        const offset = (page - 1) * limit;

        const query = { author: req.currentUser._id };

        const {count, data} = await Task.aggregate([
            {
              $match: query
            },
            {
                $facet: {
                    tasks: [
                        {
                            $sort: { [sortField]: sortOrder }
                        },
                        {
                            $skip: offset
                        },
                        {
                            $limit: limit
                        }
                    ],
                    count: [
                        {
                            $count: 'count'
                        }
                    ]
                }
            },
            {
              $project: {
                data: '$tasks',
                count: { $arrayElemAt: ['$count.count', 0] },
              }
            }
          ]);

        res.status(200).json({
            count: count,
            data: data
        });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const query = { _id: req.params.id, author: req.currentUser._id };

        const task = await Task.findByOne({
            _id: mongoose.Types.ObjectId(query.id),
            author: query.author
        });

        if (!task) {
            return res.status(404).json({ error: 'Error occured while searching task for this user' });
        }

        return res.status(200).json({ task });
    } catch(e) {
        res.status(403).send('Not Authorized!');
    }
}

const createTask = async (req, res) => {
    try {
        const {title, description} = req.body;
        // validation
        const author = req.currentUser._id;
        const task = await Task.create({title, description, author});
        res.status(201).send(task);
    } catch (err) {
        //Need to handle this errors
        const parsedErrors = handleErrors(err);
        res.status(400).json(parsedErrors);
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(id);

        res.status(201).json("Task deleted successfully!");
    } catch (e){
        console.log('Error occurred while deleting task:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
        }
        
        return res.status(200).json({ updatedTask });
    } catch (err) {
        console.error('Error occurred while updating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllTasks = async (req, res) => {
    try{
        const allTasks = await Task.find();
        res.status(200).json({allTasks});
    }catch (err){
        console.log('Error occurred while getting all tasks: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getTasks,
    createTask,
    getTaskById,
    deleteTask,
    updateTask,
    getAllTasks
}