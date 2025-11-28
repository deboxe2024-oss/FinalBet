'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/header';
import { Info } from 'lucide-react';
import { useFacebookPixel } from '@/hooks/use-facebook-pixel';

const depositOptions = [
  { amount: 30, label: 'R$ 30,00', subtext: '(mínimo)', imageUrl: 'https://nwuievvpcjrmecujwfox.supabase.co/storage/v1/object/public/media/0.06680268344196871.png', link: 'https://go.goatpayments.com.br/stwourbiwm' },
  { amount: 50, label: 'R$ 50,00', subtext: '', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Final_Libertadores_2025.jpg', link: 'https://go.goatpayments.com.br/ou0og' },
  { amount: 100, label: 'R$ 100,00', subtext: '', imageUrl: 'https://nwuievvpcjrmecujwfox.supabase.co/storage/v1/object/public/media/0.19237929856447789.jpg', link: 'https://go.goatpayments.com.br/tmqny' },
  { amount: 250, label: 'R$ 250,00', subtext: '', imageUrl: 'https://nwuievvpcjrmecujwfox.supabase.co/storage/v1/object/public/media/0.8179536089969042.webp', link: 'https://go.goatpayments.com.br/zdow4' },
  { amount: 500, label: 'R$ 500,00', subtext: '', imageUrl: 'https://www.moneytimes.com.br/uploads/2025/11/final-da-libertadores-2025-entre-flamengo-x-palmeiras-imagem-gerada-por-ia-2.jpg', link: 'https://go.goatpayments.com.br/khjyv' },
];

export default function CheckoutPage() {
  const fbPixel = useFacebookPixel();

  const handleAddToCart = (amount: number) => {
    fbPixel.track('AddToCart', {
      value: amount,
      currency: 'BRL',
    });
  };

  return (
    <div className="relative flex flex-col min-h-screen">
       <div 
        className="absolute inset-0 bg-cover bg-center z-[-1] opacity-20"
        style={{ backgroundImage: "url('https://nwuievvpcjrmecujwfox.supabase.co/storage/v1/object/public/media/0.6502074644319774.jpg')" }}
      ></div>
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Escolha o valor do seu depósito
          </h1>
          <p className="text-md text-muted-foreground mt-2">
            para liberar sua aposta exclusiva!
          </p>
          <p className="text-sm text-accent font-semibold mt-1">
            Promoção válida apenas para novos usuários na Super Oferta Especial de Lançamento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {depositOptions.map((option) => (
            <Card key={option.amount} className="relative flex flex-col text-center shadow-lg hover:border-accent transition-all overflow-hidden group h-64">
              <div
                className="absolute inset-0 bg-cover bg-center z-0 transform transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${option.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
              <div className="relative z-10 flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="text-2xl lg:text-3xl font-bold text-white">{option.label}</CardTitle>
                  {option.subtext && <CardDescription className="text-gray-300 text-xs">{option.subtext}</CardDescription>}
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  {/* Future content can go here */}
                </CardContent>
                <CardFooter className="flex-col mt-auto p-4">
                  <Button asChild className="w-full btn-accent font-bold text-sm" onClick={() => handleAddToCart(option.amount)}>
                    <a href={option.link} target="_blank" rel="noopener noreferrer">Depositar agora</a>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-secondary/50 border-dashed">
            <CardHeader className="flex-row items-center gap-3">
                <Info className="w-6 h-6 text-accent" />
                <CardTitle className="text-lg font-semibold">Informações Importantes</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                A conta para login será entregue automaticamente após o pagamento. Isso evita que usuários criem múltiplas contas para abusar da Super Oferta Especial de Lançamento. Após o depósito, você receberá seu acesso exclusivo para acompanhar seus palpites, histórico e retornos.
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
