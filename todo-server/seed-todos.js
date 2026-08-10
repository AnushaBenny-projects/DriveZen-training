import { Client } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/todosdb';
const client = new Client({ connectionString: DATABASE_URL });

async function seed() {
  try {
    await client.connect();
    await client.query(`DELETE FROM todos`);
    console.log('Cleared all todos');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await client.end();
  }
}

seed();
