import { getDb } from '../db/index.js';
import { buildSignedImageUrl, fetchAllCloudinaryImages, placeholderDataUrl } from './cloudinaryService.js';

const PAGE_SIZE = 20;

const FILTERS = {
  dateAdded: { column: 'created_at', ascending: false },
  dateModified: { column: 'updated_at', ascending: false },
  mostLiked: { column: 'likes_count', ascending: false },
  mostCommented: { column: 'comments_count', ascending: false },
};

function mapImageRow(row) {
  return {
    id: row.id,
    publicId: row.public_id,
    format: row.format,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    likes: Number(row.likes_count || 0),
    commentsCount: Number(row.comments_count || 0),
  };
}

export async function syncImagesFromCloudinary() {
  const db = getDb();
  const cloudinaryImages = await fetchAllCloudinaryImages();

  for (const image of cloudinaryImages) {
    const payload = {
      public_id: image.public_id,
      format: image.format,
      created_at: image.created_at,
      updated_at: image.updated_at,
    };

    const { data: existing, error: existingError } = await db
      .from('images')
      .select('id')
      .eq('public_id', image.public_id)
      .maybeSingle();
    if (existingError) throw existingError;

    if (existing) {
      const { error: updateError } = await db.from('images').update(payload).eq('id', existing.id);
      if (updateError) throw updateError;
      continue;
    }

    const { error: insertError } = await db.from('images').insert(payload);
    if (insertError) throw insertError;
  }
}

export async function listImages({ page = 1, filter = 'dateAdded', userId = null }) {
  const db = getDb();
  const safePage = Math.max(1, Number(page) || 1);
  const offset = (safePage - 1) * PAGE_SIZE;
  const sort = FILTERS[filter] || FILTERS.dateAdded;

  const { data: rows, error } = await db
    .from('images')
    .select('id,public_id,format,created_at,updated_at,likes_count,comments_count')
    .order(sort.column, { ascending: sort.ascending })
    .range(offset, offset + PAGE_SIZE - 1);
  if (error) throw error;

  const { count, error: countError } = await db.from('images').select('*', { count: 'exact', head: true });
  if (countError) throw countError;
  const total = Number(count || 0);

  const ids = (rows || []).map((row) => row.id);
  let unlockedSet = new Set();
  if (userId && ids.length > 0) {
    const { data: unlockedRows, error: unlockedError } = await db
      .from('unlocked_images')
      .select('image_id')
      .eq('user_id', userId)
      .in('image_id', ids);
    if (unlockedError) throw unlockedError;
    unlockedSet = new Set((unlockedRows || []).map((row) => row.image_id));
  }

  return {
    data: (rows || []).map((row) => {
      const image = mapImageRow(row);
      const unlocked = userId ? unlockedSet.has(image.id) : false;
      const imageUrl = unlocked ? buildSignedImageUrl(image.publicId, image.format) : placeholderDataUrl();
      return {
        id: image.id,
        format: image.format,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
        likes: image.likes,
        commentsCount: image.commentsCount,
        unlocked,
        locked: !unlocked,
        previewUrl: imageUrl,
        imageUrl,
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
  const { data: row, error } = await db.from('images').select('*').eq('id', imageId).maybeSingle();
  if (error) throw error;
  if (!row) return null;
  return mapImageRow(row);
}

export async function isImageUnlockedByUser({ imageId, userId }) {
  const db = getDb();
  const { data, error } = await db
    .from('unlocked_images')
    .select('id')
    .eq('user_id', userId)
    .eq('image_id', imageId)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function unlockImage({ imageId, userId }) {
  const db = getDb();

  const { data: user, error: userError } = await db
    .from('users')
    .select('id,points,is_admin')
    .eq('id', userId)
    .maybeSingle();
  if (userError) throw userError;
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });

  const { data: image, error: imageError } = await db.from('images').select('id').eq('id', imageId).maybeSingle();
  if (imageError) throw imageError;
  if (!image) throw Object.assign(new Error('Image not found'), { status: 404 });

  const { data: unlocked, error: unlockedError } = await db
    .from('unlocked_images')
    .select('id')
    .eq('user_id', userId)
    .eq('image_id', imageId)
    .maybeSingle();
  if (unlockedError) throw unlockedError;

  if (unlocked) {
    return { alreadyUnlocked: true, remainingPoints: Number(user.points || 0) };
  }

  const isAdmin = Boolean(user.is_admin);
  const currentPoints = Number(user.points || 0);
  if (!isAdmin && currentPoints < 1) {
    throw Object.assign(new Error('Not enough points'), { status: 400 });
  }

  if (!isAdmin) {
    const { error: pointsError } = await db.from('users').update({ points: currentPoints - 1 }).eq('id', userId);
    if (pointsError) throw pointsError;
  }

  const { error: insertError } = await db.from('unlocked_images').insert({ user_id: userId, image_id: imageId });
  if (insertError) throw insertError;

  const remainingPoints = isAdmin ? currentPoints : currentPoints - 1;
  return { alreadyUnlocked: false, remainingPoints };
}

async function requireUnlocked({ imageId, userId, message }) {
  const unlocked = await isImageUnlockedByUser({ imageId, userId });
  if (!unlocked) {
    throw Object.assign(new Error(message), { status: 403 });
  }
}

export async function likeImage({ imageId, userId }) {
  const db = getDb();
  await requireUnlocked({ imageId, userId, message: 'Unlock image before liking' });

  const { error: likeError } = await db
    .from('image_likes')
    .upsert({ user_id: userId, image_id: imageId }, { onConflict: 'user_id,image_id', ignoreDuplicates: true });
  if (likeError) throw likeError;

  const { count, error: countError } = await db
    .from('image_likes')
    .select('*', { count: 'exact', head: true })
    .eq('image_id', imageId);
  if (countError) throw countError;

  const likesCount = Number(count || 0);
  const { error: updateError } = await db.from('images').update({ likes_count: likesCount }).eq('id', imageId);
  if (updateError) throw updateError;

  return likesCount;
}

export async function commentImage({ imageId, userId, content }) {
  const db = getDb();
  await requireUnlocked({ imageId, userId, message: 'Unlock image before commenting' });

  const { error: commentError } = await db
    .from('image_comments')
    .insert({ user_id: userId, image_id: imageId, content });
  if (commentError) throw commentError;

  const { count, error: countError } = await db
    .from('image_comments')
    .select('*', { count: 'exact', head: true })
    .eq('image_id', imageId);
  if (countError) throw countError;

  const commentsCount = Number(count || 0);
  const { error: updateError } = await db
    .from('images')
    .update({ comments_count: commentsCount })
    .eq('id', imageId);
  if (updateError) throw updateError;

  return commentsCount;
}

export async function listComments(imageId) {
  const db = getDb();
  const { data: comments, error } = await db
    .from('image_comments')
    .select('id,content,created_at,users(username)')
    .eq('image_id', imageId)
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;

  return (comments || []).map((row) => ({
    id: row.id,
    content: row.content,
    createdAt: row.created_at,
    username: row.users?.username || 'unknown',
  }));
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
