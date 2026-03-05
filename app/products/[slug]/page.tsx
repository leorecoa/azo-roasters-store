'use client';

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useCartStore } from "@/lib/store/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { motion } from "motion/react";

// Mock data
const PRODUCTS = {
  "espresso-house": {
    id: "p1",
    name: "Espresso House",
    description: "Um blend clássico com notas de chocolate amargo, caramelo e nozes. Perfeito para o dia a dia e excelente com leite.",
    theme: { bg: "bg-amber-950/30", glow: "from-amber-500/20" },
    variants: [
      { id: "v1", name: "250g • Em grãos", price: 4500 },
      { id: "v2", name: "250g • Moído para Filtro", price: 4500 },
      { id: "v3", name: "500g • Em grãos", price: 8500 },
    ]
  },
  "microlote-frutado": {
    id: "p2",
    name: "Microlote Frutado",
    description: "Café especial com fermentação anaeróbica. Notas intensas de frutas vermelhas, acidez licorosa e final doce.",
    theme: { bg: "bg-rose-950/30", glow: "from-rose-500/20" },
    variants: [
      { id: "v4", name: "250g • Em grãos", price: 6500 },
      { id: "v5", name: "250g • Moído para Filtro", price: 6500 },
    ]
  },
  "curso-metodos": {
    id: "p3",
    name: "Curso de Métodos",
    description: "Aprenda a extrair o melhor do seu café em casa. Abordamos V60, Prensa Francesa, Aeropress e Chemex.",
    theme: { bg: "bg-emerald-950/30", glow: "from-emerald-500/20" },
    variants: [
      { id: "v6", name: "Turma Março - Sábado", price: 15000 },
      { id: "v7", name: "Turma Abril - Sábado", price: 15000 },
    ]
  }
};

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = PRODUCTS[slug as keyof typeof PRODUCTS];
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants[0]?.id);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50">
        <Header />
        <main className="max-w-6xl mx-auto p-6 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
          <Link href="/" className="text-zinc-400 hover:text-zinc-50 underline">Voltar para a loja</Link>
        </main>
      </div>
    );
  }

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addItem({
      product_id: product.id,
      variant_id: selectedVariant.id,
      name: product.name,
      variant_name: selectedVariant.name,
      price_cents: selectedVariant.price,
      quantity: 1,
    });
    
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-800">
      <Header />
      
      <main className="max-w-6xl mx-auto p-6 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`aspect-[4/5] ${product.theme.bg} rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden relative group`}
          >
            <div className={`absolute inset-0 bg-gradient-to-tr ${product.theme.glow} to-transparent opacity-50`}></div>
            <span className="text-zinc-800 text-8xl font-bold tracking-tighter mix-blend-overlay">AZO</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-5xl font-bold tracking-tighter mb-6">{product.name}</h1>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed">{product.description}</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-medium mb-4 text-zinc-300 uppercase tracking-wider">Opções disponíveis</h3>
                <div className="flex flex-col gap-3">
                  {product.variants.map((variant) => (
                    <button 
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-6 py-4 rounded-2xl border text-left transition-all flex justify-between items-center ${
                        selectedVariantId === variant.id 
                          ? 'border-white bg-white text-black font-medium shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                          : 'border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300'
                      }`}
                    >
                      <span>{variant.name}</span>
                      <span className={selectedVariantId === variant.id ? 'text-zinc-600' : 'text-zinc-500'}>
                        R$ {(variant.price / 100).toFixed(2).replace('.', ',')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-semibold tracking-tight">
                    R$ {selectedVariant ? (selectedVariant.price / 100).toFixed(2).replace('.', ',') : '0,00'}
                  </span>
                </div>
                <button 
                  onClick={handleAddToCart}
                  disabled={!selectedVariant}
                  className="w-full py-5 bg-zinc-50 text-zinc-950 font-semibold rounded-2xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
