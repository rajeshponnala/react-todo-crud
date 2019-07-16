import axios from 'axios'
import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { ListItem } from './ListItem'
import loadingGif from './loading.gif'

function App() {
  
   const [todos, setTodos] = useState({
    newTodo: '',
    notification: null, 
    todos: [],
    loading: true
  })
  const [baseUrl] = useState('https://5d24fdd9d924540014931178.mockapi.io')
  useEffect(() => {
     const getTodos = async() => {
       const data = await axios.get(`${baseUrl}/todos`)
      setTimeout(() => {
        setTodos(pd => ({ ...pd, todos: data.data,loading: false }))
      },1000)
     }
     getTodos() 
  },[baseUrl])
  
  const addToDo = async (event) => {
    const name = todos.newTodo 
    const response = await axios.post(`${baseUrl}/todos`,{name})
    setTodos(ps => ({
        newTodo: '',
        editing: false,
        editingId: undefined,
        todos: [...ps.todos, response.data] }))
     alert('Todo created successfully')
   }

   const removeToDo = async (event, id) => {
     setTodos(ps => ({ ...ps, loading: true }))
     await axios.delete(`${baseUrl}/todos/${id}`)
     setTimeout(() => {
       setTodos(ps => ({ ...ps,loading:false,todos: ps.todos.filter((x) => x.id !== id) }))
       alert('Todo deleted successfully')
     }, 1000)
   }

  
  
   const editToDo = (event, id) => {
    const name = todos.todos.filter((x) => x.id === id)[0].name
    setTodos(ps => ({ ...ps, editing: true, editingId: id, newTodo: name }))
  }

  const updateToDo = async (event) => {
    setTodos(ps => ({...ps, loading: true}))
    await axios.put(`${baseUrl}/todos/${todos.editingId}`,{name: todos.newTodo})
    setTimeout(() => {
      setTodos(ps => ({ ...ps, editing: false,loading: false,editingId: undefined, newTodo: '', todos: ps.todos.map(x => (x.id === todos.editingId) ? ({ ...x, name: todos.newTodo }) : x) }))
      alert('Todo updated successfully')
    }, 1000)
  }

  const alert = (notification) => {
      setTodos( ps => ({...ps, notification }))
      setTimeout(() => {
        setTodos(ps => ({ ...ps, notification: null }))
      }, 2000)
  }

   
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         React Crud
      </header>
      <div className="container">
         {
          todos.notification && <div className="alert mt-3 alert-success">
            <p className="text-center">
              { todos.notification }
          </p>
          </div>
         }
        <input
         type="text"
         placeholder="Add a new todo"
         name="todo"
         value={todos.newTodo}
         className="my-4 form-control"
          onChange={(event) => {
            const name = event.target.value
            setTodos(ps => ({...ps, newTodo: name}))
          } } 
         />
        <button 
        className="btn-info mb-3 form-control"
          onClick={(event) => todos.editing ? updateToDo(event) : addToDo(event)  }
          disabled={todos.newTodo.length < 5}
        >
          {todos.editing ? 'Update todo' : 'Add todo' }
        </button>
         {
           todos.loading && <img src={loadingGif} alt=''></img>
         }
        {(!todos.editing || todos.loading) && 
        
        <ul className="list-group">
             
            {todos.todos.map(x => {
            return <ListItem key={x.id} item={x} editToDo={editToDo} removeToDo={removeToDo} /> 
          })}
        </ul> }
      </div>
    </div>
  );
}

export default App;
