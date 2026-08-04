import { useState } from "react";

function TodoForm({ addTodo }) {

  const [task, setTask] = useState("");

  function handleAdd() {

    const trimmedTask = task.trim();

    if (trimmedTask === "") {
      alert("Please enter a task");
      return;
    }

    addTodo(trimmedTask);
    setTask("");

  }

  return (

    <div className="inputBox">

      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button
        className="addBtn"
        onClick={handleAdd}
      >
        Add Todo
      </button>

    </div>

  );

}

export default TodoForm;
