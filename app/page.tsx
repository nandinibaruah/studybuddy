"use client";

import { useState, useEffect } from 'react';

const HomePage = () => {
  const [tasks, setTasks] = useState<{ id: number; name: string; timeSpent: number; isActive: boolean; seconds: number; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [taskId, setTaskId] = useState(0); // Unique ID for each task

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: taskId, name: newTask, timeSpent: 0, isActive: false, seconds: 0, completed: false }]);
      setNewTask("");
      setTaskId((prevId) => prevId + 1); // Increment task ID for the next task
    }
  };

  const startTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => 
        task.id === id ? { ...task, isActive: true } : task
      )
    );
  };

  const stopTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => 
        task.id === id 
          ? { ...task, isActive: false, timeSpent: task.seconds, completed: task.completed } 
          : task
      )
    );
  };

  const toggleCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const intervals = tasks.map((task) => {
      if (task.isActive) {
        return setInterval(() => {
          setTasks((prevTasks) => {
            return prevTasks.map((t) => 
              t.id === task.id ? { ...t, seconds: t.seconds + 1 } : t
            );
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

  // Sort tasks: Incomplete first, then completed
  const sortedTasks = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">s t u d y - b u d d y</h1>
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
        {sortedTasks.map((task) => (
          <li key={task.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="accent-blue-500"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            <span className={`flex-grow ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.name} - {task.timeSpent + task.seconds}s
            </span>
            <button
              onClick={() => startTask(task.id)}
              className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
              disabled={task.isActive || task.completed}
            >
              Start
            </button>
            <button
              onClick={() => stopTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              disabled={!task.isActive || task.completed}
            >
              Stop
            </button>
            <button
              onClick={() => deleteTask(task.id)}
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
