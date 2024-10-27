// page.tsx
"use client";

import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo, FaPlus, FaCheckCircle } from 'react-icons/fa';

const HomePage = () => {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index: number) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-semibold text-center mb-4">Study Buddy - To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="w-full p-2 border border-gray-300 rounded-l-md"
        />
        <button onClick={addTask} className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center p-2 border rounded-md ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
              className="mr-2"
            />
            <span className="flex-1">{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Timer</h2>
      <div className="text-4xl font-bold text-center mb-4">{formatTime(seconds)}</div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`p-3 rounded-full ${
            isActive ? "bg-red-500" : "bg-green-500"
          } text-white hover:opacity-90`}
        >
          {isActive ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={reset} className="p-3 bg-gray-500 rounded-full text-white hover:opacity-90">
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

// Main component that renders both HomePage and Timer
const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <HomePage />
      <Timer />
    </div>
  );
};

export default MainPage;
