import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex">
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-6">
        <Link href="/admin" className="text-xl font-bold tracking-tighter">
          AZO ADMIN
        </Link>
        <nav className="flex flex-col gap-3">
          <Link href="/admin/products" className="text-sm font-medium text-zinc-50 transition-colors">Produtos</Link>
          <Link href="/admin/orders" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Pedidos</Link>
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors mt-8">Voltar para Loja</Link>
        </nav>
      </aside>
      
      <main className="flex-1 p-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Produtos</h1>
          <button className="px-4 py-2 bg-zinc-50 text-zinc-950 font-semibold rounded-lg hover:bg-zinc-200 transition-colors">
            Novo Produto
          </button>
        </div>
        
        <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 font-medium text-zinc-400">Nome</th>
                <th className="p-4 font-medium text-zinc-400">Categoria</th>
                <th className="p-4 font-medium text-zinc-400">Status</th>
                <th className="p-4 font-medium text-zinc-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="p-8 text-center text-zinc-500">Nenhum produto cadastrado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
