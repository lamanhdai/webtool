import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentImage, likeImage, unlockImage } from '../api/services';
import { useAppStore } from '../store/useAppStore';

export default function GalleryCard({ image, onZoom }) {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const applyUnlock = useAppStore((s) => s.applyUnlock);
  const showToast = useAppStore((s) => s.showToast);

  const unlockMutation = useMutation({
    mutationFn: () => unlockImage(image.id),
    onSuccess: (data) => {
      applyUnlock({ imageId: image.id, remainingPoints: data.remainingPoints });
      queryClient.invalidateQueries({ queryKey: ['images'] });
      showToast('Image unlocked', 'success');
    },
    onError: (err) => showToast(err?.response?.data?.message || 'Unlock failed', 'error'),
  });

  const likeMutation = useMutation({
    mutationFn: () => likeImage(image.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['images'] });
      const previous = queryClient.getQueriesData({ queryKey: ['images'] });

      previous.forEach(([key, value]) => {
        if (!value?.data) return;
        queryClient.setQueryData(key, {
          ...value,
          data: value.data.map((img) => (img.id === image.id ? { ...img, likes: img.likes + 1 } : img)),
        });
      });

      return { previous };
    },
    onError: (_error, _vars, context) => {
      context?.previous?.forEach(([key, value]) => queryClient.setQueryData(key, value));
      showToast('Failed to like image', 'error');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['images'] }),
  });

  const commentMutation = useMutation({
    mutationFn: () => commentImage(image.id, comment),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['images'] });
      const previous = queryClient.getQueriesData({ queryKey: ['images'] });

      previous.forEach(([key, value]) => {
        if (!value?.data) return;
        queryClient.setQueryData(key, {
          ...value,
          data: value.data.map((img) =>
            img.id === image.id ? { ...img, commentsCount: img.commentsCount + 1 } : img,
          ),
        });
      });

      return { previous };
    },
    onError: (_error, _vars, context) => {
      context?.previous?.forEach(([key, value]) => queryClient.setQueryData(key, value));
      showToast('Failed to comment', 'error');
    },
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
        <img
          src={image.previewUrl}
          alt="Gallery"
          className={`h-full w-full object-cover ${image.locked ? 'blur-xl grayscale' : ''}`}
          loading="lazy"
          draggable={false}
        />
        {image.locked ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <button
              onClick={() => unlockMutation.mutate()}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold"
            >
              Unlock (1 point)
            </button>
          </div>
        ) : (
          <button
            onClick={() => onZoom(image.previewUrl)}
            className="absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-xs"
          >
            🔍 Zoom
          </button>
        )}
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>Likes: {image.likes}</span>
          <span>Comments: {image.commentsCount}</span>
        </div>

        {!image.locked && (
          <>
            <div className="flex gap-2">
              <button onClick={() => likeMutation.mutate()} className="rounded bg-slate-800 px-3 py-1 text-sm">
                ❤️ Like
              </button>
            </div>

            <div className="flex gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
                placeholder="Add comment"
              />
              <button
                onClick={() => commentMutation.mutate()}
                className="rounded bg-slate-700 px-3 py-1 text-sm"
                disabled={!comment.trim()}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
