import { db, initializeAdminApp } from './firebase';
import { Event, Bet } from './types';

// Seeding function
export async function seedDatabase() {
  initializeAdminApp();
  const eventRef = db.collection('events').doc('libertadores_final_2025');
  const doc = await eventRef.get();
  if (!doc.exists) {
    console.log('Seeding database with initial event...');
    await eventRef.set({
      match_id: 'libertadores_final_2025',
      title: 'Final da Libertadores 2025 - Flamengo x Palmeiras',
      odds: { Flamengo: 10.0, Palmeiras: 13.0, Empate: 8.0 },
      betting_enabled: true,
      created_at: new Date(),
    });
  }
}

// Get all events
export async function getEvents(): Promise<Event[]> {
  initializeAdminApp();
  const snapshot = await db.collection('events').orderBy('created_at', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
}

// Get all bets
export async function getBets(): Promise<Bet[]> {
  initializeAdminApp();
  const snapshot = await db.collection('bets').orderBy('placed_at', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Bet));
}
