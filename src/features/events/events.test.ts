import { describe, expect, it } from "vitest";
import { formatEventDate, getUpcomingEvents } from "./events";
import type { Event } from "./types";

const event: Event = {
  id: "sample-event",
  title: "Sample Event",
  startDate: "2026-08-15",
  endDate: null,
  venue: "Sample Venue",
  location: "Sample City",
  description: "",
  url: null,
};

describe("events", () => {
  it("returns a copy of the event collection", () => {
    expect(getUpcomingEvents()).not.toBe(getUpcomingEvents());
  });

  it("formats a single-day event date", () => {
    expect(formatEventDate(event)).toBe("August 15, 2026");
  });

  it("formats an event date range", () => {
    expect(formatEventDate({ ...event, endDate: "2026-08-17" })).toBe(
      "August 15, 2026 - August 17, 2026",
    );
  });
});
