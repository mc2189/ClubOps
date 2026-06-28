interface LocalSafetyNoteProps {
  children: string;
  className?: string;
}

/** Short page-level safety line — not a duplicate of the global demo banner */
export function LocalSafetyNote({ children, className }: LocalSafetyNoteProps) {
  return (
    <p
      className={`rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 ${className ?? ""}`}
    >
      {children}
    </p>
  );
}
