import Navbar from '../../components/navbar';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import Task from '../../components/task';
import { useAuthUser, } from 'react-auth-kit';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const authUser = useAuthUser();
  const username = authUser()?.username || '';

  useEffect(() => {
    axios.get(`http://localhost:3000/tasks/${username}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error while fetching tasks:', error);
      });
  }, []);

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
      {tasks.map(task => (
        <Task 
          key={task.id}
          id={task.id}
          taskName={task.taskName}
          deadline={task.deadline}
          notes={task.notes}
          priority={task.priority}
          status={task.status}
        />
      ))}
    </div>
  );
};

export default function Main() {
  return (
    <>
      <Navbar mode='auth' />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
        <TaskList />
      </div>
    </>
  );
}