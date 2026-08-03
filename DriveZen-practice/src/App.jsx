import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {

  const [todos, setTodos] = useState([]);

  // GET TODOS
  useEffect(() => {

    fetch("https://dummyjson.com/todos")
      .then((response) => response.json())
      .then((data) => {

        setTodos(data.todos.slice(0, 10));

      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


  // POST - ADD TODO
  function addTodo(task) {

    fetch("https://dummyjson.com/todos/add", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        todo: task,
        completed: false,
        userId: 1
      })

    })
      .then((response) => response.json())

      .then((newTodo) => {

        setTodos([...todos, newTodo]);

      })

      .catch((error) => {
        console.log(error);
      });

  }


  // PUT - COMPLETE TODO
  function completeTodo(todo) {

    fetch(`https://dummyjson.com/todos/${todo.id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        completed: true
      })

    })
      .then((response) => response.json())

      .then(() => {

        const updatedTodos = todos.map((item) => {

          if (item.id === todo.id) {

            return {
              ...item,
              completed: true
            };

          }

          return item;

        });

        setTodos(updatedTodos);

      });

  }


  // PUT - EDIT TODO
  function editTodo(todo, newText) {

    fetch(`https://dummyjson.com/todos/${todo.id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        todo: newText
      })

    })
      .then((response) => response.json())

      .then(() => {

        const updatedTodos = todos.map((item) => {

          if (item.id === todo.id) {

            return {
              ...item,
              todo: newText
            };

          }

          return item;

        });

        setTodos(updatedTodos);

      });

  }


  // DELETE TODO
  function deleteTodo(todo) {

    fetch(`https://dummyjson.com/todos/${todo.id}`, {

      method: "DELETE"

    })
      .then((response) => response.json())

      .then(() => {

        const updatedTodos = todos.filter(
          (item) => item.id !== todo.id
        );

        setTodos(updatedTodos);

      });

  }


  return (

    <div className="container">

      <h1>Todo App</h1>

      <TodoForm addTodo={addTodo} />

      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />

    </div>

  );

}

export default App;