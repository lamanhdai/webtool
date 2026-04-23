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
    'INSERT INTO users (username, email, password_hash, points, is_admin) VALUES (?, ?, ?, ?, ?)',
    ADMIN_USERNAME,
    'admin@local.dev',
    passwordHash,
    999999,
    1,
  );
}

export async function createUser(username, email, password) {
  const db = getDb();
  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await db.get(
    'SELECT username, email FROM users WHERE username = ? OR email = ?',
    username,
    email,
  );

  if (existing?.username === username) {
    throw Object.assign(new Error('Username already exists'), { code: 'USERNAME_EXISTS' });
  }

  if (existing?.email === email) {
    throw Object.assign(new Error('Email already exists'), { code: 'EMAIL_EXISTS' });
  }
  const result = await db.run(
    'INSERT INTO users (username, email, password_hash, points, is_admin) VALUES (?, ?, ?, ?, ?)',
    username,
    email,
    passwordHash,
    5,
    0,
  );

  return db.get('SELECT id, username, email, points, is_admin as isAdmin FROM users WHERE id = ?', result.lastID);
}

export async function verifyUserCredentials(username, password) {
  const db = getDb();
  const user = await db.get(
    'SELECT id, username, email, password_hash, points, is_admin as isAdmin FROM users WHERE username = ?',
    username,
  );
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    points: user.points,
    isAdmin: Boolean(user.isAdmin),
  };
}

export async function getUserById(userId) {
  const db = getDb();
  const user = await db.get('SELECT id, username, email, points, is_admin as isAdmin FROM users WHERE id = ?', userId);
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

export async function changeUserPassword(userId, currentPassword, newPassword) {
  const db = getDb();
  const user = await db.get('SELECT id, password_hash FROM users WHERE id = ?', userId);
  if (!user) {
    return { ok: false, code: 'NOT_FOUND' };
  }

  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isCurrentPasswordValid) {
    return { ok: false, code: 'INVALID_CURRENT_PASSWORD' };
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 12);
  await db.run('UPDATE users SET password_hash = ? WHERE id = ?', newPasswordHash, userId);

  return { ok: true };
}
