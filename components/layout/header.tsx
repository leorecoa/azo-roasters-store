'use client';

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { useEffect, useState } from "react";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter group-hover:tracking-widest transition-all duration-500">AZO</span>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mt-1">Roasters</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          {['Catálogo', 'Cursos', 'Sobre', 'Contato'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Catálogo' ? '/#catalogo' : '#'} 
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/account" className="hidden md:block text-zinc-400 hover:text-zinc-50 transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <Link href="/cart" className="relative group">
            <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-zinc-50 transition-colors" />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-4 h-4 bg-zinc-50 text-zinc-950 text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
          <button 
            className="md:hidden text-zinc-400 hover:text-zinc-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-white/5 p-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {['Catálogo', 'Cursos', 'Sobre', 'Contato', 'Minha Conta'].map((item) => (
                <Link 
                  key={item} 
                  href={item === 'Catálogo' ? '/#catalogo' : item === 'Minha Conta' ? '/account' : '#'} 
                  className="text-lg font-bold tracking-tight text-zinc-400 hover:text-zinc-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
