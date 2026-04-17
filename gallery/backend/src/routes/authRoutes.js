import { Router } from 'express';
import {
  changeUserPassword,
  createUser,
  getUnlockedImageIds,
  getUserById,
  verifyUserCredentials,
} from '../services/userService.js';
import { signToken } from '../utils/jwt.js';
import { requireAuth } from '../middleware/auth.js';
import { createCaptchaChallenge, verifyCaptchaChallenge } from '../services/captchaService.js';

const router = Router();

router.get('/captcha', (_req, res) => {
  const challenge = createCaptchaChallenge();
  return res.json(challenge);
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, captchaChallengeId, captchaAnswer } = req.body;
    const safeUsername = typeof username === 'string' ? username.trim() : '';
    const safeEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const safePassword = typeof password === 'string' ? password : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!safeUsername || !safeEmail || !emailRegex.test(safeEmail) || !safePassword || safePassword.length < 6) {
      return res.status(400).json({ message: 'Username, valid email, and password (min 6 chars) are required' });
    }

    const captchaResult = verifyCaptchaChallenge({
      challengeId: captchaChallengeId,
      answer: captchaAnswer,
    });
    if (!captchaResult.ok) {
      return res.status(400).json({ message: captchaResult.message });
    }

    const user = await createUser(safeUsername, safeEmail, safePassword);
    const token = signToken({ sub: user.id, username: user.username, isAdmin: Boolean(user.isAdmin) });
    const unlockedImages = await getUnlockedImageIds(user.id);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        points: user.points,
        isAdmin: Boolean(user.isAdmin),
        unlockedImages,
      },
    });
  } catch (error) {
    if (error?.code === 'USERNAME_EXISTS') {
      return res.status(409).json({ message: 'Username already exists' });
    }
    if (error?.code === 'EMAIL_EXISTS') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    if (String(error.message || '').includes('users.username')) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    if (String(error.message || '').includes('users.email')) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    if (String(error.message || '').includes('UNIQUE')) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }
    return next(error);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const safeUsername = typeof username === 'string' ? username.trim() : '';
  const safePassword = typeof password === 'string' ? password : '';

  if (!safeUsername || !safePassword) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = await verifyUserCredentials(safeUsername, safePassword);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ sub: user.id, username: user.username, isAdmin: user.isAdmin });
  const unlockedImages = await getUnlockedImageIds(user.id);

  return res.json({ token, user: { ...user, unlockedImages } });
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await getUserById(req.user.sub);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const unlockedImages = await getUnlockedImageIds(user.id);

  return res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    points: user.points,
    isAdmin: Boolean(user.isAdmin),
    unlockedImages,
  });
});

router.post('/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const safeCurrentPassword = typeof currentPassword === 'string' ? currentPassword : '';
  const safeNewPassword = typeof newPassword === 'string' ? newPassword : '';

  if (!safeCurrentPassword || !safeNewPassword || safeNewPassword.length < 6) {
    return res.status(400).json({ message: 'Current password and new password (min 6 chars) are required' });
  }

  const result = await changeUserPassword(req.user.sub, safeCurrentPassword, safeNewPassword);

  if (!result.ok && result.code === 'NOT_FOUND') {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!result.ok && result.code === 'INVALID_CURRENT_PASSWORD') {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  return res.json({ message: 'Password changed successfully' });
});

export default router;
