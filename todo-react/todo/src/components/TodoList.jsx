import TodoItem from "./TodoItem";

function TodoList({
  todos,
  completeTodo,
  editTodo,
  deleteTodo
}) {

  return (

    <div>

      {todos.map((todo) => (

        <TodoItem
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />

      ))}

    </div>

  );

}

export default TodoList;
