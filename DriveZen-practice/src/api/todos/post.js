const API_URL = "https://dummyjson.com";

export async function postTodo(task) {
  const response = await fetch(`${API_URL}/todos/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      todo: task,
      completed: false,
      userId: 1
    })
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }

  return response.json();
}
