import fs from 'node:fs';
import path from 'node:path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { env } from '../config/env.js';

let db;

export async function initDb() {
  if (db) return db;

  const dbPath = path.resolve(process.cwd(), env.databasePath);
  const dir = path.dirname(dbPath);
  fs.mkdirSync(dir, { recursive: true });

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec('PRAGMA foreign_keys = ON;');

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE,
      password_hash TEXT NOT NULL,
      points INTEGER NOT NULL DEFAULT 5,
      is_admin INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      public_id TEXT UNIQUE NOT NULL,
      format TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      likes_count INTEGER NOT NULL DEFAULT 0,
      comments_count INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS unlocked_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      image_id INTEGER NOT NULL,
      unlocked_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, image_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS image_likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      image_id INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, image_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS image_comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      image_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at);
    CREATE INDEX IF NOT EXISTS idx_images_updated_at ON images(updated_at);
    CREATE INDEX IF NOT EXISTS idx_images_likes_count ON images(likes_count);
    CREATE INDEX IF NOT EXISTS idx_images_comments_count ON images(comments_count);
    CREATE INDEX IF NOT EXISTS idx_unlocked_user_image ON unlocked_images(user_id, image_id);
    CREATE INDEX IF NOT EXISTS idx_image_comments_image_id ON image_comments(image_id);
    CREATE INDEX IF NOT EXISTS idx_image_likes_image_id ON image_likes(image_id);
  `);

  const userColumns = await db.all('PRAGMA table_info(users)');
  const hasEmailColumn = userColumns.some((col) => col.name === 'email');
  if (!hasEmailColumn) {
    await db.exec('ALTER TABLE users ADD COLUMN email TEXT');
  }

  await db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email)');
  await db.exec("UPDATE users SET email = username || '@local.dev' WHERE email IS NULL OR TRIM(email) = ''");
 

  return db;
}

export function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}
