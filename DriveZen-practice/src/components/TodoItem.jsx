import { useState } from "react";

function TodoItem({ todo, completeTodo, editTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);

  function handleSave(event) {
    event.preventDefault();

    const trimmedText = editText.trim();
    if (!trimmedText) {
      return;
    }

    editTodo(todo, trimmedText);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.todo);
    setIsEditing(false);
  }

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSave}>
          <input
            type="text"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            aria-label="Edit todo"
          />
          <button type="submit">Save</button>
          <button type="button" className="secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <label className="todo-label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => completeTodo(todo)}
            />
            <span>{todo.todo}</span>
          </label>
          <div className="todo-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="danger"
              onClick={() => deleteTodo(todo)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
