const API_URL = "https://dummyjson.com";

export async function deleteTodoRequest(todo) {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  return response.json();
}
