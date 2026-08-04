export async function getTodos(apiUrl) {
  const response = await fetch(`${apiUrl}/todos`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data = await response.json();
  return data.todos.slice(0, 10);
}
