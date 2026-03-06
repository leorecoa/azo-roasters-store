'use client';

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, Coffee, Sparkles, Zap, ArrowRight, ShoppingBag } from "lucide-react";

const PRODUCTS = [
  {
    id: "p1",
    slug: "mel-de-aurora",
    name: "Mel de Aurora",
    description: "Edição Especial Dia das Mulheres. Notas de mel, jasmim e pêssego.",
    price: 6800,
    theme: { bg: "bg-amber-950/30", glow: "from-amber-500/20", heroGlow: "bg-amber-500/10" },
    tag: "Edição Especial"
  },
  {
    id: "p2",
    slug: "flor-de-tangerina",
    name: "Flor de Tangerina",
    description: "Microlote Premiado. Acidez cítrica vibrante com notas florais.",
    price: 5500,
    theme: { bg: "bg-orange-950/30", glow: "from-orange-500/20", heroGlow: "bg-orange-500/10" },
    tag: "Microlote"
  },
  {
    id: "p3",
    slug: "manga-rosa",
    name: "Manga Rosa",
    description: "Microlote Premiado. Doçura intensa de frutas tropicais e corpo sedoso.",
    price: 5500,
    theme: { bg: "bg-rose-950/30", glow: "from-rose-500/20", heroGlow: "bg-rose-500/10" },
    tag: "Microlote"
  }
];

const ACCESSORIES = [
  { name: "Balança Barista", price: 28000, slug: "balanca-barista", size: "large" },
  { name: "Prensa Francesa", price: 12000, slug: "prensa-francesa", size: "small" },
  { name: "Koar Cerâmica", price: 15000, slug: "koar-ceramica", size: "small" },
  { name: "Chaleira Inox", price: 22000, slug: "chaleira-inox", size: "medium" },
];

