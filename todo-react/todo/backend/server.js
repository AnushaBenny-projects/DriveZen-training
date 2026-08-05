import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "..", "todos.json");

async function loadTodos() {
  try {
    const file = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    console.error("Failed to load todos:", error);
    return [];
  }
}

async function saveTodos(todos) {
  await fs.writeFile(DATA_PATH, JSON.stringify(todos, null, 2));
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    `<!doctype html>
    <html>
      <head><title>Todo Backend</title></head>
      <body>
        <h1>Todo backend is running.</h1>
        <p>Use <code>GET /todos</code> to fetch data.</p>
        <p>Open the frontend at <a href="http://localhost:5175/">http://localhost:5175/</a></p>
      </body>
    </html>`
  );
});

app.get("/todos", async (req, res) => {
  const todos = await loadTodos();
  res.json({ todos });
});

app.post("/todos/add", async (req, res) => {
  const { todo, completed = false, userId = 1 } = req.body;

  if (typeof todo !== "string" || !todo.trim()) {
    return res.status(400).json({ error: "Invalid todo text" });
  }

  const todos = await loadTodos();
  const nextId = todos.length ? Math.max(...todos.map((item) => item.id)) + 1 : 1;
  const newTodo = {
    id: nextId,
    todo: todo.trim(),
    completed,
    userId
  };

  todos.push(newTodo);
  await saveTodos(todos);

  res.status(201).json(newTodo);
});

app.put("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid todo id" });
  }

  const todos = await loadTodos();
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos[index] = {
    ...todos[index],
    ...req.body
  };

  await saveTodos(todos);
  res.json(todos[index]);
});

app.delete("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid todo id" });
  }

  const todos = await loadTodos();
  const filtered = todos.filter((item) => item.id !== id);

  if (filtered.length === todos.length) {
    return res.status(404).json({ error: "Todo not found" });
  }

  await saveTodos(filtered);
  res.json({ success: true });
});

const PORT = Number(process.env.PORT || 4000);
const HOST = process.env.HOST || "127.0.0.1";

const server = app.listen(PORT, HOST, () => {
  console.log(`Todo backend listening on http://${HOST}:${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Set PORT to a free port and restart the backend.`);
    process.exit(1);
  }

  console.error("Server error:", error);
  process.exit(1);
});
