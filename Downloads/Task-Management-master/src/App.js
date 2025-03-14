import React, { useReducer, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTheme } from './context/ThemeContext';
import { taskReducer, ACTIONS } from './reducers/taskReducer';
import './App.css';

function App() {
  const { darkMode, toggleTheme } = useTheme();
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [title, setTitle] = useState('');        // Manages task title input
  const [description, setDescription] = useState(''); // Manages task description input
  const [editingTask, setEditingTask] = useState(null); // Tracks which task is being edited
  const [errors, setErrors] = useState({}); // Manages form validation errors
  const titleInputRef = useRef(null);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (editingTask) {
      dispatch({
        type: ACTIONS.UPDATE_TASK,
        payload: {
          id: editingTask.id,
          title,
          description
        }
      });
      setEditingTask(null);
      alert('Task updated successfully!');
    } else {
      dispatch({
        type: ACTIONS.ADD_TASK,
        payload: { title, description }
      });
      alert('New task added successfully!');
    }
    
    setTitle('');
    setDescription('');
    titleInputRef.current.focus(); // Re-focus after submission
  };

  // Memoize event handlers
  const handleInputChange = useCallback((e, setter) => {
    setter(e.target.value);
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  }, [errors]);

  const deleteTask = useCallback((taskId) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    if (window.confirm(`Are you sure you want to delete "${taskToDelete.title}"?`)) {
      dispatch({
        type: ACTIONS.DELETE_TASK,
        payload: { id: taskId }
      });
      alert(`Task "${taskToDelete.title}" has been deleted!`);
    }
  }, [tasks]);

  const editTask = useCallback((task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  }, []);

  const toggleComplete = useCallback((taskId) => {
    dispatch({
      type: ACTIONS.TOGGLE_COMPLETE,
      payload: { id: taskId }
    });
  }, []);

  // Memoize tasks list with sorting (completed tasks at bottom)
  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter(task => showCompleted || !task.completed)
      .sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
  }, [tasks, showCompleted]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex) return;

    dispatch({
      type: ACTIONS.REORDER_TASKS,
      payload: {
        sourceIndex: dragIndex,
        destinationIndex: dropIndex
      }
    });
  };

  // Memoize TaskItem component
  const TaskItem = useCallback(({ task, index }) => (
    <div
      key={task.id}
      className={`task-item ${task.completed ? 'completed' : ''}`}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    >
      <div className="task-handle">⋮⋮</div>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
      </div>
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="task-actions">
        <button className="edit-btn" onClick={() => editTask(task)}>✏️ Edit</button>
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️ Delete</button>
      </div>
    </div>
  ), [toggleComplete, editTask, deleteTask]);

  return (
    <div className="App">
      <div className="header-controls">
        <button 
          className="filter-toggle"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? '👁️ Hide Done' : '👁️ Show All'}
        </button>
        <h1>✨ Task Management</h1>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            ref={titleInputRef}
            type="text"
            name="title"
            placeholder="Task title"
            value={title}
            onChange={(e) => handleInputChange(e, setTitle)}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <textarea
            name="description"
            placeholder="Task description"
            value={description}
            onChange={(e) => handleInputChange(e, setDescription)}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <button type="submit">
          {editingTask ? '✏️ Update Task' : '➕ Add Task'}
        </button>
      </form>

      <div className="tasks-list">
        {sortedTasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
