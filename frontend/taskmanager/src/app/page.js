'use client'
// pages/tasks/index.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheckCircle, FaCircle } from 'react-icons/fa'; // Import FontAwesome icons


export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:3001/api/tasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const addTask = () => {
      if (newTask.trim() !== '') {
          axios.post('http://localhost:3001/api/tasks', { text: newTask })
              .then(() => {
                  setNewTask('');
                  fetchTasks();
              })
              .catch((error) => {
                  console.error(error);
              });
      }
  };


    const deleteTask = (index) => {
        axios.delete(`http://localhost:3001/api/tasks/${index}`)
            .then(() => {
                fetchTasks();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const markTaskComplete = (index) => {
        axios.put(`http://localhost:3001/api/tasks/${index}/complete`)
            .then(() => {
                fetchTasks();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
      <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">Task Management App</h1>
      <div className="flex mb-4">
          <input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow rounded-l border border-gray-300 px-2 py-1"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-3 py-1 rounded-r"><FaCheckCircle /></button>
      </div>
      <ul className="list-disc pl-6">
          {tasks.map((task, index) => (
              <li key={index} className={`mb-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  <div className="flex justify-between">
                      <span>{task.text}</span>
                      <div className="space-x-2">
                          <button onClick={() => deleteTask(index)} className="text-red-500"><FaTrash /></button>
                          <button onClick={() => markTaskComplete(index)} className="text-green-500">
                              {task.completed ? <FaCircle /> : <FaCheckCircle />}
                          </button>
                      </div>
                  </div>
              </li>
          ))}
      </ul>
  </div>
    );
}
