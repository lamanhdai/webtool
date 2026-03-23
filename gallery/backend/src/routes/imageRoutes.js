import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';
import {
  commentImage,
  getImageById,
  getProtectedImageUrl,
  likeImage,
  listComments,
  listImages,
  syncImagesFromCloudinary,
  unlockImage,
} from '../services/imageService.js';

const router = Router();

router.get('/', optionalAuth, async (req, res) => {
  const { page = '1', filter = 'dateAdded', sync = 'false' } = req.query;

  if (sync === 'true' && req.user?.isAdmin) {
    await syncImagesFromCloudinary();
  }

  const payload = await listImages({
    page: Number(page),
    filter: String(filter),
    userId: req.user?.sub || null,
  });

  return res.json(payload);
});

router.get('/:id', requireAuth, async (req, res) => {
  const imageId = Number(req.params.id);
  const image = await getImageById(imageId);
  if (!image) return res.status(404).json({ message: 'Image not found' });

  const comments = await listComments(imageId);
  return res.json({
    id: image.id,
    format: image.format,
    createdAt: image.createdAt,
    updatedAt: image.updatedAt,
    likes: image.likes,
    commentsCount: image.commentsCount,
    comments,
  });
});

router.get('/:id/content', requireAuth, async (req, res, next) => {
  try {
    const imageId = Number(req.params.id);
    const signedUrl = await getProtectedImageUrl({ imageId, userId: req.user.sub });

    const response = await fetch(signedUrl);
    if (!response.ok) {
      return res.status(502).json({ message: 'Failed to fetch protected image' });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'private, max-age=30');
    const arrBuffer = await response.arrayBuffer();
    return res.send(Buffer.from(arrBuffer));
  } catch (error) {
    if (error?.status) {
      return res.status(error.status).json({ message: error.message });
    }
    return next(error);
  }
});

router.post('/:id/unlock', requireAuth, async (req, res, next) => {
  try {
    const imageId = Number(req.params.id);
    const result = await unlockImage({ imageId, userId: req.user.sub });
    return res.json(result);
  } catch (error) {
    if (error?.status) {
      return res.status(error.status).json({ message: error.message });
    }
    return next(error);
  }
});

router.post('/:id/like', requireAuth, async (req, res) => {
  try {
    const imageId = Number(req.params.id);
    const likes = await likeImage({ imageId, userId: req.user.sub });
    return res.json({ likes });
  } catch (error) {
    if (error?.status) {
      return res.status(error.status).json({ message: error.message });
    }
    throw error;
  }
});

router.post('/:id/comment', requireAuth, async (req, res) => {
  try {
    const imageId = Number(req.params.id);
    const content = String(req.body.content || '').trim();
    if (!content) return res.status(400).json({ message: 'Comment content required' });

    const commentsCount = await commentImage({ imageId, userId: req.user.sub, content });
    const comments = await listComments(imageId);

    return res.status(201).json({ commentsCount, comments });
  } catch (error) {
    if (error?.status) {
      return res.status(error.status).json({ message: error.message });
    }
    throw error;
  }
});

export default router;
