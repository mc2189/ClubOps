export function DemoBanner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-3 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-amber-950"
    >
      <span>Demo Mode — fake data only</span>
      <a
        href="/demo"
        className="rounded bg-amber-600/30 px-2 py-0.5 text-xs underline-offset-2 hover:underline"
      >
        Learn more
      </a>
    </div>
  );
}
