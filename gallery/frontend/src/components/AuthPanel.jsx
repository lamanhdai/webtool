import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/services';
import { useAppStore } from '../store/useAppStore';

export default function AuthPanel() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useAppStore((s) => s.setAuth);
  const showToast = useAppStore((s) => s.showToast);

  const mutation = useMutation({
    mutationFn: (payload) => (isRegister ? register(payload) : login(payload)),
    onSuccess: (data) => {
      setAuth(data);
      showToast(isRegister ? 'Registration successful' : 'Login successful', 'success');
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Authentication failed', 'error');
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
      mutation.mutate({ username, email: trimmedEmail, password });
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
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
            required
          />
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
