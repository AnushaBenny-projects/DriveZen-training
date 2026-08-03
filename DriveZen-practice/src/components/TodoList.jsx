import TodoItem from "./TodoItem";

function TodoList({ todos, completeTodo, editTodo, deleteTodo }) {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet. Add one above.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
