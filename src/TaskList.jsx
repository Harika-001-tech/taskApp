import React, { useState, useEffect } from 'react';
import Task from './Task';
import AddTaskModal from './AddTaskModal';
import axios from 'axios';
import './App.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null); // Task to edit

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`);
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      // Make the delete request to the backend
      console.log("Deleting task with ID:", id)
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${id}`);
      
      // Log the response data if needed
      console.log('Delete response:', response.data);
  
      // Filter out the deleted task from the state
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task._id === id);
    setEditTask(taskToEdit);
    setShowModal(true); // Open modal for editing
  };

  const handleAddTask = () => {
    setEditTask(null); // Reset task for adding a new one
    setShowModal(true);
  };

  const handleSaveTask = (savedTask) => {
    if (editTask) {
      // Update task in the list
      const updatedTasks = tasks.map((task) =>
        task._id === savedTask._id ? savedTask : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } else {
      // Add new task to the list
      setTasks((prevTasks) => [...prevTasks, savedTask]);
      setFilteredTasks((prevTasks) => [...prevTasks, savedTask]);
    }
    setShowModal(false);
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === selectedFilter));
    }
  };

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={handleAddTask}>
        Add Task
      </button>
      <select
        value={filter}
        onChange={handleFilterChange}
        className="form-select mb-3"
      >
        <option value="all">All Tasks</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      ) : (
        <p>No tasks available.</p>
      )}
      {showModal && (
        <AddTaskModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSaveTask}
          editTask={editTask}
        />
      )}
    </div>
  );
};

export default TaskList;
