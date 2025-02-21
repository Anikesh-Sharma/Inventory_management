import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    task: '',
    description: '',
    priority: 'Low',
    status: 'Not Started'
  });
  const [editTodo, setEditTodo] = useState(null);
  const baseURL = 'https://inventory-management-z28w.onrender.com/api/todos';

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${baseURL}/`);
      const data = await res.json();
      if (res.ok) {
        setTodos(data.todos);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseURL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Todo created successfully');
        setFormData({
          task: '',
          description: '',
          priority: 'Low',
          status: 'Not Started'
        });
        fetchTodos();
      } else {
        alert(data.message || 'Error creating todo');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseURL}/delete/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        alert('Todo deleted successfully');
        fetchTodos();
      } else {
        alert(data.message || 'Error deleting todo');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setFormData({
      task: todo.task,
      description: todo.description,
      priority: todo.priority,
      status: todo.status
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTodo) return;
    try {
      const res = await fetch(`${baseURL}/update/${editTodo._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Todo updated successfully');
        setEditTodo(null);
        setFormData({
          task: '',
          description: '',
          priority: 'Low',
          status: 'Not Started'
        });
        fetchTodos();
      } else {
        alert(data.message || 'Error updating todo');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setEditTodo(null);
    setFormData({
      task: '',
      description: '',
      priority: 'Low',
      status: 'Not Started'
    });
  };

  return (
    <div className="container">
      <h1 className="title">Todo Management</h1>
      <form onSubmit={editTodo ? handleUpdate : handleSubmit} className="todo-form">
        <div className="form-group">
          <label>Task:</label>
          <input
            type="text"
            name="task"
            value={formData.task}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="input-field"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-field"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="Not Started">Not Started</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="button-group">
          <button type="submit" className="btn">
            {editTodo ? 'Update Todo' : 'Create Todo'}
          </button>
          {editTodo && (
            <button type="button" onClick={cancelEdit} className="btn cancel">
              Cancel
            </button>
          )}
        </div>
      </form>
      <h2 className="subtitle">Todo List</h2>
      <div className="table-container">
        <table className="todo-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length ? (
              todos.map((todo) => (
                <tr key={todo._id}>
                  <td>{todo.task}</td>
                  <td>{todo.description}</td>
                  <td>{todo.priority}</td>
                  <td>{todo.status}</td>
                  <td>
                    <button onClick={() => handleEdit(todo)} className="btn action-btn edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(todo._id)} className="btn action-btn delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-todos">
                  No todos found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
