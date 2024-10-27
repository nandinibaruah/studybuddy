// pages/index.js
import Head from 'next/head';
import PomodoroTimer from '../components/PomodoroTimer';
import TaskList from '../components/TaskList';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Study Buddy</title>
        <meta name="description" content="A study tracker app with a Pomodoro timer" />
      </Head>
      <h1 className="text-4xl font-bold text-center">Study Buddy</h1>
      <PomodoroTimer />
      <TaskList />
    </div>
  );
};

export default Home;
