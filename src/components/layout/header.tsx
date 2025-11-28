'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
                src="https://nwuievvpcjrmecujwfox.supabase.co/storage/v1/object/public/media/0.9388482349431064.png" 
                alt="FinalClub Logo" 
                width={32} 
                height={32}
                className="h-8 w-8"
            />
            <span className="font-bold font-headline text-lg">FinalClub</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
