export async function deleteTodoRequest(apiUrl, todo) {
  const response = await fetch(`${apiUrl}/todos/${todo.id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  return response.json();
}
