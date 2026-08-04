import { useEffect, useState } from "react";
import {
  deleteTodoRequest,
  getTodos,
  postTodo,
  putTodo
} from "../api/todos";

function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const todoList = await getTodos();
        setTodos(todoList);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTodos();
  }, []);

  async function addTodo(task) {
    try {
      const newTodo = await postTodo(task);
      setTodos((currentTodos) => [...currentTodos, newTodo]);
    } catch (error) {
      console.log(error);
    }
  }

  async function completeTodo(todo) {
    const nextCompleted = !todo.completed;

    try {
      await putTodo(todo, {
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
      await putTodo(todo, {
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
      await deleteTodoRequest(todo);

      setTodos((currentTodos) => (
        currentTodos.filter((item) => item.id !== todo.id)
      ));
    } catch (error) {
      console.log(error);
    }
  }

  return {
    todos,
    addTodo,
    completeTodo,
    editTodo,
    deleteTodo
  };
}

export default useTodos;
