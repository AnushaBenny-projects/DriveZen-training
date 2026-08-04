import { useState } from "react";

function TodoItem({
  todo,
  completeTodo,
  editTodo,
  deleteTodo
}) {

  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);

  function handleSave() {

    const trimmedText = editText.trim();

    if (trimmedText === "") {
      return;
    }

    editTodo(todo, trimmedText);
    setEditing(false);

  }

  function handleCancel() {
    setEditText(todo.todo);
    setEditing(false);
  }

  return (

    <div className="todo">

      {editing ? (

        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />

      ) : (

        <span className={todo.completed ? "completed" : ""}>
          {todo.todo}
        </span>

      )}

      <button
        className="completeBtn"
        onClick={() => completeTodo(todo)}
      >
        {todo.completed ? "Undo" : "Complete"}
      </button>

      {editing ? (

        <>
          <button
            className="editBtn"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            className="deleteBtn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>

      ) : (

        <button
          className="editBtn"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>

      )}

      <button
        className="deleteBtn"
        onClick={() => deleteTodo(todo)}
      >
        Delete
      </button>

    </div>

  );

}

export default TodoItem;
