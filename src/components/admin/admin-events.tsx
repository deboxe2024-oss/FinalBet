'use client';

import { useState, useTransition } from 'react';
import { Event } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { updateOdds, setBettingStatus } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function AdminEvents({ initialEvents }: { initialEvents: Event[] }) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleOddsChange = (matchId: string, choice: string, value: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.match_id === matchId
          ? {
              ...event,
              odds: { ...event.odds, [choice]: parseFloat(value) || 0 },
            }
          : event
      )
    );
  };

  const handleUpdateOdds = (matchId: string) => {
    startTransition(async () => {
      const event = events.find(e => e.match_id === matchId);
      if (!event) return;

      const result = await updateOdds(matchId, event.odds);
      if (result.success) {
        toast({ title: 'Success', description: result.message });
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' });
      }
    });
  };

  const handleToggleBetting = (matchId: string, enabled: boolean) => {
    startTransition(async () => {
      const result = await setBettingStatus(matchId, enabled);
      if (result.success) {
        toast({ title: 'Success', description: result.message });
        setEvents(prev => prev.map(e => e.match_id === matchId ? {...e, betting_enabled: enabled} : e))
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Events</CardTitle>
        <CardDescription>Update odds and enable or disable betting for each event.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {events.map(event => (
          <div key={event.id} className="p-4 border rounded-lg">
            <h3 className="font-headline text-lg font-semibold">{event.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
              {Object.entries(event.odds).map(([choice, odd]) => (
                <div key={choice} className="space-y-1">
                  <Label htmlFor={`${event.id}-${choice}`}>{choice}</Label>
                  <Input
                    id={`${event.id}-${choice}`}
                    type="number"
                    step="0.1"
                    value={odd}
                    onChange={e => handleOddsChange(event.match_id, choice, e.target.value)}
                    disabled={isPending}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                    <Switch
                        id={`betting-switch-${event.id}`}
                        checked={event.betting_enabled}
                        onCheckedChange={(checked) => handleToggleBetting(event.match_id, checked)}
                        disabled={isPending}
                    />
                    <Label htmlFor={`betting-switch-${event.id}`}>Betting Enabled</Label>
                </div>
                <Button onClick={() => handleUpdateOdds(event.match_id)} disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes for {event.match_id}
                </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
