'use client';

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useCartStore } from "@/lib/store/cart";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingBag, Info, Thermometer, Clock, Scale } from "lucide-react";

// Mock data
const PRODUCTS = {
  "mel-de-aurora": {
    id: "p1",
    name: "Mel de Aurora",
    description: "Edição Especial Dia das Mulheres. Este café é uma homenagem à delicadeza e força. Cultivado a 1200m de altitude, apresenta uma doçura que lembra mel silvestre, com um corpo licoroso e finalização limpa de pêssego.",
    theme: { bg: "bg-amber-950/30", glow: "from-amber-500/20" },
    notes: ["Mel", "Jasmim", "Pêssego"],
    altitude: "1200m",
    process: "Natural",
    variants: [
      { id: "v1", name: "250g • Em grãos", price: 6800 },
      { id: "v2", name: "250g • Moído para Filtro", price: 6800 },
    ]
  },
  "flor-de-tangerina": {
    id: "p2",
    name: "Flor de Tangerina",
    description: "Microlote Premiado. Um café vibrante e refrescante. A acidez cítrica da tangerina é equilibrada por uma doçura floral persistente, resultando em uma xícara extremamente elegante e complexa.",
    theme: { bg: "bg-orange-950/30", glow: "from-orange-500/20" },
    notes: ["Tangerina", "Floral", "Açúcar Mascavo"],
    altitude: "1150m",
    process: "Cereja Descascado",
    variants: [
      { id: "v3", name: "150g • Em grãos", price: 5500 },
      { id: "v4", name: "150g • Moído para Filtro", price: 5500 },
    ]
  },
  "manga-rosa": {
    id: "p3",
    name: "Manga Rosa",
    description: "Microlote Premiado. Uma explosão de frutas tropicais. Com notas intensas que remetem à manga e papaia, este café possui um corpo sedoso e uma doçura que preenche todo o paladar.",
    theme: { bg: "bg-rose-950/30", glow: "from-rose-500/20" },
    notes: ["Manga", "Papaia", "Tropical"],
    altitude: "1300m",
    process: "Fermentação Anaeróbica",
    variants: [
      { id: "v5", name: "150g • Em grãos", price: 5500 },
      { id: "v6", name: "150g • Moído para Filtro", price: 5500 },
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
      
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-50 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold tracking-widest uppercase">Voltar ao Catálogo</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Image Section */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className={`aspect-[4/5] ${product.theme.bg} rounded-[48px] border border-white/5 flex items-center justify-center overflow-hidden relative group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-tr ${product.theme.glow} to-transparent opacity-50`} />
              <span className="text-zinc-800 text-[180px] font-bold tracking-tighter mix-blend-overlay">AZO</span>
              
              <div className="absolute bottom-12 left-12 right-12 flex gap-4">
                {product.notes.map((note, i) => (
                  <span key={i} className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase">
                    {note}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Info Section */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">
                Origem: Brasil • {product.altitude}
              </span>
              <h1 className="text-6xl font-serif italic mb-8 leading-tight">{product.name}</h1>
              <p className="text-xl text-zinc-400 mb-12 leading-relaxed">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-8 mb-12 py-8 border-y border-white/5">
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-2">Processo</span>
                  <span className="text-lg font-medium">{product.process}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-2">Altitude</span>
                  <span className="text-lg font-medium">{product.altitude}</span>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">Selecione a Moagem</h3>
                  <div className="flex flex-col gap-3">
                    {product.variants.map((variant) => (
                      <button 
                        key={variant.id}
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`px-6 py-5 rounded-2xl border text-left transition-all flex justify-between items-center ${
                          selectedVariantId === variant.id 
                            ? 'border-zinc-50 bg-zinc-50 text-zinc-950 font-bold' 
                            : 'border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300'
                        }`}
                      >
                        <span className="text-sm">{variant.name}</span>
                        <span className={selectedVariantId === variant.id ? 'text-zinc-600' : 'text-zinc-500'}>
                          R$ {(variant.price / 100).toFixed(2).replace('.', ',')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-8">
                  <button 
                    onClick={handleAddToCart}
                    disabled={!selectedVariant}
                    className="w-full py-6 bg-zinc-50 text-zinc-950 font-bold rounded-2xl hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Brewing Guide Section */}
        <section className="mt-32 py-32 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-24">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Guia de Preparo</span>
              <h2 className="text-5xl font-serif italic mb-8">Como extrair o <span className="text-zinc-50 not-italic font-sans font-bold">melhor deste grão</span></h2>
              <p className="text-zinc-400 text-lg">Recomendamos o método V60 para ressaltar as notas florais e a acidez limpa deste microlote.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: "Proporção", value: "1:16", sub: "15g café / 240ml água", icon: Scale },
                { label: "Temperatura", value: "92°C", sub: "Água filtrada", icon: Thermometer },
                { label: "Tempo", value: "2:30 min", sub: "Extração total", icon: Clock },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-3xl p-8 border border-white/5 text-center group hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-50 group-hover:text-zinc-950 transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-2">{item.label}</span>
                  <span className="block text-2xl font-bold mb-1">{item.value}</span>
                  <span className="text-zinc-500 text-xs">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
