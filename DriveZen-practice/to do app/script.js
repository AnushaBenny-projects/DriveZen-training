const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to display todos
function renderTodos() {
    taskList.innerHTML = "";

    todos.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", function () {
            todos.splice(index, 1); // Remove from array
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos();
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Show saved todos when page loads
renderTodos();

// Add new todo
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = taskInput.value.trim();

    if (task !== "") {
        todos.push(task);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
        taskInput.value = "";
    }
});
