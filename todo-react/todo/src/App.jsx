import { useEffect, useState } from "react";
import {
  deleteTodoRequest,
  getTodos,
  postTodo,
  putTodo
} from "./api/todos";
import AddTodo from "./components/AddTodo";
import AppHeader from "./components/AppHeader";
import DisplayTodos from "./components/DisplayTodos";
import useTheme from "./hooks/UseTheme";
import "./App.css";

function App() {

  const API_URL = import.meta.env.VITE_API_URL;
  const { theme, toggleTheme } = useTheme();
  const [todos, setTodos] = useState([]);

  useEffect(() => {

    async function fetchTodos() {

      try {
        const todoList = await getTodos(API_URL);
        setTodos(todoList);
      } catch (error) {
        console.log(error);
      }

    }

    fetchTodos();

  }, [API_URL]);

  async function addTodo(task) {

    try {
      const newTodo = await postTodo(API_URL, task);
      setTodos((currentTodos) => [...currentTodos, newTodo]);
    } catch (error) {
      console.log(error);
    }

  }

  async function completeTodo(todo) {

    const nextCompleted = !todo.completed;

    try {
      await putTodo(API_URL, todo, {
        completed: nextCompleted
      });

      setTodos((currentTodos) => (
        currentTodos.map((item) => {

          if (item.id === todo.id) {
            return {
              ...item,
              completed: nextCompleted
            };
          }

          return item;

        })
      ));
    } catch (error) {
      console.log(error);
    }

  }

  async function editTodo(todo, newText) {

    try {
      await putTodo(API_URL, todo, {
        todo: newText
      });

      setTodos((currentTodos) => (
        currentTodos.map((item) => {

          if (item.id === todo.id) {
            return {
              ...item,
              todo: newText
            };
          }

          return item;

        })
      ));
    } catch (error) {
      console.log(error);
    }

  }

  async function deleteTodo(todo) {

    try {
      await deleteTodoRequest(API_URL, todo);

      setTodos((currentTodos) => (
        currentTodos.filter((item) => item.id !== todo.id)
      ));
    } catch (error) {
      console.log(error);
    }

  }


  return (

    <div className={`app ${theme}`}>

      <div className="container">

        <AppHeader
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <AddTodo addTodo={addTodo} />

        <DisplayTodos
          todos={todos}
          completeTodo={completeTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />

      </div>

    </div>

  );

}

export default App;
