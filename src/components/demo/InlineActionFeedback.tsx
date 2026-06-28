interface InlineActionFeedbackProps {
  message: string;
  className?: string;
}

export function InlineActionFeedback({ message, className }: InlineActionFeedbackProps) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={`rounded-md border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-900 ${className ?? ""}`}
    >
      {message}
    </p>
  );
}
