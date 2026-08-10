import 'dotenv/config';
import express from "express";
import cors from "cors";
import { Client } from "pg";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 4000);
const HOST = process.env.HOST || "127.0.0.1";

// DATABASE_URL example: postgres://user:password@localhost:5432/todosdb
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/todosdb";

// Prefer explicit DATABASE_URL env var or fallback
const client = new Client({ connectionString: DATABASE_URL });

async function ensureTable() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      todo TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false,
      userId INTEGER
    );
  `);
}

app.get("/", (req, res) => {
  res.send(`<!doctype html>
    <html>
      <head><title>Todo Backend</title></head>
      <body>
        <h1>Todo backend is running.</h1>
        <p>Use <code>GET /todos</code> to fetch data.</p>
        <p>Frontend dev server: <a href="http://localhost:5173/">http://localhost:5173/</a></p>
      </body>
    </html>`);
});

app.get("/todos", async (req, res) => {
  try {
    const result = await client.query("SELECT id, todo, completed, userid FROM todos ORDER BY id");
    // map column names to lowercase
    const todos = result.rows.map((r) => ({ id: r.id, todo: r.todo, completed: r.completed, userId: r.userid }));
    res.json({ todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.post("/todos/add", async (req, res) => {
  const { todo, completed = false, userId = 1 } = req.body;
  if (typeof todo !== "string" || !todo.trim()) {
    return res.status(400).json({ error: "Invalid todo text" });
  }

  try {
    const result = await client.query(
      "INSERT INTO todos (todo, completed, userId) VALUES ($1, $2, $3) RETURNING id, todo, completed, userid",
      [todo.trim(), completed, userId]
    );
    const row = result.rows[0];
    res.status(201).json({ id: row.id, todo: row.todo, completed: row.completed, userId: row.userid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add todo" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid todo id" });

  const fields = [];
  const values = [];
  let idx = 1;

  if (req.body.todo !== undefined) {
    fields.push(`todo = $${idx++}`);
    values.push(req.body.todo);
  }
  if (req.body.completed !== undefined) {
    fields.push(`completed = $${idx++}`);
    values.push(req.body.completed);
  }
  if (req.body.userId !== undefined) {
    fields.push(`userId = $${idx++}`);
    values.push(req.body.userId);
  }

  if (fields.length === 0) return res.status(400).json({ error: "No changes provided" });

  values.push(id);
  const sql = `UPDATE todos SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, todo, completed, userid`;

  try {
    const result = await client.query(sql, values);
    if (result.rowCount === 0) return res.status(404).json({ error: "Todo not found" });
    const row = result.rows[0];
    res.json({ id: row.id, todo: row.todo, completed: row.completed, userId: row.userid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid todo id" });

  try {
    const result = await client.query("DELETE FROM todos WHERE id = $1", [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Todo not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

async function start() {
  try {
    await client.connect();
    await ensureTable();
    app.listen(PORT, HOST, () => {
      console.log(`Todo backend listening on http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
