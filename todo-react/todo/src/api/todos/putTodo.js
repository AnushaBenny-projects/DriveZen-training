export async function putTodo(apiUrl, todo, changes) {
  const response = await fetch(`${apiUrl}/todos/${todo.id}`, {
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
