const API_URL = "https://dummyjson.com";

export async function getTodos() {
  const response = await fetch(`${API_URL}/todos`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data = await response.json();
  return data.todos.slice(0, 10);
}
