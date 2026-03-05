import Link from "next/link";

export default function AdminOrdersPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex">
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-6">
        <Link href="/admin" className="text-xl font-bold tracking-tighter">
          AZO ADMIN
        </Link>
        <nav className="flex flex-col gap-3">
          <Link href="/admin/products" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Produtos</Link>
          <Link href="/admin/orders" className="text-sm font-medium text-zinc-50 transition-colors">Pedidos</Link>
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors mt-8">Voltar para Loja</Link>
        </nav>
      </aside>
      
      <main className="flex-1 p-12">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">Pedidos</h1>
        
        <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 font-medium text-zinc-400">ID</th>
                <th className="p-4 font-medium text-zinc-400">Cliente</th>
                <th className="p-4 font-medium text-zinc-400">Data</th>
                <th className="p-4 font-medium text-zinc-400">Total</th>
                <th className="p-4 font-medium text-zinc-400">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-500">Nenhum pedido encontrado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
