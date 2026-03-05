'use client';

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { useEffect, useState } from "react";
import { ShoppingBag, User } from "lucide-react";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const totalItems = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <header className="border-b border-white/10 p-6 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          AZO ROASTERS
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-zinc-300 transition-colors">Catálogo</Link>
          
          <Link href="/account" className="text-sm font-medium hover:text-zinc-300 transition-colors flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Conta</span>
          </Link>

          <Link href="/cart" className="text-sm font-medium hover:text-zinc-300 transition-colors flex items-center gap-2 relative">
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
