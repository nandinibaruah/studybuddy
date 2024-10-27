"use client";

import { useState, useEffect } from 'react';

const HomePage = () => {
  const [tasks, setTasks] = useState<{ name: string; timeSpent: number }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, timeSpent: 0 }]);
      setNewTask("");
    }
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startTask = (index: number) => {
    if (activeTaskIndex !== null) {
      // Stop the previous task's timer
      stopTask();
    }
    setActiveTaskIndex(index);
    setIsTimerActive(true);
  };

  const stopTask = () => {
    if (activeTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === activeTaskIndex ? { ...task, timeSpent: timerSeconds } : task
      );
      setTasks(updatedTasks);
    }
    setIsTimerActive(false);
    setTimerSeconds(0);
    setActiveTaskIndex(null);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

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
              onClick={() => startTask(index)}
            />
            <span>{task.name} - {task.timeSpent}s</span>
            <button
              onClick={() => deleteTask(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
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
