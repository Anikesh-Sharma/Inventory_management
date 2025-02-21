const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true
    },
    status: {
        type: String,
        enum: ["Completed", "Pending", "Not Started"],
        default: "Not Started"
    }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
