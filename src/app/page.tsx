import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const odds = [
  { team: 'Flamengo', odd: 10 },
  { team: 'Palmeiras', odd: 13 },
  { team: 'Empate', odd: 8 },
];

const betValues = [30, 50, 100, 250, 500];

export default function Home() {
  const features = [
    "Transmissão estável e sem travamentos",
    "Disponível para todos os dispositivos (Smartphone, Smart TV, Tablet e PC)",
    "Acesso 100% liberado após o depósito",
    "Sem interrupções durante a partida",
    "Qualidade 4K Suportando ate 10k e alta estabilidade",
  ];

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
            Bem-vindo à FinalClub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plataforma nova e oficial da FinalClub com uma Super Oferta Especial de Lançamento para a Final da Libertadores 2025! Aproveite a oferta exclusiva válida apenas para este jogo especial:
          </p>
        </div>

        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-headline text-accent">🔥 Super Oferta Especial de Lançamento 🔥</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-lg">Time / Resultado</TableHead>
                  <TableHead className="text-right text-lg">Oferta Especial de Lançamento</TableHead>
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

        <Card className="mb-12 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline text-accent">Acesso ao Jogo Ao Vivo — Exclusivo Para Apostadores</CardTitle>
            <p className="text-muted-foreground pt-2 max-w-3xl mx-auto">
              Todos os usuários que realizarem sua aposta na FinalClub recebem acesso prioritário e exclusivo à transmissão oficial da Final da Libertadores, através de nossos provedores autorizados.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  <span className="text-foreground/90">{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground text-sm max-w-3xl mx-auto">
              Ao apostar em nossa plataforma, você recebe um acesso exclusivo à transmissão oficial da Final da Libertadores por meio de parceiros licenciados. Isso garante estabilidade, zero travamento e compatibilidade total com qualquer dispositivo. Seu acesso é liberado automaticamente após confirmar o depósito.
            </p>
          </CardContent>
        </Card>
        
      </main>
      <footer className="w-full py-4 text-center text-xs text-muted-foreground">
        FinalClub © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
