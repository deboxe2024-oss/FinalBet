 'use server';
/**
 * @fileOverview Summarizes a bet using AI, considering previous bets, odds, news, team comparisons, and relevant factors.
 *
 * - summarizeBet - A function that handles the bet summarization process.
 * - SummarizeBetInput - The input type for the summarizeBet function.
 * - SummarizeBetOutput - The return type for the summarizeBet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeBetInputSchema = z.object({
  matchId: z.string().describe('The ID of the match.'),
  userId: z.string().describe('The ID of the user placing the bet.'),
  choice: z.string().describe('The choice the user is betting on (e.g., Team A, Team B, Draw).'),
  amount: z.number().describe('The amount the user is betting.'),
  odd: z.number().describe('The odd for the selected choice.'),
  previousBets: z.array(z.object({
    matchId: z.string(),
    choice: z.string(),
    amount: z.number(),
    odd: z.number(),
    status: z.string(),
  })).optional().describe('A list of the user\'s previous bets.'),
  news: z.string().optional().describe('Recent news related to the match.'),
  teamComparison: z.string().optional().describe('A comparison of the two teams playing.'),
});
export type SummarizeBetInput = z.infer<typeof SummarizeBetInputSchema>;

const SummarizeBetOutputSchema = z.object({
  summary: z.string().describe('A summary of the bet, considering various factors.'),
});
export type SummarizeBetOutput = z.infer<typeof SummarizeBetOutputSchema>;

export async function summarizeBet(input: SummarizeBetInput): Promise<SummarizeBetOutput> {
  return summarizeBetFlow(input);
}

const summarizeBetPrompt = ai.definePrompt({
  name: 'summarizeBetPrompt',
  input: {schema: SummarizeBetInputSchema},
  output: {schema: SummarizeBetOutputSchema},
  prompt: `You are an AI assistant that provides a summary of a bet a user is about to place.

Consider the following information when generating the summary:

Match ID: {{{matchId}}}
User ID: {{{userId}}}
Choice: {{{choice}}}
Amount: {{{amount}}}
Odd: {{{odd}}}

{{#if previousBets}}
Previous Bets:
{{#each previousBets}}
- Match ID: {{{matchId}}}, Choice: {{{choice}}}, Amount: {{{amount}}}, Odd: {{{odd}}}, Status: {{{status}}}
{{/each}}
{{else}}
No previous bets available.
{{/if}}

{{#if news}}
News: {{{news}}}
{{else}}
No recent news available.
{{/if}}

{{#if teamComparison}}
Team Comparison: {{{teamComparison}}}
{{else}}
No team comparison available.
{{/if}}

Provide a concise and informative summary of the bet, highlighting potential risks and rewards, and any relevant insights based on the provided information. The summary should be no more than 200 words.
`,
});

const summarizeBetFlow = ai.defineFlow(
  {
    name: 'summarizeBetFlow',
    inputSchema: SummarizeBetInputSchema,
    outputSchema: SummarizeBetOutputSchema,
  },
  async input => {
    const {output} = await summarizeBetPrompt(input);
    return output!;
  }
);
