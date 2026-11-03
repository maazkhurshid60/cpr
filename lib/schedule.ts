/**
 * Upcoming public classes, shown on /schedule and the home page.
 *
 * To post a class, add a row. `date` is YYYY-MM-DD and decides when the class
 * drops off the list; `dateLabel` and `time` are shown exactly as written.
 * `course` must be a slug from ./courses. Past classes hide themselves.
 *
 * Example:
 *   { id: "hs-2026-12-06", course: "heartsaver-cpr-first-aid-aed",
 *     date: "2026-12-06", dateLabel: "Saturday, December 6, 2026",
 *     time: "9:00 am – 2:00 pm", location: "Pasadena", seats: 12 },
 *
 * The client has not set dates yet, so the list is empty and the page shows
 * its "request a date" state.
 */
export type ClassSession = {
  id: string;
  course: string;
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  /** Seats left. 0 shows the class as full. */
  seats: number;
};

export const SCHEDULE: ClassSession[] = [];
