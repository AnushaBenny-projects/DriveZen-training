const API_URL = "https://dummyjson.com";

export async function putTodo(todo, changes) {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(changes)
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
}
