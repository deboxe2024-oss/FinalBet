'use client';
import Link from 'next/link';
import { TicketCheck } from 'lucide-react';

export default function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <TicketCheck className="h-6 w-6 text-accent" />
            <span className="font-bold font-headline text-lg">FinalBet</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
