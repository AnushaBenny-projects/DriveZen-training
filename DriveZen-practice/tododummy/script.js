const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const refreshBtn = document.getElementById("refreshBtn");
const taskList = document.getElementById("taskList");

// GET TODOS
function getTodos() {

    taskList.innerHTML = "";

    fetch("https://dummyjson.com/todos")
        .then((response) => response.json())
        .then((data) => {

            data.todos.slice(0,10).forEach((todo) => {

                displayTodo(todo);

            });

        })
        .catch((error) => console.log(error));

}

// DISPLAY TODO
function displayTodo(todo){

    const li = document.createElement("li");

    const text = document.createElement("span");

    text.innerText = todo.todo;

    if(todo.completed){
        text.style.textDecoration="line-through";
    }

    // COMPLETE BUTTON

    const completeBtn = document.createElement("button");

    completeBtn.innerText="✔ Complete";

    completeBtn.classList.add("complete-btn");

    completeBtn.addEventListener("click",()=>{

        fetch(`https://dummyjson.com/todos/${todo.id}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                completed:true
            })

        })

        .then((response)=>response.json())

        .then(()=>{

            text.style.textDecoration="line-through";

        });

    });

    // DELETE BUTTON

    const deleteBtn=document.createElement("button");

    deleteBtn.innerText="🗑 Delete";

    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click",()=>{

        fetch(`https://dummyjson.com/todos/${todo.id}`,{

            method:"DELETE"

        })

        .then((response)=>response.json())

        .then(()=>{

            li.remove();

        });

    });

    li.appendChild(text);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

}

// POST TODO

addBtn.addEventListener("click",()=>{

    const task=taskInput.value.trim();

    if(task===""){
        alert("Please enter a task");
        return;
    }

    fetch("https://dummyjson.com/todos/add",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            todo:task,

            completed:false,

            userId:1

        })

    })

    .then((response)=>response.json())

    .then((newTodo)=>{

        displayTodo(newTodo);

        taskInput.value="";

    })

    .catch((error)=>console.log(error));

});

// REFRESH BUTTON

refreshBtn.addEventListener("click",()=>{

    getTodos();

});

// INITIAL LOAD

getTodos();
