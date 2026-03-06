import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Azo Roasters | Cafés Especiais',
  description: 'Torrefação artesanal focada em extrair o máximo potencial de cada grão.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} dark scroll-smooth`}>
      <body className="font-sans antialiased bg-zinc-950 text-zinc-50 selection:bg-zinc-800 selection:text-zinc-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
