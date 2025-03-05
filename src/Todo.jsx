import { useEffect, useState } from "react";
import TodoCss from "./Todo.css";
function Todo() {
    const[value,setValue]=useState("")
    const[ctask,setCtask]=useState(0)
    const[rtask,setRtask]=useState(0)
    
    
    function handleValue(e){
        setValue(e.target.value)
    }

    let AllTask=JSON.parse(localStorage.getItem("Set_todo")) || [
      {task:"gitar",completed:false},
      {task:"mobile", completed:false},
      {task:"bike", completed:true}
  ] 

  const[todo,setTodo]=useState(AllTask)

    function changeSubmit(){
      if(value){
        setTodo([...todo,{task:value,completed:false}])
        setValue("")
      }     
    }
    function handlecheck(index){
        let MyNewArray=[...todo]
        MyNewArray[index].completed=!MyNewArray[index].completed
        setTodo(MyNewArray)
        let completedtask=MyNewArray.filter((value,index)=>{
            return value.completed
    })
    let ramainingtask= MyNewArray.filter((value,index)=>{
            return !value.completed
    })
        setCtask(completedtask.length)
        setRtask(ramainingtask.length)
    }
    function handleDelete(index){
      let myNewDelete = [...todo]
     let deleteIcon= myNewDelete.filter((value,id)=>{
        return index!=id

      })
      setTodo(deleteIcon)
    }
    function handleUpdate(index) {
      const myEdit = [...todo];  
      let newValue = myEdit[index].task;  
      let editValue = prompt(`Edit value: ${newValue}`, newValue);  
  
      if (editValue !== null) {  
          let newObj = { task: editValue, completed: false };  
          myEdit.splice(index, 1, newObj);  
          setTodo(myEdit);  
      }
  }
          useEffect(() => {
    let MyNewArray=[...todo]
    let completedtask=MyNewArray.filter((value,index)=>{
      return value.completed
})
let ramainingtask= MyNewArray.filter((value,index)=>{
      return !value.completed
})
  setCtask(completedtask.length)
  setRtask(ramainingtask.length)
       localStorage.setItem("Set_todo",JSON.stringify(MyNewArray))

  },[todo])
  
    return (  
        <>
        <div className="Todo"> 
        <div className="box">
        <h1 className="Todoheading">MY TODO APP</h1>
        <input type="text" 
                name="" 
                id="" 
                value={value}
                onChange={handleValue}
                className="todoinput"/>
       <input type="button" 
       value="Add Task here" 
       className="todobtn" 
       onClick={changeSubmit} />
<ul>
  {todo.map((value, index) => (
    <li key={index} className="list">
      <input 
        type="checkbox" 
        checked={value.completed} 
        onChange={() => handlecheck(index)}/>
      
      <span style={{textDecoration: value.completed ? "line-through" : "" }}>
        {value.task}
      </span>
      <span class="material-symbols-outlined delete_icon" 
          onClick={()=>{handleDelete(index)}}>
     delete
     </span>
     <span class="material-symbols-outlined edit_icon"
          onClick={()=>{handleUpdate(index)}}>
edit
</span>
      
    </li>
  ))}
</ul>
<span>Completed Task:-{ctask}</span><br></br>
<span>Remaining Task:-{rtask}</span>
        </div>
        </div>
        </>
    );
}

export default Todo;