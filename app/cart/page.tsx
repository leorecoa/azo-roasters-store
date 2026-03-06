'use client';

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useCartStore } from "@/lib/store/cart";
import { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-800">
      <Header />
      
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-32">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-50 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold tracking-widest uppercase">Continuar Comprando</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Seu Pedido</span>
            <h1 className="text-6xl font-bold tracking-tighter">Carrinho de <br /><span className="text-zinc-500 italic font-serif">Compras</span></h1>
          </div>
          <div className="text-zinc-400 font-medium">
            {items.length} {items.length === 1 ? 'item' : 'itens'} selecionados
          </div>
        </div>
        
        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/30 border border-white/5 rounded-[40px] p-12 md:p-24 text-center"
          >
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
              <ShoppingBag className="w-8 h-8 text-zinc-700" />
            </div>
            <p className="text-zinc-400 text-xl mb-12 max-w-sm mx-auto">Sua sacola está vazia no momento. Que tal explorar nossos microlotes?</p>
            <Link href="/#catalogo" className="inline-block px-12 py-5 bg-zinc-50 text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-all">
              Ver Catálogo
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-8">
              {items.map((item, i) => (
                <motion.div 
                  key={item.variant_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-zinc-900/30 border border-white/5 rounded-[32px] p-8 flex flex-col sm:flex-row gap-8 items-center hover:bg-zinc-900/50 transition-all"
                >
                  <div className="w-32 h-32 bg-zinc-900 rounded-2xl border border-white/5 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                    <span className="text-zinc-800 text-3xl font-bold tracking-tighter opacity-50">AZO</span>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-serif italic mb-1">{item.name}</h3>
                    <p className="text-zinc-500 text-sm mb-4">{item.variant_name}</p>
                    <p className="text-xl font-bold">R$ {(item.price_cents / 100).toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 bg-zinc-950 border border-white/10 rounded-full p-2">
                      <button 
                        onClick={() => updateQuantity(item.variant_id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.variant_id)}
                      className="w-12 h-12 flex items-center justify-center text-zinc-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-zinc-900/30 border border-white/5 rounded-[40px] p-10 sticky top-32">
                <h2 className="text-2xl font-bold mb-8 tracking-tight">Resumo</h2>
                
                <div className="space-y-4 mb-10 pb-8 border-b border-white/5">
                  <div className="flex justify-between text-zinc-400">
                    <span className="text-sm font-medium">Subtotal</span>
                    <span className="font-bold">R$ {(totalPrice() / 100).toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span className="text-sm font-medium">Frete</span>
                    <span className="text-xs font-bold tracking-widest uppercase text-emerald-500">Grátis</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-10">
                  <span className="text-sm font-bold tracking-widest uppercase text-zinc-500">Total</span>
                  <span className="text-4xl font-bold tracking-tighter">R$ {(totalPrice() / 100).toFixed(2).replace('.', ',')}</span>
                </div>

                <Link 
                  href="/checkout" 
                  className="w-full py-6 bg-zinc-50 text-zinc-950 font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                >
                  Finalizar Compra
                </Link>
                
                <p className="text-center text-[10px] text-zinc-600 font-bold tracking-widest uppercase mt-8">
                  Pagamento Seguro • SSL Encrypted
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
