const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let todos = [];

fetch("https://dummyjson.com/todos")
  .then((res) => res.json())
  .then((data) => {
    todos = data.todos.slice(0, 10);
    displayTodos();
  })
  .catch((err) => console.log(err));

// Display all todos
function displayTodos() {

  taskList.innerHTML = "";

  todos.forEach((todo) => {

    const li = document.createElement("li");

    const text = document.createElement("span");
    text.innerText = todo.todo;

    if (todo.completed) {
      text.style.textDecoration = "line-through";
    }

    // Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✔ Complete";
    completeBtn.classList.add("completeBtn");

    completeBtn.addEventListener("click", () => {
      todo.completed = true;
      displayTodos();
    });

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerText = "✏ Edit";
     editBtn.classList.add("editBtn");

    editBtn.addEventListener("click", () => {

      const updatedTask = prompt("Edit Todo", todo.todo);

      if (updatedTask && updatedTask.trim() !== "") {
        todo.todo = updatedTask.trim();
        displayTodos();
      }

    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑 Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => {
       alert("Are you sure you want to delete this todo");
      todos = todos.filter((t) => t.id !== todo.id);

      displayTodos();

    });

    li.appendChild(text);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

  });

}

// Add Todo
addBtn.addEventListener("click", () => {

  const task = taskInput.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  const newTodo = {
    id: Date.now(),
    todo: task,
    completed: false,
  };

  todos.push(newTodo);

  taskInput.value = "";

  displayTodos();

});
