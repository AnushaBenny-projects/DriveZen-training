import TodoList from "./TodoList";

function DisplayTodos({
  todos,
  completeTodo,
  editTodo,
  deleteTodo
}) {

  return (

    <TodoList
      todos={todos}
      completeTodo={completeTodo}
      editTodo={editTodo}
      deleteTodo={deleteTodo}
    />

  );

}

export default DisplayTodos;