export default function StorePage() {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProductIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeProduct = PRODUCTS[activeProductIndex];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-800">
      <Header />
      
      <main>
        {/* Hero Section - Editorial Style */}
        <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden border-b border-white/5">
          <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className={`absolute inset-0 ${activeProduct.theme.heroGlow} blur-[160px] opacity-40`}
              />
            </AnimatePresence>
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-6">
                    Torrefação Artesanal • São Paulo
                  </span>
                  <h1 className="text-7xl md:text-[120px] font-serif italic leading-[0.85] tracking-tighter mb-8">
                    A arte de <br />
                    <span className="text-zinc-50 not-italic font-sans font-bold">torrar café.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-zinc-400 max-w-lg mb-12 leading-relaxed">
                    Elevamos o café ao seu estado mais puro. Microlotes selecionados à mão, 
                    torrados com precisão científica e paixão artística.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <Link 
                      href="#catalogo" 
                      className="group flex items-center gap-3 px-8 py-4 bg-zinc-50 text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-all"
                    >
                      Explorar Grãos
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      href="/account" 
                      className="px-8 py-4 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-colors"
                    >
                      Minha Conta
                    </Link>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5 hidden lg:block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                  >
                    <div className={`aspect-[4/5] ${activeProduct.theme.bg} rounded-[40px] border border-white/10 p-12 flex flex-col justify-between shadow-2xl backdrop-blur-3xl`}>
                      <div className="flex justify-between items-start">
                        <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10">
                          {activeProduct.tag}
                        </span>
                        <Sparkles className="w-5 h-5 text-zinc-500" />
                      </div>
                      <div className="text-center py-12">
                        <span className="text-zinc-50 text-9xl font-bold tracking-tighter opacity-10 select-none">AZO</span>
                      </div>
                      <div>
                        <h3 className="text-3xl font-serif italic mb-2">{activeProduct.name}</h3>
                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{activeProduct.description}</p>
                        <Link 
                          href={`/products/${activeProduct.slug}`}
                          className="flex items-center justify-between group/btn"
                        >
                          <span className="text-xl font-bold">R$ {(activeProduct.price / 100).toFixed(2).replace('.', ',')}</span>
                          <div className="w-12 h-12 rounded-full bg-zinc-50 text-zinc-950 flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                            <ShoppingBag className="w-5 h-5" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
          </motion.div>
        </section>

        {/* Interactive Flavor Profile Section */}
        <section className="py-32 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-5xl font-serif italic mb-8 leading-tight">
                  Qual o seu <br />
                  <span className="text-zinc-50 not-italic font-sans font-bold">perfil de sabor?</span>
                </h2>
                <div className="space-y-4">
                  {[
                    { title: "Clássico & Chocolate", desc: "Notas de caramelo, nozes e cacau.", icon: Coffee },
                    { title: "Frutado & Vibrante", desc: "Acidez cítrica e notas de frutas vermelhas.", icon: Zap },
                    { title: "Exótico & Floral", desc: "Notas complexas de jasmim e especiarias.", icon: Sparkles },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: 10 }}
                      className="w-full p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-6 text-left hover:bg-white/10 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-50 group-hover:text-zinc-950 transition-colors">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-zinc-500 text-sm">{item.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 ml-auto text-zinc-700 group-hover:text-zinc-50 transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-[60px] blur-3xl" />
                <div className="relative h-full w-full bg-zinc-900 rounded-[60px] border border-white/10 overflow-hidden flex items-center justify-center">
                  <span className="text-zinc-800 text-[200px] font-bold tracking-tighter select-none">AZO</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-white/20 animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section - Editorial Grid */}
        <section id="catalogo" className="max-w-7xl mx-auto px-6 py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Coleção Atual</span>
              <h2 className="text-6xl font-bold tracking-tighter">Microlotes <br /><span className="text-zinc-500 italic font-serif">Limitados</span></h2>
            </div>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              Nossa curadoria de grãos é dinâmica. Cada lote é único e disponível apenas enquanto durarem os estoques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Link href={`/products/${product.slug}`} className="group block">
                  <div className={`aspect-[3/4] ${product.theme.bg} rounded-[40px] mb-8 border border-white/5 overflow-hidden relative`}>
                    <div className={`absolute inset-0 bg-gradient-to-tr ${product.theme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-zinc-800 text-7xl font-bold tracking-tighter mix-blend-overlay group-hover:scale-110 transition-transform duration-1000">AZO</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-serif italic mb-2">{product.name}</h3>
                      <p className="text-zinc-500 text-sm mb-4">{product.description}</p>
                      <span className="text-lg font-bold">R$ {(product.price / 100).toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-zinc-50 group-hover:text-zinc-950 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Accessories Bento Grid */}
        <section className="bg-white/5 py-32 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-24 text-center">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Equipamentos</span>
              <h2 className="text-5xl font-bold tracking-tighter">O Ritual <span className="text-zinc-500 italic font-serif">Completo</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
              {ACCESSORIES.map((item, i) => (
                <Link 
                  key={i} 
                  href={`/products/${item.slug}`}
                  className={`relative group overflow-hidden rounded-[32px] bg-zinc-900 border border-white/5 ${
                    item.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                    item.size === 'medium' ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl font-bold tracking-tighter">AZO</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h4 className="text-xl font-bold mb-1">{item.name}</h4>
                    <p className="text-zinc-500 font-medium">R$ {(item.price / 100).toFixed(2).replace('.', ',')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-32 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="text-6xl font-serif italic mb-8 leading-tight">
              Pronto para uma <br />
              <span className="text-zinc-50 not-italic font-sans font-bold">experiência superior?</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-12">
              Junte-se à nossa comunidade de coffee lovers e receba novidades sobre microlotes exclusivos.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-zinc-50 transition-colors"
              />
              <button className="px-8 py-4 bg-zinc-50 text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-colors">
                Assinar
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-zinc-600 text-xs font-bold tracking-[0.3em] uppercase">
          © 2026 Azo Roasters • Crafted with Passion
        </p>
      </footer>
    </div>
  );
}
