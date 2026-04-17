import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getCaptchaChallenge, login, register } from '../api/services';
import { useAppStore } from '../store/useAppStore';

export default function AuthPanel() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaChallengeId, setCaptchaChallengeId] = useState('');
  const [captchaPrompt, setCaptchaPrompt] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const setAuth = useAppStore((s) => s.setAuth);
  const showToast = useAppStore((s) => s.showToast);

  const refreshCaptcha = async () => {
    try {
      setIsCaptchaLoading(true);
      const challenge = await getCaptchaChallenge();
      setCaptchaChallengeId(challenge.challengeId || '');
      setCaptchaPrompt(challenge.prompt || '');
      setCaptchaAnswer('');
    } catch {
      showToast('Failed to load captcha', 'error');
    } finally {
      setIsCaptchaLoading(false);
    }
  };

  useEffect(() => {
    if (isRegister && !captchaChallengeId) {
      refreshCaptcha();
    }
  }, [isRegister, captchaChallengeId]);

  const mutation = useMutation({
    mutationFn: (payload) => (isRegister ? register(payload) : login(payload)),
    onSuccess: (data) => {
      setAuth(data);
      showToast(isRegister ? 'Registration successful' : 'Login successful', 'success');
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Authentication failed', 'error');
      if (isRegister) {
        refreshCaptcha();
      }
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      const trimmedEmail = email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        showToast('Please enter a valid email address', 'error');
        return;
      }
      if (!captchaChallengeId || !captchaAnswer.trim()) {
        showToast('Please solve captcha before registering', 'error');
        return;
      }
      mutation.mutate({
        username,
        email: trimmedEmail,
        password,
        captchaChallengeId,
        captchaAnswer: captchaAnswer.trim(),
      });
      return;
    }

    mutation.mutate({ username, password });
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-semibold">{isRegister ? 'Register' : 'Login'}</h2>
      <p className="mb-4 text-sm text-slate-400"></p>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
        />
        {isRegister && (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
              required
            />
            <div className="rounded-md border border-slate-700 bg-slate-950 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-300">CAPTCHA: {captchaPrompt || 'Loading...'}</span>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  disabled={isCaptchaLoading}
                  className="text-xs text-indigo-400 hover:text-indigo-300 disabled:opacity-60"
                >
                  Refresh
                </button>
              </div>
              <input
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="Enter captcha answer"
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                required
              />
            </div>
          </>
        )}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
        />
        <button
          disabled={mutation.isPending}
          className="w-full rounded-md bg-indigo-600 px-3 py-2 font-medium hover:bg-indigo-500 disabled:opacity-60"
        >
          {mutation.isPending ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
        </button>
      </form>
      <button className="mt-4 text-sm text-slate-400 underline" onClick={() => setIsRegister((v) => !v)}>
        {isRegister ? 'Already have account? Login' : 'Need account? Register'}
      </button>
    </div>
  );
}
