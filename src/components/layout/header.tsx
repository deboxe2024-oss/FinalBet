'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TicketCheck, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const navLinks = [
  { href: '/', label: 'Events', icon: TicketCheck },
  { href: '/admin', label: 'Admin', icon: ShieldCheck },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <TicketCheck className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Final Score</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
