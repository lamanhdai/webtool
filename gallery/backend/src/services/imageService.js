import { getDb } from '../db/index.js';
import { buildSignedImageUrl, fetchAllCloudinaryImages, placeholderDataUrl } from './cloudinaryService.js';

const PAGE_SIZE = 20;

const FILTERS = {
  dateAdded: 'i.created_at DESC',
  dateModified: 'i.updated_at DESC',
  mostLiked: 'i.likes_count DESC, i.created_at DESC',
  mostCommented: 'i.comments_count DESC, i.created_at DESC',
};

export async function syncImagesFromCloudinary() {
  const db = getDb();
  const cloudinaryImages = await fetchAllCloudinaryImages();

  await db.exec('BEGIN TRANSACTION');
  try {
    for (const image of cloudinaryImages) {
      await db.run(
        `INSERT INTO images (public_id, format, created_at, updated_at)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(public_id) DO UPDATE SET
           format=excluded.format,
           updated_at=excluded.updated_at`,
        image.public_id,
        image.format,
        image.created_at,
        image.updated_at,
      );
    }
    await db.exec('COMMIT');
  } catch (error) {
    await db.exec('ROLLBACK');
    throw error;
  }
}

function mapImageRow(row) {
  return {
    id: row.id,
    publicId: row.public_id,
    format: row.format,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    likes: row.likes_count,
    commentsCount: row.comments_count,
  };
}

export async function listImages({ page = 1, filter = 'dateAdded', userId = null }) {
  const db = getDb();
  const safePage = Math.max(1, Number(page) || 1);
  const offset = (safePage - 1) * PAGE_SIZE;
  const orderBy = FILTERS[filter] || FILTERS.dateAdded;

  const rows = await db.all(
    `SELECT i.*, CASE WHEN ui.id IS NULL THEN 0 ELSE 1 END AS unlocked
     FROM images i
     LEFT JOIN unlocked_images ui ON ui.image_id = i.id AND ui.user_id = ?
     ORDER BY ${orderBy}
     LIMIT ? OFFSET ?`,
    userId || -1,
    PAGE_SIZE,
    offset,
  );

  const totalRow = await db.get('SELECT COUNT(*) as total FROM images');
  const total = Number(totalRow?.total || 0);

  return {
    data: rows.map((row) => {
      const image = mapImageRow(row);
      const unlocked = Boolean(row.unlocked);
      return {
        id: image.id,
        format: image.format,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
        likes: image.likes,
        commentsCount: image.commentsCount,
        unlocked,
        locked: !unlocked,
        previewUrl: unlocked ? `/api/images/${image.id}/content` : placeholderDataUrl(),
      };
    }),
    page: safePage,
    pageSize: PAGE_SIZE,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}

export async function getImageById(imageId) {
  const db = getDb();
  const row = await db.get('SELECT * FROM images WHERE id = ?', imageId);
  if (!row) return null;
  return mapImageRow(row);
}

export async function isImageUnlockedByUser({ imageId, userId }) {
  const db = getDb();
  const row = await db.get('SELECT id FROM unlocked_images WHERE user_id = ? AND image_id = ?', userId, imageId);
  return Boolean(row);
}

export async function unlockImage({ imageId, userId }) {
  const db = getDb();

  await db.exec('BEGIN TRANSACTION');
  try {
    const user = await db.get('SELECT id, points, is_admin FROM users WHERE id = ?', userId);
    if (!user) {
      throw Object.assign(new Error('User not found'), { status: 404 });
    }

    const image = await db.get('SELECT id FROM images WHERE id = ?', imageId);
    if (!image) {
      throw Object.assign(new Error('Image not found'), { status: 404 });
    }

    const alreadyUnlocked = await db.get(
      'SELECT id FROM unlocked_images WHERE user_id = ? AND image_id = ?',
      userId,
      imageId,
    );

    if (alreadyUnlocked) {
      await db.exec('COMMIT');
      return { alreadyUnlocked: true, remainingPoints: user.points };
    }

    const isAdmin = Boolean(user.is_admin);
    if (!isAdmin && user.points < 1) {
      throw Object.assign(new Error('Not enough points'), { status: 400 });
    }

    if (!isAdmin) {
      await db.run('UPDATE users SET points = points - 1 WHERE id = ?', userId);
    }

    await db.run('INSERT INTO unlocked_images (user_id, image_id) VALUES (?, ?)', userId, imageId);

    const updatedUser = await db.get('SELECT points FROM users WHERE id = ?', userId);

    await db.exec('COMMIT');
    return { alreadyUnlocked: false, remainingPoints: updatedUser.points };
  } catch (error) {
    await db.exec('ROLLBACK');
    throw error;
  }
}

export async function likeImage({ imageId, userId }) {
  const db = getDb();
  await db.exec('BEGIN TRANSACTION');
  try {
    const unlocked = await db.get('SELECT id FROM unlocked_images WHERE user_id = ? AND image_id = ?', userId, imageId);
    if (!unlocked) {
      throw Object.assign(new Error('Unlock image before liking'), { status: 403 });
    }

    await db.run('INSERT OR IGNORE INTO image_likes (user_id, image_id) VALUES (?, ?)', userId, imageId);
    await db.run(
      `UPDATE images
       SET likes_count = (SELECT COUNT(*) FROM image_likes WHERE image_id = ?)
       WHERE id = ?`,
      imageId,
      imageId,
    );
    const row = await db.get('SELECT likes_count FROM images WHERE id = ?', imageId);
    await db.exec('COMMIT');
    return Number(row?.likes_count || 0);
  } catch (error) {
    await db.exec('ROLLBACK');
    throw error;
  }
}

export async function commentImage({ imageId, userId, content }) {
  const db = getDb();
  await db.exec('BEGIN TRANSACTION');
  try {
    const unlocked = await db.get('SELECT id FROM unlocked_images WHERE user_id = ? AND image_id = ?', userId, imageId);
    if (!unlocked) {
      throw Object.assign(new Error('Unlock image before commenting'), { status: 403 });
    }

    await db.run('INSERT INTO image_comments (user_id, image_id, content) VALUES (?, ?, ?)', userId, imageId, content);
    await db.run(
      `UPDATE images
       SET comments_count = (SELECT COUNT(*) FROM image_comments WHERE image_id = ?)
       WHERE id = ?`,
      imageId,
      imageId,
    );
    const row = await db.get('SELECT comments_count FROM images WHERE id = ?', imageId);
    await db.exec('COMMIT');
    return Number(row?.comments_count || 0);
  } catch (error) {
    await db.exec('ROLLBACK');
    throw error;
  }
}

export async function listComments(imageId) {
  const db = getDb();
  return db.all(
    `SELECT c.id, c.content, c.created_at as createdAt, u.username
     FROM image_comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.image_id = ?
     ORDER BY c.created_at DESC
     LIMIT 20`,
    imageId,
  );
}

export async function getProtectedImageUrl({ imageId, userId }) {
  const image = await getImageById(imageId);
  if (!image) {
    throw Object.assign(new Error('Image not found'), { status: 404 });
  }

  const unlocked = await isImageUnlockedByUser({ imageId, userId });
  if (!unlocked) {
    throw Object.assign(new Error('Image is locked'), { status: 403 });
  }

  return buildSignedImageUrl(image.publicId, image.format);
}
