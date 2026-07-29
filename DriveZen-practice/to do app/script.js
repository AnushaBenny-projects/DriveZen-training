// Get HTML elements

const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


let todos = [];


form.addEventListener("submit", function(event) {

    
    event.preventDefault();

  
    const task = taskInput.value.trim();

    if (task !== "") {
        
        todos.push(task);
        localStorage.setItem("todos", JSON.stringify(todos));

        const li = document.createElement("li");

     
        li.innerText = task;


        const deleteButton = document.createElement("button");

        deleteButton.innerText = "Delete";


    
        deleteButton.addEventListener("click", function() {

            li.remove();

        });



        li.appendChild(deleteButton);


  
        taskList.appendChild(li);


        taskInput.value = "";
    }

});
