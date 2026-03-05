import Link from "next/link";
import { Header } from "@/components/layout/header";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header />
      
      <main className="max-w-4xl mx-auto p-6 py-12">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">Minha Conta</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <nav className="flex flex-col gap-2">
              <button className="text-left px-4 py-2 bg-white/5 rounded-lg font-medium">Meus Pedidos</button>
              <button className="text-left px-4 py-2 hover:bg-white/5 rounded-lg text-zinc-400 transition-colors">Perfil</button>
              <button className="text-left px-4 py-2 hover:bg-white/5 rounded-lg text-zinc-400 transition-colors">Sair</button>
            </nav>
          </div>
          <div className="md:col-span-2">
            <div className="bg-zinc-900 rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Pedidos Recentes</h2>
              <p className="text-zinc-400 text-sm">Você ainda não fez nenhum pedido.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
