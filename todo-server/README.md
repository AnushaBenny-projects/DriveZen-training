# Todo Server with PostgreSQL

This backend stores todos in PostgreSQL using the `pg` client.

## Setup

1. Install dependencies:

```bash
cd todo-server
npm install
```

2. Create a PostgreSQL database, for example:

```sql
CREATE DATABASE todosdb;
```

3. Copy `.env.example` to `.env` and update credentials as needed.

4. Start the server:

```bash
npm start
```

## Environment variables

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: server port (default `4000`)
- `HOST`: server host (default `127.0.0.1`)

## API routes

- `GET /todos`
- `POST /todos/add`
- `PUT /todos/:id`
- `DELETE /todos/:id`
