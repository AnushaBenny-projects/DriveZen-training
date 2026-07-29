const taskList = document.getElementById("taskList");

fetch("https://dummyjson.com/todos")
  .then((response) => response.json())
  .then((data) => {

    data.todos.forEach((todo) => {

      const li = document.createElement("li");
      li.innerText = todo.todo;

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";

      deleteBtn.addEventListener("click", () => {
        li.remove();
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);

    });

  })
  .catch((error) => {
    console.log(error);
  });