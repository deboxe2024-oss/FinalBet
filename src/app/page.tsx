import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

const odds = [
  { team: 'Flamengo', odd: 10 },
  { team: 'Palmeiras', odd: 13 },
  { team: 'Empate', odd: 8 },
];

const betValues = [30, 50, 100];

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1] opacity-20"
        style={{ backgroundImage: "url('https://nwuievvpcjrmecujwfox.supabase.co/storage/v1/object/public/media/0.6502074644319774.jpg')" }}
      ></div>
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
            Bem-vindo à FinalBet
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plataforma nova e oficial da Super ODD de lançamento para a Final da Libertadores 2025! Aproveite a oferta exclusiva válida apenas para este jogo especial:
          </p>
        </div>

        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-headline text-accent">🔥 Super ODDs de Lançamento 🔥</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-lg">Time / Resultado</TableHead>
                  <TableHead className="text-right text-lg">ODD Lançamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {odds.map((item) => (
                  <TableRow key={item.team}>
                    <TableCell className="font-medium text-base">{item.team}</TableCell>
                    <TableCell className="text-right font-bold text-base">{item.odd}x</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-center text-muted-foreground mt-4">Aproveite enquanto está disponível!</p>
          </CardContent>
        </Card>

        <div className="text-center mb-12">
          <Link href="/checkout">
            <Button size="lg" className="h-14 text-xl font-bold animate-pulse">
              👉 Quero Fazer Minha Aposta
            </Button>
          </Link>
        </div>
        
        <Card className="mb-12 shadow-lg relative overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-10"
                style={{ backgroundImage: "url('https://nwuievvpcjrmecujwfox.supabase.co/storage/v1/object/public/media/0.6502074644319774.jpg')" }}
            ></div>
            <div className="relative z-10">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-headline">Simulação de Retorno</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Valor da Aposta</TableHead>
                            <TableHead>Flamengo (10x)</TableHead>
                            <TableHead>Palmeiras (13x)</TableHead>
                            <TableHead>Empate (8x)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {betValues.map(value => (
                                <TableRow key={value}>
                                    <TableCell className="font-medium">R$ {value.toFixed(2)}</TableCell>
                                    <TableCell className="text-green-400 font-semibold">R$ {(value * 10).toFixed(2)}</TableCell>
                                    <TableCell className="text-green-400 font-semibold">R$ {(value * 13).toFixed(2)}</TableCell>
                                    <TableCell className="text-green-400 font-semibold">R$ {(value * 8).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </div>
        </Card>
        
      </main>
      <footer className="w-full py-4 text-center text-xs text-muted-foreground">
        FinalBet © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
