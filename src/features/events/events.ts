import eventData from "./data/events.json";
import type { Event } from "./types";

const events = (eventData as Event[]).slice().sort((first, second) =>
  first.startDate.localeCompare(second.startDate),
);

export function getUpcomingEvents(): Event[] {
  return events.slice();
}

export function formatEventDate(event: Event): string {
  const startDate = new Date(`${event.startDate}T12:00:00`);
  const endDate = event.endDate
    ? new Date(`${event.endDate}T12:00:00`)
    : undefined;
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!endDate || event.endDate === event.startDate) {
    return dateFormatter.format(startDate);
  }

  return `${dateFormatter.format(startDate)} - ${dateFormatter.format(endDate)}`;
}
