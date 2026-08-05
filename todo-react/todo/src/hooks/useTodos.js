import { useEffect, useState } from "react";
import {
  deleteTodoRequest,
  getTodos,
  postTodo,
  putTodo
} from "../api/todos";

function useTodos(apiUrl) {

  const [todos, setTodos] = useState([]);

  async function reloadTodos() {
    try {
      const todoList = await getTodos(apiUrl);
      setTodos(todoList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    reloadTodos();
  }, [apiUrl]);

  async function addTodo(task) {
    try {
      await postTodo(apiUrl, task);
      await reloadTodos();
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
      await reloadTodos();
    } catch (error) {
      console.log(error);
    }

  }

  async function editTodo(todo, newText) {

    try {
      await putTodo(apiUrl, todo, {
        todo: newText
      });
      await reloadTodos();
    } catch (error) {
      console.log(error);
    }

  }

  async function deleteTodo(todo) {

    try {
      await deleteTodoRequest(apiUrl, todo);
      await reloadTodos();
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
