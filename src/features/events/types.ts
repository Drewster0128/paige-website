export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
  venue: string;
  location: string;
  description: string;
  url: string | null;
}
