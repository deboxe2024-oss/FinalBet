'use client';

import { useState, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Event } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { placeBet, getAiSummary } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';

const BetFormSchema = z.object({
  choice: z.string({ required_error: 'Please select an option.' }),
  amount: z.coerce.number().min(1, 'Minimum bet is $1.').max(5000, 'Maximum bet is $5000.'),
});

type BetFormValues = z.infer<typeof BetFormSchema>;

export function BetForm({ event }: { event: Event }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAiSummaryLoading, startAiSummaryTransition] = useTransition();
  const [aiSummary, setAiSummary] = useState('');
  const [showAiDialog, setShowAiDialog] = useState(false);

  const form = useForm<BetFormValues>({
    resolver: zodResolver(BetFormSchema),
    defaultValues: { amount: 10 },
  });

  const choice = form.watch('choice');
  const amount = form.watch('amount');
  const selectedOdd = choice ? event.odds[choice] : 0;
  const potentialReturn = (selectedOdd * (amount || 0)).toFixed(2);
  
  const handleFormSubmit = form.handleSubmit(async (data) => {
    startTransition(async () => {
        const formData = new FormData();
        formData.append('match_id', event.match_id);
        formData.append('choice', data.choice);
        formData.append('amount', String(data.amount));

        const result = await placeBet(null, formData);
        
        if (result?.success) {
            toast({
                title: 'Bet Placed!',
                description: result.message,
            });
            form.reset();
        } else {
            toast({
                title: 'Error',
                description: result.message || 'Failed to place bet.',
                variant: 'destructive',
            });
        }
    });
  });

  const handleGetSummary = async () => {
    if (!choice || !amount || !selectedOdd) {
        toast({
            title: "Missing Information",
            description: "Please select a choice and enter an amount first.",
            variant: "destructive"
        });
        return;
    }
    
    startAiSummaryTransition(async () => {
        const result = await getAiSummary({
            matchId: event.match_id,
            userId: 'user_123',
            choice,
            amount,
            odd: selectedOdd,
        });
        if(result.success) {
            setAiSummary(result.summary);
            setShowAiDialog(true);
        } else {
            toast({
                title: "AI Summary Error",
                description: result.summary,
                variant: "destructive"
            });
        }
    });
  };

  return (
    <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="choice"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="font-semibold">Your Choice:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-4"
                  disabled={!event.betting_enabled}
                >
                  {Object.entries(event.odds).map(([option, odd]) => (
                    <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal flex justify-between w-full">
                        <span>{option}</span>
                        <span className="font-semibold text-primary">{odd.toFixed(1)}</span>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bet Amount ($)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10.00" {...field} disabled={!event.betting_enabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="p-4 rounded-lg bg-secondary/50 text-center">
            <p className="text-sm text-muted-foreground">Potential Return</p>
            <p className="text-2xl font-bold text-primary">${potentialReturn}</p>
        </div>
        
        {event.betting_enabled ? (
            <div className="flex flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={handleGetSummary} className="w-full flex-1" disabled={isAiSummaryLoading || isPending}>
                  {isAiSummaryLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  AI Summary
                </Button>

                <Button type="submit" className="w-full flex-1" disabled={isPending || isAiSummaryLoading}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Place Bet
                </Button>
            </div>
        ) : (
            <div className="text-center text-sm text-destructive font-semibold p-2 bg-destructive/10 rounded-md">
                Betting is currently closed for this event.
            </div>
        )}
      </form>
    </Form>
    <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline">
            <Sparkles className="text-primary"/>
            AI Bet Summary
          </DialogTitle>
          <DialogDescription>
            {aiSummary || 'Loading summary...'}
          </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>
  );
}
