const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    author: {
        require: [true, 'Author not set'],
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task