import bcrypt from 'bcryptjs';
import { getDb } from '../db/index.js';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123456';

export async function ensureDefaultAdmin() {
  const db = getDb();
  const existing = await db.get('SELECT id FROM users WHERE username = ?', ADMIN_USERNAME);
  if (existing) return;

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await db.run(
    'INSERT INTO users (username, password_hash, points, is_admin) VALUES (?, ?, ?, ?)',
    ADMIN_USERNAME,
    passwordHash,
    999999,
    1,
  );
}

export async function createUser(username, password) {
  const db = getDb();
  const passwordHash = await bcrypt.hash(password, 12);

  const result = await db.run(
    'INSERT INTO users (username, password_hash, points, is_admin) VALUES (?, ?, ?, ?)',
    username,
    passwordHash,
    5,
    0,
  );

  return db.get('SELECT id, username, points, is_admin as isAdmin FROM users WHERE id = ?', result.lastID);
}

export async function verifyUserCredentials(username, password) {
  const db = getDb();
  const user = await db.get('SELECT id, username, password_hash, points, is_admin as isAdmin FROM users WHERE username = ?', username);
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;

  return {
    id: user.id,
    username: user.username,
    points: user.points,
    isAdmin: Boolean(user.isAdmin),
  };
}

export async function getUserById(userId) {
  const db = getDb();
  const user = await db.get('SELECT id, username, points, is_admin as isAdmin FROM users WHERE id = ?', userId);
  if (!user) return null;
  return {
    ...user,
    isAdmin: Boolean(user.isAdmin),
  };
}

export async function getUnlockedImageIds(userId) {
  const db = getDb();
  const rows = await db.all(
    `SELECT image_id as imageId
     FROM unlocked_images
     WHERE user_id = ?`,
    userId,
  );
  return rows.map((row) => row.imageId);
}
