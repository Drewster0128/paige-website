import type { Event } from "@types";

/*
const events = (eventData as Event[])
  .slice()
  .sort((first, second) => first.startDate.localeCompare(second.startDate));

export function getUpcomingEvents(): Event[] {
  return events.slice();
}

*/

export function formatEventDate(event: Event): string {
  const event_start : string[] = event.startDate.split("/");
  const start_year : number = Number(event_start[2]);
  const start_month : number = Number(event_start[0]) -1;
  const start_day : number = Number(event_start[1]);
  const startDate = new Date(start_year, start_month, start_day);

  const event_end : string[] = event.endDate!.split("/");
  const end_year : number = Number(event_end[2]);
  const end_month : number = Number(event_end[0]) -1;
  const end_day : number = Number(event_end[1]);
  const endDate = event.endDate
    ? new Date(end_year, end_month, end_day)
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
