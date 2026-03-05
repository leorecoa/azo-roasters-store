import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex">
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-6">
        <Link href="/admin" className="text-xl font-bold tracking-tighter">
          AZO ADMIN
        </Link>
        <nav className="flex flex-col gap-3">
          <Link href="/admin/products" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Produtos</Link>
          <Link href="/admin/orders" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Pedidos</Link>
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors mt-8">Voltar para Loja</Link>
        </nav>
      </aside>
      
      <main className="flex-1 p-12">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Vendas Hoje</h3>
            <p className="text-3xl font-semibold">R$ 0,00</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Pedidos Pendentes</h3>
            <p className="text-3xl font-semibold">0</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Produtos Ativos</h3>
            <p className="text-3xl font-semibold">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
