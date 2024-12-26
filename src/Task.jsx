import React from 'react';
import './App.css';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';

const Task = ({ task, onDelete, onEdit }) => {
  const statusColor = {
    Pending: 'text-warning',
    'In Progress': 'text-info',
    Completed: 'text-success',
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className={`card-title ${statusColor[task.status]}`}>
          {task.name}
        </h5>
        <p className="card-text">{task.description}</p>
        <p className="card-text">
        <small className="text-muted">
  Due: {new Date(task.dueDate).toLocaleDateString()}
</small>

        </p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-sm btn-primary" onClick={() => onEdit(task._id)}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;