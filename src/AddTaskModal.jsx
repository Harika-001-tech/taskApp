import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Task from './Task';
import TaskList from './TaskList';



const AddTaskModal = ({ show, onClose, onSubmit, editTask }) => {
    const [name, setName] = useState(editTask ? editTask.name : '');
    const [description, setDescription] = useState(editTask ? editTask.description : '');
    const [dueDate, setDueDate] = useState(editTask ? new Date(editTask.dueDate) : new Date());
    const [status, setStatus] = useState(editTask ? editTask.status : 'Pending');
    const [priority, setPriority] = useState(editTask ? editTask.priority : 'Low');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
  
      if (!name) {
        setErrorMessage('Please enter a task name.');
        return;
      }
  
      try {
        const newTask = {
          name,
          description,
          dueDate: dueDate.toISOString().split('T')[0], // Ensure date is in the correct format
          status,
          priority,
        };
  
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`, newTask);
        onSubmit(); 
        onClose(); 
      } catch (err) {
        
      }
    }

    return (
      <div className={show ? 'modal show' : 'modal'}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              
              <button type="button" className=" btn btn-close" onClick={onClose}>Close</button>
            </div>
            <div className="modal-body">
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Task Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value={dueDate.toISOString().split('T')[0]}
                    onChange={(e) => setDueDate(new Date(e.target.value))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status:
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">
                    Priority:
                  </label>
                  <select
                    className="form-select"
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  {editTask ? 'Save Changes' : 'Add New Task'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AddTaskModal;
  