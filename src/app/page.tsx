import { getEvents, seedDatabase } from '@/lib/db';
import { Event } from '@/lib/types';
import Header from '@/components/layout/header';
import { EventCard } from '@/components/betting/event-card';

export default async function Home() {
  await seedDatabase();
  const events = await getEvents();

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
            Upcoming Events
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Place your bets on the biggest matches.
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: Event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No events available at the moment. Please check back later.
            </p>
          </div>
        )}
      </main>
      <footer className="w-full py-4 text-center text-xs text-muted-foreground">
        Final Score © {new Date().getFullYear()}
      </footer>
    </>
  );
}