"use client";

import { useState, useEffect } from 'react';

const HomePage = () => {
  const [tasks, setTasks] = useState<{ name: string; timeSpent: number; isActive: boolean; seconds: number; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, timeSpent: 0, isActive: false, seconds: 0, completed: false }]);
      setNewTask("");
    }
  };

  const startTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, isActive: true } : task
    );
    setTasks(updatedTasks);
  };

  const stopTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index 
        ? { ...task, isActive: false, timeSpent: task.seconds, completed: task.completed } 
        : task
    );
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const intervals = tasks.map((task, index) => {
      if (task.isActive) {
        return setInterval(() => {
          setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index].seconds += 1; // Increment the seconds for the active task
            return updatedTasks;
          });
        }, 1000);
      }
      return null;
    });

    return () => {
      intervals.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [tasks]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Study Buddy - To-Do List</h1>
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          +
        </button>
      </div>
      <ul className="space-y-2 w-64">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="accent-blue-500"
              checked={task.completed}
              onChange={() => toggleCompletion(index)}
            />
            <span className={`flex-grow ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.name} - {task.timeSpent + task.seconds}s
            </span>
            <button
              onClick={() => startTask(index)}
              className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
              disabled={task.isActive || task.completed}
            >
              Start
            </button>
            <button
              onClick={() => stopTask(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              disabled={!task.isActive || task.completed}
            >
              Stop
            </button>
            <button
              onClick={() => deleteTask(index)}
              className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <HomePage />
    </div>
  );
};

export default App;
