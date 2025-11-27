'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db, initializeAdminApp } from './firebase';
import { summarizeBet, SummarizeBetInput } from '@/ai/flows/bet-summarization';

function calculateReturn(amount: number, odd: number) {
  const a = Number(amount);
  const o = Number(odd);
  if (!isFinite(a) || !isFinite(o) || a <= 0 || o <= 0) return 0;
  return a * o;
}

const placeBetSchema = z.object({
  match_id: z.string(),
  choice: z.string(),
  amount: z.coerce.number().min(1, 'Minimum bet is 1.').max(5000, 'Maximum bet is 5000.'),
});

export async function placeBet(prevState: any, formData: FormData) {
  initializeAdminApp();
  const validatedFields = placeBetSchema.safeParse({
    match_id: formData.get('match_id'),
    choice: formData.get('choice'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { match_id, choice, amount } = validatedFields.data;

  try {
    const eventRef = db.collection('events').doc(match_id);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return { message: 'Event not found.' };
    }

    const event = eventDoc.data();
    if (!event?.betting_enabled) {
      return { message: 'Betting is closed for this event.' };
    }

    const odd = event.odds[choice];
    if (!odd) {
      return { message: 'Invalid choice.' };
    }

    const potentialReturn = calculateReturn(amount, odd);
    const bet = {
      match_id,
      user_id: 'user_123', // Replace with actual user ID from auth
      choice,
      amount: Number(amount),
      odd,
      potential_return: potentialReturn,
      placed_at: new Date(),
      status: 'pendente',
    };

    await db.collection('bets').add(bet);
    revalidatePath('/');
    revalidatePath('/admin');
    return { message: `Bet placed successfully! Potential return: $${potentialReturn.toFixed(2)}`, success: true };
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred.' };
  }
}

const updateOddsSchema = z.object({
    match_id: z.string(),
    odds: z.record(z.coerce.number().min(1.01)),
});

export async function updateOdds(match_id: string, newOdds: { [key: string]: number }) {
    initializeAdminApp();
    const validated = updateOddsSchema.safeParse({ match_id, odds: newOdds });
    if (!validated.success) {
        return { message: 'Invalid data.', error: validated.error.flatten() };
    }
    
    try {
        const eventRef = db.collection("events").doc(match_id);
        await eventRef.update({ odds: newOdds });
        revalidatePath('/');
        revalidatePath('/admin');
        return { message: 'Odds updated successfully!', success: true };
    } catch(e) {
        return { message: 'Failed to update odds.' };
    }
}


export async function setBettingStatus(match_id: string, enabled: boolean) {
    initializeAdminApp();
    try {
        const eventRef = db.collection("events").doc(match_id);
        await eventRef.update({ betting_enabled: enabled });
        revalidatePath('/');
        revalidatePath('/admin');
        return { message: `Betting ${enabled ? 'enabled' : 'disabled'}`, success: true };
    } catch(e) {
        return { message: 'Failed to update status.' };
    }
}


export async function getAiSummary(input: SummarizeBetInput) {
    try {
        // In a real app, you would fetch previous bets, news, etc.
        const summaryInput: SummarizeBetInput = {
            ...input,
            previousBets: [], 
            news: "No recent news available.",
            teamComparison: "Flamengo has a strong offense, while Palmeiras is known for its solid defense."
        };
        const result = await summarizeBet(summaryInput);
        return { summary: result.summary, success: true };

    } catch (e) {
        console.error(e);
        return { summary: 'Could not generate AI summary.', success: false };
    }
}
