import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


function App() {

  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  useEffect(() =>{
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(todoString);
      settodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  const handleedit = (e, id) =>{
    let t = todos.filter(i=>i.id === id) 
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    settodos(newTodos)
  }

  const handledelete = (e, id) =>{
    let newTodos = todos.filter(item=>{
      return item.id != id;
    })
    settodos(newTodos);
  }

  const handleadd = () =>{
    settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    settodo("");
  }

  const handleChange = (e) =>{
    settodo(e.target.value);
  }

  const handlecheckbox = (e) =>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
  }
  
  return (
      <>
      <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5
      bg-violet-100 min-h-[80vh]">
        <div className="addTodo">
          <h2 className='text-lg font-bold my-5'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2'/>
          <button onClick={handleadd} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>Save</button>
        </div>
        <h2 className='text-xl font-bold'> Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className = "m-5">No Todos To Display</div>}
          {todos.map(item=>{
            return <div key={item.id} className="todo flex w-1/2 justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handlecheckbox} type="checkbox" value={item.isCompleted}/>
                <div className={item.iscompleted?"line-through":""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleedit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
                <button onClick={(e)=>{handledelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
      </>
  )
}

export default App
