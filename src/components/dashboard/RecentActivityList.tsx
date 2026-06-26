import type { AuditEvent } from "@/data/providers/types";

interface RecentActivityListProps {
  events: AuditEvent[];
}

export function RecentActivityList({ events }: RecentActivityListProps) {
  if (events.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-slate-500">No recent activity to show.</p>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {events.map((event) => (
        <li key={event.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900">{event.details}</p>
            <p className="mt-0.5 text-xs text-slate-500">
              {event.actor} · {event.resource}
            </p>
          </div>
          <time
            dateTime={event.timestamp}
            className="shrink-0 text-xs text-slate-400"
          >
            {new Date(event.timestamp).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </li>
      ))}
    </ul>
  );
}
