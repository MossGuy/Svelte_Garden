import { db } from '$lib/server/test_database';

export async function load() {
  const [rows] = await db.query('SELECT * FROM items ORDER BY creation_date DESC');
  
  return {
    items: rows
  };
}