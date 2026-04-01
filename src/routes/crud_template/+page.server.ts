import type { RowDataPacket } from 'mysql2';
import { db } from '$lib/server/test_database.js';
import { fail, redirect } from '@sveltejs/kit';

interface Item extends RowDataPacket {
  item_id: number;
  item_name: string;
  item_description: string;
  creation_date: Date;
}

export async function load() {
  const [rows] = await db.query<Item[]>(
    'SELECT * FROM items ORDER BY creation_date DESC'
  );

  return { items: rows };
}


export const actions = {

  // CREATE
  create: async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('item_name_create') as string;
    const description = formData.get('item_description_create') as string;

    if (!name) {
      return fail(400, { error: 'Name is required' });
    }

    await db.query(
      'INSERT INTO items (item_name, item_description) VALUES (?, ?)',
      [name, description]
    );

    // refresh page
    throw redirect(303, '/crud_template');
  },


  // UPDATE
  update: async ({ request }) => {
    const formData = await request.formData();

    const id = formData.get('item_id_update');
    const name = formData.get('item_name_update');
    const description = formData.get('item_description_update');

    await db.query(
      'UPDATE items SET item_name = ?, item_description = ? WHERE item_id = ?',
      [name, description, id]
    );

    throw redirect(303, '/crud_template');
  },


  // DELETE
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('item_id');

    await db.query(
      'DELETE FROM items WHERE item_id = ?',
      [id]
    );

    throw redirect(303, '/crud_template');
  }

};