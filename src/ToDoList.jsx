import React, { useState, useEffect } from 'react'
import './index.css' 

export default function ToDoList() {
    const [value,setvalue] = useState("")
    const [todos, setTodos] =useState([])
    const [currentEditId, setCurrentEditId] = useState(null);  
    const [editValue, setEditValue] = useState("");  
    const [tasks, setTask] = useState([])

    
    
    const saveTask = (task)=>{
      const updateTasks = [...tasks,task];
      setTask(updateTasks);
      localStorage.setItem('tasks', JSON.stringify(updateTasks));
    }
    const deleteTask = (taskToDelete)=>{
      const updatedTasks = tasks.filter(task => task !== taskToDelete);
      setTask(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    const loadTask =()=>{
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
          setTask(storedTasks);
          setTodos(storedTasks.map((task, index) => ({
              id: index,
              task,
              completed: false,
              isEditing: false,
          })));
    }

    useEffect(()=>{
      loadTask()
   },[])


    const HandleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      const addTodo = todo => {setTodos([...todos , { id: todos.length, task: todo , completed: false ,isEditing :false}])  
      }
      
      addTodo(value)
      setvalue("")
      saveTask(value)    
      
    }

    const delTodo =(id)=> {
      const taskToDelete = todos.find(task => task.id === id)?.task;
      setTodos(todos.filter(todo => todo.id !== id));
      deleteTask(taskToDelete);
    }
    const startEdit = (id, task) => {  
      setCurrentEditId(id);  
      setEditValue(task);  
    };  

    const saveEdit = (id) => {  
      const updatedTodos = todos.map(todo =>   
      todo.id === id ? { ...todo, task: editValue } : todo  
      );
      setTodos(updatedTodos); 

      const updatedTasks = updatedTodos.map(todo => todo.task);
      setTask(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      setCurrentEditId(null);  
      setEditValue("");  
    }; 

    const listOfTodos =todos.map( todo =>(
      <li key={todo.id} >
        {currentEditId === todo.id ? (  
          <input   
            type="text"   
            value={editValue}   
            onChange={(e) => setEditValue(e.target.value)}   
          />  
          ) : (  
          <span>*{todo.task}</span>  
          )
        }
        <div className="action">
          <button className='actionbtn' onClick={() => delTodo(todo.id)} >Delete</button> 
          {currentEditId === todo.id ? (  
            <button className='actionbtn' onClick={() => saveEdit(todo.id)}>Save</button>  
            ) : (  
            <button className='actionbtn' onClick={() => startEdit(todo.id, todo.task)}>Edit</button>  
            )
          } 
        </div>
      </li>
    ));
 
   
   




    return (
      <div id='container'> 
        <div id='header'>My ToDo List</div>
        <form id="submit" onSubmit={HandleSubmit}>
              <input id="task" type="text"  value={value} placeholder='Enter your task...' onChange= {(e) => setvalue(e.target.value)} />
              <button id="submitbtn" type='submit' >submit</button>
        </form>
        <div>
          <ul>{listOfTodos}</ul>
        </div>  
      </div>
    )
}