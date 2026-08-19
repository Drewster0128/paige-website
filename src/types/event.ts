export type Event = {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
  venue: string;
  location: string;
  description: string | null;
  url: string | null;
}