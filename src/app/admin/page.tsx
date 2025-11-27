import Header from '@/components/layout/header';
import { getBets, getEvents } from '@/lib/db';
import { AdminEvents } from '@/components/admin/admin-events';
import { AdminBets } from '@/components/admin/admin-bets';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const events = await getEvents();
  const bets = await getBets();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Manage events and monitor betting activity.
          </p>
        </div>

        <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="events">Manage Events</TabsTrigger>
                <TabsTrigger value="bets">View Bets</TabsTrigger>
            </TabsList>
            <TabsContent value="events">
                <AdminEvents initialEvents={events} />
            </TabsContent>
            <TabsContent value="bets">
                <AdminBets bets={bets} />
            </TabsContent>
        </Tabs>

      </main>
      <footer className="w-full py-4 text-center text-xs text-muted-foreground">
        Final Score Admin © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
