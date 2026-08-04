import { useEffect, useState } from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle";

import useTheme from "./hooks/useTheme";

import "./App.css";

function App() {

  // API URL FROM .env
  const API_URL = import.meta.env.VITE_API_URL;

  // TODO STATE
  const [todos, setTodos] = useState([]);

  // CUSTOM THEME HOOK
  const { theme, toggleTheme } = useTheme();


  // GET TODOS
  useEffect(() => {

    fetch(`${API_URL}/todos`)
      .then((response) => response.json())
      .then((data) => {

        setTodos(data.todos.slice(0, 10));

      })
      .catch((error) => {

        console.log(error);

      });

  }, [API_URL]);


  // POST - ADD TODO
  function addTodo(task) {

    fetch(`${API_URL}/todos/add`, {

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

        setTodos((currentTodos) => [
          ...currentTodos,
          newTodo
        ]);

      })
      .catch((error) => {

        console.log(error);

      });

  }


  // PUT - COMPLETE TODO
  function completeTodo(todo) {

    fetch(`${API_URL}/todos/${todo.id}`, {

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

        setTodos((currentTodos) =>
          currentTodos.map((item) => {

            if (item.id === todo.id) {

              return {
                ...item,
                completed: true
              };

            }

            return item;

          })
        );

      })
      .catch((error) => {

        console.log(error);

      });

  }


  // PUT - EDIT TODO
  function editTodo(todo, newText) {

    if (newText.trim() === "") {
      return;
    }

    fetch(`${API_URL}/todos/${todo.id}`, {

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

        setTodos((currentTodos) =>
          currentTodos.map((item) => {

            if (item.id === todo.id) {

              return {
                ...item,
                todo: newText
              };

            }

            return item;

          })
        );

      })
      .catch((error) => {

        console.log(error);

      });

  }


  // DELETE TODO
  function deleteTodo(todo) {

    fetch(`${API_URL}/todos/${todo.id}`, {

      method: "DELETE"

    })
      .then((response) => response.json())

      .then(() => {

        setTodos((currentTodos) =>
          currentTodos.filter(
            (item) => item.id !== todo.id
          )
        );

      })
      .catch((error) => {

        console.log(error);

      });

  }


  return (

    <div className={`container ${theme}`}>

      {/* THEME BUTTON */}

      <ThemeToggle
        theme={theme}
        toggleTheme={toggleTheme}
      />


      <h1>Todo App</h1>


      {/* ADD TODO */}

      <TodoForm
        addTodo={addTodo}
      />



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
