/* eslint-disable react/prop-types */
import {AiOutlinePlus} from 'react-icons/ai'
import {IoCloseSharp} from 'react-icons/io5'
import {  useState } from 'react';
import axios from 'axios';
import { schema } from './validationSchema';
import { useAuthUser, } from 'react-auth-kit';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export default function Task({
    id, 
    taskName, 
    deadline, 
    notes, 
    priority, 
    status,
    subtasks,
    fetchPosts
}) {
    const [isButtonHovered, setButtonHovered] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const authUser = useAuthUser();
    const username = authUser()?.username || '';

    const {
        register,
        handleSubmit,
        reset,
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const updatedData = {
                ...data,
                username: username,
            };
            const response = await axios.post(`http://localhost:3000/tasks/${id}/subtasks`, updatedData)
            console.log("Response: ", response);
            reset();
            setInputVisible(false)
            fetchPosts();  
        } catch (error) {
            if (error.response) {
                setError("content", { message: error.response.data });
                console.log(error)
            } else {
                setError("content", { message: "An error occurred. Please try again later." });
            }
        }

    };

  return (
    <div style={taskContainer}>
        <div>
      <h3>{taskName}</h3>
      <p>{deadline.split('T')[0]}</p>
      <div style={{flexWrap: 'wrap'}}>{notes}</div>
      <p>Priority: {priority}</p>
      <p>Status: {status}</p>
      </div>
      <div>
        {subtasks.length > 0 && (
            <div style={{marginTop: 10, marginBottom: 20}}>
            <div  
            style={{
                fontWeight: 'bold', 
                }}
                >Subtasks:</div>
            {subtasks.map((subtask) => (
            <div 
            key={subtask.id}
            style={{
                borderTop: '1px solid #103727',
                marginLeft: 10,
                marginRight: 10,
            }}
            >
                <p>{subtask.content}</p>
            </div>
            ))}
            </div>
        )}
        </div>

      {inputVisible ? 
      <div style={inputContainer}>
      <input 
        type="text" 
        placeholder="Enter subtask"
        {...register('content')}
        style={inputStyle}
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
                console.log("lala")
                handleSubmit(onSubmit)();
              }
        }}
      />
      <IoCloseSharp 
      style={{
        width: 25,
        height: 25,
        cursor: 'pointer'
      }}
      onClick={() => setInputVisible(false)}
      />
      </div> :
      <div 
        style={-
            isButtonHovered
                ? { ...addSubtask, ...buttonHoverStyle }
                : { ...addSubtask }
        }
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        onClick={() => setInputVisible(true)}
        >
        <AiOutlinePlus style={{ marginRight: 5}}/>
        Add subtask
      </div>}
    </div>
  );
}

const taskContainer = {
    backgroundColor: '#729A85',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    minWidth: 300,
    maxWidth: 500,
    display: 'grid',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'auto',
  };
  

const addSubtask = {
    borderBottom: '1px solid #103727',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
}

const buttonHoverStyle = {
    backgroundColor: '#A5CFB9',
    borderRadius: 10,
    cursor: 'pointer',
  };
  
const inputContainer = {
    borderBottom: '1px solid #103727',
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
}

const inputStyle = {
    WebkitAppearance: 'none',
    backgroundColor: '#A5CFB9',
    border: '1px solid #A5CFB9',
    color: '#000',
    width: '100%',
    padding: 5,
    fontSize: '0.9em',
    fontFamily: 'Source Sans Pro, sans-serif',
    borderRadius: 10,
    outline: 'none',
    transition: 'background 0.25s, border-color 0.25s, color 0.25s',
    marginRight: 5,
};