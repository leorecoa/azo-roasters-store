'use client';

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useCartStore } from "@/lib/store/cart";
import { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header />
      
      <main className="max-w-4xl mx-auto p-6 py-12">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">Seu Carrinho</h1>
        
        {items.length === 0 ? (
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-8">
            <p className="text-zinc-400 text-center py-8">Seu carrinho está vazio.</p>
          </div>
        ) : (
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-8 divide-y divide-white/10">
            {items.map((item) => (
              <div key={item.variant_id} className="py-6 flex gap-6 items-center first:pt-0 last:pb-0">
                <div className="w-24 h-24 bg-zinc-800 rounded-xl border border-white/5 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-zinc-400 text-sm mb-2">{item.variant_name}</p>
                  <p className="font-medium">R$ {(item.price_cents / 100).toFixed(2).replace('.', ',')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-zinc-950 border border-white/10 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.variant_id, Math.max(1, item.quantity - 1))}
                      className="p-1 hover:bg-white/10 rounded-md transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                      className="p-1 hover:bg-white/10 rounded-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.variant_id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="pt-6 flex justify-between items-center">
              <span className="text-lg text-zinc-400">Total</span>
              <span className="text-2xl font-bold">R$ {(totalPrice() / 100).toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        )}
        
        {items.length > 0 && (
          <div className="flex justify-end">
            <Link href="/checkout" className="px-8 py-4 bg-zinc-50 text-zinc-950 font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
              Finalizar Compra
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
