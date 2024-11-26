import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState([])
  console.log(todo)

  const handleDeleteTask = (id) => {
      setTodo(todo.filter((task) => task.id !== id))
  }

  // task [{taskname: 'taskdesc' , id: '453543', isDone: false}]

  const handleStatus = (id) => {
    setTodo(todo.map((task) =>  task.id === id ? { ...task, isDone: !task.isDone } : task))
  }

  return (
    <div className='app'>
      <Datas setTodo={setTodo}/>
      <Content todos={todo} handleDeleteTask={handleDeleteTask} handleStatus={handleStatus} />
    </div>
  )
}

export default App


const Datas = ({setTodo}) => {
  const [data, setData] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {taskName : data, id:Date.now(), isDone:false}
    if (data !== '') {

      setTodo((prev) => [...prev , task])
    }
    setData('');
  }

  return  (
  <form className='datas' onSubmit={handleSubmit}>
    <input
      type="text"
      className='input-data'
      value={data}
      onChange={(e) => setData(e.target.value)}
    />
    <button className='btn'>+</button>
  </form>
  )
}

const Content = ({todos, handleDeleteTask, handleStatus }) => {
  return (
    <>
      {todos.length > 0 && <div className='contents'>
        <p>Task to do</p>
        <ul className="list-items">
          {todos.map( (todo,index) =>
          <li key={index} className='list-item'>
            <span className='checkedbox'>
              <input type="checkbox" className='chekbox' checked={todo.isDone} onChange={() => handleStatus(todo.id)} />
            </span>
            <span style={todo.isDone ? {textDecoration: "line-through"} : {textDecoration: "none"}} >
              {todo.taskName}
            </span>
            <span className='del' onClick={() => handleDeleteTask(todo.id)}>
              <i class="fa-solid fa-trash"></i>
            </span>
          </li>)}
        </ul>
      </div>}
    </>
  )

}


// Design Link : https://www.figma.com/community/file/1348652218299666548/todo-app
