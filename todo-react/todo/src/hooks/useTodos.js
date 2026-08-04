import { useEffect, useState } from "react";
import {
  deleteTodoRequest,
  getTodos,
  postTodo,
  putTodo
} from "../api/todos";

function useTodos(apiUrl) {

  const [todos, setTodos] = useState([]);

  useEffect(() => {

    async function fetchTodos() {

      try {
        const todoList = await getTodos(apiUrl);
        setTodos(todoList);
      } catch (error) {
        console.log(error);
      }

    }

    fetchTodos();

  }, [apiUrl]);

  async function addTodo(task) {

    try {
      const newTodo = await postTodo(apiUrl, task);
      setTodos((currentTodos) => [...currentTodos, newTodo]);
    } catch (error) {
      console.log(error);
    }

  }

  async function completeTodo(todo) {

    const nextCompleted = !todo.completed;

    try {
      await putTodo(apiUrl, todo, {
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
      await putTodo(apiUrl, todo, {
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
      await deleteTodoRequest(apiUrl, todo);

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
