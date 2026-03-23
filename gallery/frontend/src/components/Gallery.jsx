import { useQuery } from '@tanstack/react-query';
import { getImages } from '../api/services';
import { useAppStore } from '../store/useAppStore';
import GalleryCard from './GalleryCard';

const FILTER_OPTIONS = [
  { label: 'Date added', value: 'dateAdded' },
  { label: 'Date modified', value: 'dateModified' },
  { label: 'Most liked', value: 'mostLiked' },
  { label: 'Most commented', value: 'mostCommented' },
];

function SkeletonCard() {
  return <div className="aspect-[4/3] animate-pulse rounded-xl bg-slate-800" />;
}

export default function Gallery({ onZoom }) {
  const page = useAppStore((s) => s.page);
  const filter = useAppStore((s) => s.filter);
  const setPage = useAppStore((s) => s.setPage);
  const setFilter = useAppStore((s) => s.setFilter);

  const { data, isLoading } = useQuery({
    queryKey: ['images', page, filter],
    queryFn: () => getImages({ page, filter }),
    keepPreviousData: true,
  });

  const images = data?.data || [];

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Image Gallery</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Filter</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-sm"
          >
            {FILTER_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : images.map((image) => <GalleryCard key={image.id} image={image} onZoom={onZoom} />)}
      </div>

      <div className="flex items-center justify-center gap-2 pt-2">
        <button
          className="rounded bg-slate-800 px-3 py-1 text-sm disabled:opacity-50"
          disabled={!data || data.page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="text-sm text-slate-300">
          Page {data?.page || 1} / {data?.totalPages || 1}
        </span>
        <button
          className="rounded bg-slate-800 px-3 py-1 text-sm disabled:opacity-50"
          disabled={!data || data.page >= data.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
