import { PageLayout } from "../../../pages/PageLayout";
import { EventCard } from "../components/EventCard";
import { getUpcomingEvents } from "../events";

export function EventsPage(): React.JSX.Element {
  const events = getUpcomingEvents();

  return (
    <PageLayout title="Upcoming Events">
      {events.length > 0 ? (
        <div className="grid gap-6">
          {events.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 text-center">
          <p>No upcoming appearances are scheduled right now.</p>
          <p className="text-[var(--cream)]/65">
            Check back for future markets, exhibitions, and community events.
          </p>
        </div>
      )}
    </PageLayout>
  );
}
