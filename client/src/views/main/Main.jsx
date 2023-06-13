import Navbar from '../../components/navbar';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import Task from '../../components/task';
import { useAuthUser, } from 'react-auth-kit';
import { useNavigate } from "react-router-dom";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const authUser = useAuthUser();
  const username = authUser()?.username || '';
  const navigate = useNavigate();

const fetchPosts = () => {
  axios.get(`http://localhost:3000/tasks/${username}`)
  .then(response => {
    setTasks(response.data);
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error while fetching tasks:', error);
  });
}

  useEffect(() => {
    fetchPosts();
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
          subtasks={task.subtasks}
          fetchPosts={fetchPosts}
        
        />
      ))}
      {tasks.length === 0 && 
      <div
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 40,
          textAlign: 'center',
        }}
      >
        <div>
          No tasks found.
          </div>
      <div
        style={{
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/addTask')}
      >
         Start by adding some
        </div>
      </div>
      }
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