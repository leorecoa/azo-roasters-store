'use client';

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const PRODUCTS = [
  {
    id: "p1",
    slug: "espresso-house",
    name: "Espresso House",
    description: "Um blend clássico com notas de chocolate amargo, caramelo e nozes.",
    price: 4500,
    theme: { bg: "bg-amber-950/30", glow: "from-amber-500/20", heroGlow: "bg-amber-500/10" }
  },
  {
    id: "p2",
    slug: "microlote-frutado",
    name: "Microlote Frutado",
    description: "Café especial com fermentação anaeróbica. Notas intensas de frutas vermelhas.",
    price: 6500,
    theme: { bg: "bg-rose-950/30", glow: "from-rose-500/20", heroGlow: "bg-rose-500/10" }
  },
  {
    id: "p3",
    slug: "curso-metodos",
    name: "Curso de Métodos",
    description: "Aprenda a extrair o melhor do seu café em casa.",
    price: 15000,
    theme: { bg: "bg-emerald-950/30", glow: "from-emerald-500/20", heroGlow: "bg-emerald-500/10" }
  }
];

export default function StorePage() {
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProductIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeProduct = PRODUCTS[activeProductIndex];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-800">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 min-h-[80vh] flex items-center py-20">
          {/* Dynamic Glow Background */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] ${activeProduct.theme.heroGlow} blur-[120px] rounded-full pointer-events-none`}
            />
          </AnimatePresence>
          
          <div className="max-w-6xl mx-auto p-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.9]">
                  Café especial<br />
                  <span className="text-zinc-500 italic font-serif">sem frescura.</span>
                </h1>
                <p className="text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed">
                  Torrefação artesanal focada em extrair o máximo potencial de cada grão. 
                  Microlotes exclusivos e blends desenvolvidos para a melhor experiência na sua xícara.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="#catalogo" 
                    className="px-8 py-4 bg-zinc-50 text-zinc-950 font-semibold rounded-full hover:bg-zinc-200 transition-colors"
                  >
                    Ver Catálogo
                  </Link>
                  <Link 
                    href="/products/curso-metodos" 
                    className="px-8 py-4 bg-white/5 border border-white/10 text-zinc-50 font-semibold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    Cursos e Workshops
                  </Link>
                </div>
              </motion.div>

              {/* Featured Product Carousel */}
              <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full max-w-md"
                  >
                    <Link href={`/products/${activeProduct.slug}`} className="block group">
                      <div className={`aspect-square ${activeProduct.theme.bg} rounded-3xl border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl`}>
                        <div className={`absolute inset-0 bg-gradient-to-tr ${activeProduct.theme.glow} to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500`}></div>
                        
                        <div className="relative z-10 flex justify-between items-start">
                          <span className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md border border-white/10 text-white">
                            Destaque
                          </span>
                          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                          </div>
                        </div>

                        <div className="relative z-10 text-center my-auto">
                          <span className="text-zinc-800 text-8xl md:text-9xl font-bold tracking-tighter mix-blend-overlay transform group-hover:scale-110 transition-transform duration-700 block">AZO</span>
                        </div>

                        <div className="relative z-10">
                          <h3 className="text-3xl font-bold mb-3">{activeProduct.name}</h3>
                          <p className="text-zinc-300 text-base mb-5 line-clamp-2 leading-relaxed">{activeProduct.description}</p>
                          <p className="font-semibold text-xl">R$ {(activeProduct.price / 100).toFixed(2).replace('.', ',')}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Indicators */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                  {PRODUCTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveProductIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${i === activeProductIndex ? 'bg-white w-8' : 'bg-white/20 hover:bg-white/40 w-2'}`}
                      aria-label={`Ir para produto ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalogo" className="max-w-6xl mx-auto p-6 py-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 flex items-end justify-between"
          >
            <div>
              <h2 className="text-4xl font-bold tracking-tighter mb-4">Catálogo</h2>
              <p className="text-zinc-400 max-w-md">
                Nossa seleção atual de grãos torrados semanalmente.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link href={`/products/${product.slug}`} className="group block h-full">
                  <div className={`aspect-[4/5] ${product.theme.bg} rounded-3xl mb-6 border border-white/5 group-hover:border-white/20 transition-all duration-500 flex items-center justify-center overflow-hidden relative`}>
                    <div className={`absolute inset-0 bg-gradient-to-tr ${product.theme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                    <span className="text-zinc-800 text-6xl font-bold tracking-tighter mix-blend-overlay transform group-hover:scale-110 transition-transform duration-700">AZO</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-xl mb-1">{product.name}</h3>
                      <p className="text-zinc-400 text-sm">A partir de R$ {(product.price / 100).toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
