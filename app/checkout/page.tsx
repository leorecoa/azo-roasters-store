'use client';

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useCartStore } from "@/lib/store/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, ShieldCheck, CreditCard, Truck } from "lucide-react";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50">
        <Header />
        <main className="max-w-4xl mx-auto p-6 py-32 text-center">
          <h1 className="text-4xl font-bold tracking-tighter mb-4">Checkout</h1>
          <p className="text-zinc-400 mb-12">Seu carrinho está vazio.</p>
          <Link href="/" className="px-12 py-5 bg-zinc-50 text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-all">
            Voltar para a loja
          </Link>
        </main>
      </div>
    );
  }

  const subtotal = totalPrice();
  const shipping = 0;
  const total = subtotal + shipping;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      clearCart();
      router.push("/account");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-800">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-32">
        <Link 
          href="/cart" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-50 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold tracking-widest uppercase">Voltar ao Carrinho</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <div className="mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Finalização</span>
              <h1 className="text-6xl font-bold tracking-tighter">Dados de <br /><span className="text-zinc-500 italic font-serif">Envio & Pagamento</span></h1>
            </div>

            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-12">
              <section>
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-xs">01</span>
                  Informações Pessoais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Nome Completo</label>
                    <input required type="text" placeholder="Como no documento" className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 text-zinc-50 focus:outline-none focus:border-white/20 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">E-mail</label>
                    <input required type="email" placeholder="seu@email.com" className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 text-zinc-50 focus:outline-none focus:border-white/20 transition-all" />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-xs">02</span>
                  Endereço de Entrega
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">CEP</label>
                      <input required type="text" placeholder="00000-000" className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 text-zinc-50 focus:outline-none focus:border-white/20 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Logradouro</label>
                    <input required type="text" placeholder="Rua, Avenida..." className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 text-zinc-50 focus:outline-none focus:border-white/20 transition-all" />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-xs">03</span>
                  Método de Pagamento
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="relative group cursor-pointer">
                    <input type="radio" name="payment" className="peer sr-only" defaultChecked />
                    <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl peer-checked:border-zinc-50 peer-checked:bg-zinc-50 peer-checked:text-zinc-950 transition-all">
                      <CreditCard className="w-6 h-6 mb-4" />
                      <span className="block font-bold">Cartão de Crédito</span>
                      <span className="text-xs opacity-60">Até 12x sem juros</span>
                    </div>
                  </label>
                  <label className="relative group cursor-pointer">
                    <input type="radio" name="payment" className="peer sr-only" />
                    <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl peer-checked:border-zinc-50 peer-checked:bg-zinc-50 peer-checked:text-zinc-950 transition-all">
                      <div className="w-6 h-6 mb-4 font-bold flex items-center justify-center rounded bg-emerald-500 text-white text-[10px]">PIX</div>
                      <span className="block font-bold">PIX</span>
                      <span className="text-xs opacity-60">Aprovação imediata</span>
                    </div>
                  </label>
                </div>
              </section>
            </form>
          </div>
          
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/30 border border-white/5 rounded-[40px] p-10 sticky top-32">
              <h2 className="text-2xl font-bold mb-8 tracking-tight">Seu Pedido</h2>
              
              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {items.map(item => (
                  <div key={item.variant_id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-serif italic text-lg leading-tight">{item.name}</p>
                      <p className="text-zinc-500 text-xs mt-1">{item.variant_name} • Qtd: {item.quantity}</p>
                    </div>
                    <span className="font-bold whitespace-nowrap">R$ {((item.price_cents * item.quantity) / 100).toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-10 pt-8 border-t border-white/5">
                <div className="flex justify-between text-zinc-400">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="font-bold">R$ {(subtotal / 100).toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Frete
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-500">Grátis</span>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                  <span className="text-sm font-bold tracking-widest uppercase text-zinc-500">Total</span>
                  <span className="text-4xl font-bold tracking-tighter">R$ {(total / 100).toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button 
                form="checkout-form"
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-zinc-50 text-zinc-950 font-bold rounded-2xl hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                {loading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Finalizar Pagamento
                  </>
                )}
              </button>

              <div className="mt-8 flex items-center justify-center gap-4 opacity-40 grayscale">
                <div className="text-[10px] font-bold tracking-widest uppercase">Visa</div>
                <div className="text-[10px] font-bold tracking-widest uppercase">Mastercard</div>
                <div className="text-[10px] font-bold tracking-widest uppercase">Elo</div>
                <div className="text-[10px] font-bold tracking-widest uppercase">Pix</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
