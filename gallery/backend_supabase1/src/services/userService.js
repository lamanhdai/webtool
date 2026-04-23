import bcrypt from 'bcryptjs';
import { getDb } from '../db/index.js';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123456';

export async function ensureDefaultAdmin() {
  const db = getDb();
  const { data: existing, error: existingError } = await db
    .from('users')
    .select('id')
    .eq('username', ADMIN_USERNAME)
    .maybeSingle();
  if (existingError) throw existingError;
  if (existing) return;

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const { error } = await db.from('users').insert({
    username: ADMIN_USERNAME,
    email: 'admin@local.dev',
    password_hash: passwordHash,
    points: 999999,
    is_admin: true,
  });
  if (error) throw error;
}

export async function createUser(username, email, password) {
  const db = getDb();
  const passwordHash = await bcrypt.hash(password, 12);
  const { data: existing, error: existingError } = await db
    .from('users')
    .select('username,email')
    .or(`username.eq.${username},email.eq.${email}`)
    .limit(1)
    .maybeSingle();
  if (existingError) throw existingError;

  if (existing?.username === username) {
    throw Object.assign(new Error('Username already exists'), { code: 'USERNAME_EXISTS' });
  }

  if (existing?.email === email) {
    throw Object.assign(new Error('Email already exists'), { code: 'EMAIL_EXISTS' });
  }

  const { data: inserted, error } = await db
    .from('users')
    .insert({
      username,
      email,
      password_hash: passwordHash,
      points: 5,
      is_admin: false,
    })
    .select('id,username,email,points,is_admin')
    .single();

  if (error) throw error;

  return {
    id: inserted.id,
    username: inserted.username,
    email: inserted.email,
    points: inserted.points,
    isAdmin: Boolean(inserted.is_admin),
  };
}

export async function verifyUserCredentials(username, password) {
  const db = getDb();
  const { data: user, error } = await db
    .from('users')
    .select('id,username,email,password_hash,points,is_admin')
    .eq('username', username)
    .maybeSingle();
  if (error) throw error;
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    points: user.points,
    isAdmin: Boolean(user.is_admin),
  };
}

export async function getUserById(userId) {
  const db = getDb();
  const { data: user, error } = await db
    .from('users')
    .select('id,username,email,points,is_admin')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    points: user.points,
    isAdmin: Boolean(user.is_admin),
  };
}

export async function getUnlockedImageIds(userId) {
  const db = getDb();
  const { data: rows, error } = await db.from('unlocked_images').select('image_id').eq('user_id', userId);
  if (error) throw error;
  return (rows || []).map((row) => row.image_id);
}

export async function changeUserPassword(userId, currentPassword, newPassword) {
  const db = getDb();
  const { data: user, error } = await db
    .from('users')
    .select('id,password_hash')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  if (!user) {
    return { ok: false, code: 'NOT_FOUND' };
  }

  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isCurrentPasswordValid) {
    return { ok: false, code: 'INVALID_CURRENT_PASSWORD' };
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 12);
  const { error: updateError } = await db
    .from('users')
    .update({ password_hash: newPasswordHash })
    .eq('id', userId);
  if (updateError) throw updateError;

  return { ok: true };
}
