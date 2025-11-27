import { Bet } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export function AdminBets({ bets }: { bets: Bet[] }) {
    
  const getStatusBadge = (status: Bet['status']) => {
    switch(status) {
        case 'pendente': return <Badge variant="secondary">Pending</Badge>;
        case 'ganha': return <Badge className="bg-green-500 hover:bg-green-600">Won</Badge>;
        case 'perde': return <Badge variant="destructive">Lost</Badge>;
        case 'cancelada': return <Badge variant="outline">Canceled</Badge>;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Bets ({bets.length})</CardTitle>
        <CardDescription>A log of all bets placed on the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Match ID</TableHead>
                <TableHead>Choice</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Odd</TableHead>
                <TableHead className="text-right">Return</TableHead>
                <TableHead>Placed At</TableHead>
                <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bets.length > 0 ? (
                    bets.map(bet => (
                        <TableRow key={bet.id}>
                        <TableCell className="font-medium">{bet.user_id}</TableCell>
                        <TableCell>{bet.match_id}</TableCell>
                        <TableCell>{bet.choice}</TableCell>
                        <TableCell className="text-right">${bet.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{bet.odd.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${bet.potential_return.toFixed(2)}</TableCell>
                        <TableCell>{format(new Date(bet.placed_at.seconds * 1000), 'PPp')}</TableCell>
                        <TableCell>{getStatusBadge(bet.status)}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                            No bets placed yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
