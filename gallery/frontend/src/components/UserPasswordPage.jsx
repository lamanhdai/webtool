import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../api/services';
import { useAppStore } from '../store/useAppStore';

export default function UserPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const showToast = useAppStore((s) => s.showToast);

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      showToast(data?.message || 'Password changed successfully', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setReNewPassword('');
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to change password', 'error');
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !reNewPassword) {
      showToast('Please fill in all password fields', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }

    if (newPassword !== reNewPassword) {
      showToast('Re-input new password does not match', 'error');
      return;
    }

    if (currentPassword === newPassword) {
      showToast('New password must be different from current password', 'error');
      return;
    }

    mutation.mutate({ currentPassword, newPassword });
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-semibold">Change Password</h2>
      <p className="mb-4 text-sm text-slate-400">Verify your current password and set a new one.</p>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
          placeholder="Current password"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
        />
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          placeholder="New password"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
        />
        <input
          value={reNewPassword}
          onChange={(e) => setReNewPassword(e.target.value)}
          type="password"
          placeholder="Re-input new password"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
        />
        <button
          disabled={mutation.isPending}
          className="w-full rounded-md bg-indigo-600 px-3 py-2 font-medium hover:bg-indigo-500 disabled:opacity-60"
        >
          {mutation.isPending ? 'Please wait...' : 'Update password'}
        </button>
      </form>
    </div>
  );
}