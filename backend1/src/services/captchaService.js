import crypto from 'node:crypto';

const CAPTCHA_TTL_MS = 5 * 60 * 1000;
const challenges = new Map();

function cleanupExpiredChallenges() {
  const now = Date.now();
  for (const [id, challenge] of challenges.entries()) {
    if (challenge.expiresAt <= now) {
      challenges.delete(id);
    }
  }
}

export function createCaptchaChallenge() {
  cleanupExpiredChallenges();

  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const useAddition = Math.random() > 0.5;
  const answer = useAddition ? a + b : a - b;
  const challengeId = crypto.randomUUID();

  challenges.set(challengeId, {
    answer: String(answer),
    expiresAt: Date.now() + CAPTCHA_TTL_MS,
  });

  return {
    challengeId,
    prompt: useAddition ? `${a} + ${b} = ?` : `${a} - ${b} = ?`,
  };
}

export function verifyCaptchaChallenge({ challengeId, answer }) {
  cleanupExpiredChallenges();

  if (!challengeId) {
    return { ok: false, message: 'Captcha challenge is required' };
  }

  const challenge = challenges.get(challengeId);
  if (!challenge) {
    return { ok: false, message: 'Captcha expired or invalid. Please refresh and try again' };
  }

  challenges.delete(challengeId);

  const safeAnswer = String(answer ?? '').trim();
  if (safeAnswer !== challenge.answer) {
    return { ok: false, message: 'Captcha answer is incorrect' };
  }

  return { ok: true };
}
