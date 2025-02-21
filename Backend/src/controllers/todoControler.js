const Todo = require("../Models/todo.model");

const CreateTodo = async (req, res) => {
  const { task, description, priority, status } = req.body;
  try {
    const existingTask = await Todo.findOne({ task });
    if (existingTask) {
      return res.status(401).json({ message: "Task already exists" });
    }
    const newTodo = await Todo.create({ task, description, priority, status });
    res.status(201).json({ message: "Task successfully created", newTodo });
  } catch (err) {
    console.error(err);
    res
      .status(501)
      .json({ message: "Task is not created", error: err.message });
  }
};

const UpdateTodo = async (req, res) => {
  const id = req.params.id
  const { task, description, priority, status } = req.body;
  if (!id) {
    return res.status(401).json({ message: "Task ID is required" });
  }
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, description, priority, status },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(201).json({ message: "Task successfully updated", updatedTodo });
  } catch (err) {
    console.error(err);
    res.status(501).json({ message: "Task update failed", error: err.message });
  }
};

const DeleteTodo = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(401).json({ message: "Task ID is required" });
  }
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(201).json({ message: "Task successfully deleted", deletedTodo });
  } catch (err) {
    console.error(err);
    res
      .status(501)
      .json({ message: "Task deletion failed", error: err.message });
  }
};

const GetTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json({ message: "Tasks retrieved successfully", todos });
  } catch (err) {
    console.error(err);
    res
      .status(501)
      .json({ message: "Failed to retrieve tasks", error: err.message });
  }
};

module.exports = {
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
  GetTodos,
};
