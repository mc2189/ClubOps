import type { CalendarEvent } from "@/data/providers/types";

export const demoCalendarEvents: CalendarEvent[] = [
  {
    id: "cal-001",
    title: "Recreational Gym — Tuesday",
    date: "2026-07-01",
    startTime: "17:00",
    endTime: "18:30",
    location: "Main Hall",
    type: "session",
  },
  {
    id: "cal-002",
    title: "Competitive Squad — Thursday",
    date: "2026-07-03",
    startTime: "18:00",
    endTime: "20:00",
    location: "Main Hall",
    type: "session",
  },
  {
    id: "cal-003",
    title: "Regional Competition",
    date: "2026-07-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "City Sports Centre",
    type: "competition",
  },
  {
    id: "cal-004",
    title: "Committee Meeting",
    date: "2026-07-08",
    startTime: "19:30",
    endTime: "21:00",
    location: "Club Room",
    type: "meeting",
  },
  {
    id: "cal-005",
    title: "Summer Social BBQ",
    date: "2026-07-19",
    startTime: "12:00",
    endTime: "16:00",
    location: "Club Grounds",
    type: "social",
  },
];
