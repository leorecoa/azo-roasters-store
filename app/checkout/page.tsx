'use client';

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useCartStore } from "@/lib/store/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        <main className="max-w-4xl mx-auto p-6 py-12 text-center">
          <h1 className="text-3xl font-bold tracking-tighter mb-4">Checkout</h1>
          <p className="text-zinc-400 mb-8">Seu carrinho está vazio.</p>
          <Link href="/" className="px-6 py-3 bg-zinc-50 text-zinc-950 font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
            Voltar para a loja
          </Link>
        </main>
      </div>
    );
  }

  const subtotal = totalPrice();
  const shipping = 0; // Exemplo
  const total = subtotal + shipping;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulando checkout (no app real chamaria a API)
    setTimeout(() => {
      clearCart();
      alert("Pedido realizado com sucesso!");
      router.push("/account");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header />
      
      <main className="max-w-4xl mx-auto p-6 py-12">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">Dados do Pedido</h2>
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Nome Completo</label>
                <input required type="text" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-zinc-50 focus:outline-none focus:border-white/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">E-mail</label>
                <input required type="email" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-zinc-50 focus:outline-none focus:border-white/30" />
              </div>
            </form>
          </div>
          
          <div>
            <div className="bg-zinc-900 rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Resumo</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.variant_id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-zinc-400 text-xs">{item.variant_name} (x{item.quantity})</p>
                    </div>
                    <span className="font-medium">R$ {((item.price_cents * item.quantity) / 100).toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Subtotal</span>
                  <span>R$ {(subtotal / 100).toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Frete</span>
                  <span>R$ {(shipping / 100).toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>R$ {(total / 100).toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <button 
                form="checkout-form"
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-zinc-50 text-zinc-950 font-semibold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processando..." : "Confirmar Pagamento"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
