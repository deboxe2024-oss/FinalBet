import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BetForm } from './bet-form';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === 'stadium');

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {image && (
         <div className="relative h-40 w-full">
            <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
         </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-xl leading-tight">{event.title}</CardTitle>
        {event.betting_enabled ? (
          <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Open for Bets</Badge>
        ) : (
          <Badge variant="destructive" className="w-fit">Closed</Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <BetForm event={event} />
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Event ID: {event.match_id}
      </CardFooter>
    </Card>
  );
}
