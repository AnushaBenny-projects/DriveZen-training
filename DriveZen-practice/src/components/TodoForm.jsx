import { useState } from "react";

function TodoForm({ addTodo }) {
  const [task, setTask] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTask = task.trim();
    if (!trimmedTask) {
      return;
    }

    addTodo(trimmedTask);
    setTask("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        placeholder="Add a new task"
        aria-label="New todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
