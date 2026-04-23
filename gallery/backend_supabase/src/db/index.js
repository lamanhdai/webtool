import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

let db;

const REQUIRED_TABLES = ['users', 'images', 'unlocked_images', 'image_likes', 'image_comments'];

async function assertSchemaReady(client) {
  for (const table of REQUIRED_TABLES) {
    const { error } = await client.from(table).select('id').limit(1);
    if (error?.code === 'PGRST205') {
      const setupError = new Error(
        `Supabase schema is missing table public.${table}. ` +
          'Run the SQL in gallery/backend_supabase/supabase/schema.sql, then restart the server.',
      );
      setupError.code = 'SUPABASE_SCHEMA_MISSING';
      setupError.details = { missingTable: table };
      throw setupError;
    }
    if (error) {
      throw error;
    }
  }
}

export async function initDb() {
  if (db) return db;

  db = createClient(env.supabase.url, env.supabase.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  await assertSchemaReady(db);

  return db;
}

export function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}
