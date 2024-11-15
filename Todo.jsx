import { useEffect, useRef, useState } from "react";
import TodoCss from "./todo.module.css"
import toast from "react-hot-toast";
import { FormControlLabel, styled, Switch } from "@mui/material";


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

function Todo() {

    const [task,setTask] = useState("")
    const [Ctask,setCtask] =useState(0)
    const [Rtask,setRtask] =useState(0)
    const [TotalTask,setTotaltask] =useState(0)

    const AllTask = JSON.parse(localStorage.getItem("todo")) || [
        {taskName:"Buy Car", complete:true},
        {taskName:"Buy Guitar", complete:false},
        {taskName:"Buy Phone", complete:true}

    ]

    const [todo,setTodo] = useState(AllTask)

  

    function handleForm(e){
        e.preventDefault()
        console.log(task)
      
    }

    function handleTask(e){
        setTask(e.target.value)
    }

    function addTask(){
        if(task){
        setTodo([...todo,{taskName:task,complete:false}])
        }
        setTask('')
        toast.success("Task Added...",{
            style:{
                marginTop:"30px"
            }
        })
    }

    function handleChecked(id){
        const myArray = [...todo]
        myArray[id].complete =! myArray[id].complete
        setTodo(myArray)

        const completeTask = myArray.filter((value,index)=>{
           return value.complete
        })

        setCtask(completeTask.length)

        const remainingTask = myArray.filter((value,index)=>{
           return ! value.complete
        })

        setRtask(remainingTask.length)

        const totaltasks = myArray.filter((value,index)=>{
            return value
        })

        setTotaltask(totaltasks.length)

    }

    function handleDelete(id){
        const ArrayDelete = [...todo]
        const deleteArray = ArrayDelete.filter((value,index)=>{
            return id !== index
        })

        setTodo(deleteArray)
        toast.error("Task Delete...",{
            duration:1000,
            style:{
                marginTop:"30px"
            }
        })
    }

    function handleUpdate(id){
        const arrayUpdate = [...todo]
        const updateValue = arrayUpdate[id]
        let promptValue = prompt(`Edit value :-  ${updateValue.taskName}`,updateValue.taskName)

        if(promptValue){
            let newValue = {taskName:promptValue,complete:false}
            arrayUpdate.splice(id,1,newValue)
            setTodo(arrayUpdate)
        }

       
    }

    useEffect(()=>{
        const myArray = [...todo]
        const completeTask = myArray.filter((value,index)=>{
            return value.complete
         })
 
         setCtask(completeTask.length)
 
         const remainingTask = myArray.filter((value,index)=>{
            return ! value.complete
         })
         setRtask(remainingTask.length)
 
         const totaltasks = myArray.filter((value,index)=>{
             return value
         })
 
         setTotaltask(totaltasks.length)

         localStorage.setItem("todo",JSON.stringify(myArray))

         
    },[todo])

   const useDark = useRef("")

   function handelDarkmode(){
    
    let darkmode = useDark.current.style.backgroundColor
    if(darkmode==="white"){
        useDark.current.style.backgroundColor = "black"
        useDark.current.style.color = "white"
    }else{
        useDark.current.style.backgroundColor = "white"
        useDark.current.style.color = "black"
    }
    
    
   }

    return ( 
        <>



        
        <h4 style={{textAlign:"center"}}>Total Task:- {TotalTask} </h4>
        <FormControlLabel
        style={{textAlign:"center"}}
        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
        label="Dark Mode"
        onClick={handelDarkmode}
      />
            <div className={TodoCss.todo } ref={useDark}>

            
            
                <div className={TodoCss.main} >
                <h1>My Todo App 🙂</h1>
                <div >
                <form className="d-flex" onSubmit={handleForm}>
                <input type="text" className="form-control"
                    value={task}
                    onChange={handleTask}
                />
                <button type="submit" className="form-control btn btn-success w-50 ms-1 " onClick={addTask}>Add Task</button>
                </form>
                <div className={TodoCss.task}>
                {

                    todo.map((value,index)=>(
                        <ul className={TodoCss.list} key={index}>
                           <span><li><input type="checkbox" checked={value.complete}
                           onClick={()=>{handleChecked(index)}}
                            /> <span style={{textDecoration:value.complete ? "line-through" : ""}}>{value.taskName}</span> <i className="bi bi-trash3-fill float-end text-info" onClick={()=>{handleDelete(index)}}></i> <i className="bi bi-pencil-square float-end me-3 text-warning"
                                onClick={()=>{handleUpdate(index)}}
                            ></i> </li></span>
                        </ul>
                        
                    ))
                }
                </div>
                <span>
                    <p>Completed Task :- {Ctask}</p>
                    <p>Remaining Task :- {Rtask}</p>
                </span>
                </div>
                
                </div>
            </div>
            
        </>
     );
}

export default Todo;