import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Azo Roasters Store',
  description: 'E-commerce for Azo Roasters',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased bg-zinc-950 text-zinc-50 selection:bg-zinc-800 selection:text-zinc-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
