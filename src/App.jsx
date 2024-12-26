import React from 'react';
import './App.css'; 
import TaskList from './TaskList'; // Import TaskList component
import AddTaskModal from './AddTaskModal'; // Import AddTaskModal component



function App() {
  return (
    <div className="container">
      <h1>Task Tracker</h1>
      <AddTaskModal /> {/* Render the AddTaskModal component */}
      <TaskList /> {/* Render the TaskList component */}
    </div>
  );
}

export default App;