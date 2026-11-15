import React, { useEffect, useState } from 'react';
import {
  Package,
  Search,
  Sparkles,
  DollarSign,
  Layers,
  X,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  ShoppingCart
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    let url = 'http://localhost:5000/api/products?';
    if (category) url += `category=${category}&`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}: Erro ao carregar produtos`);
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Falha ao buscar catálogo de produtos.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  // Filtragem local por termo de busca
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-slate-900 pb-8">
        <h2 className="text-3xl font-bold text-white tracking-tighter">Marketplace</h2>
        <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest">Inventory // {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#0a0a0a] border border-slate-900 p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3 bg-[#050505] px-4 py-2 border border-slate-900 flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-700" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent text-xs text-white placeholder:text-slate-700 focus:outline-none w-full"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#050505] border border-slate-900 px-4 py-2 text-xs text-slate-300 focus:outline-none"
        >
          <option value="">CATEGORY</option>
          <option value="moda">MODA</option>
          <option value="beleza">BELEZA</option>
          <option value="eletrônicos">ELETRÔNICOS</option>
          <option value="casa">CASA</option>
        </select>
      </div>

      {/* Grid de Produtos */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 text-xs uppercase tracking-widest">Scanning inventory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => setSelectedProduct(product)}
              className="bg-[#0a0a0a] border border-slate-900 p-8 flex flex-col justify-between hover:border-slate-700 transition-all cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-900 px-2 py-1">
                    {product.category || 'Geral'}
                  </span>
                  <span className="text-[10px] font-bold text-white tracking-widest bg-[#050505] px-2 py-1 border border-slate-900">
                    {product.opportunityScore} OPP
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col gap-4">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  <span>R$ {product.averagePrice?.toFixed(2) || '0.00'}</span>
                  <span>ANALYSIS →</span>
                </div>
                <div className="h-20 w-full bg-[#050505] overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${product._id}/400/200`}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity"
                    />
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500 border border-dashed border-slate-900">
              No products found.
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#050505] border border-slate-900 w-full max-w-lg p-10 relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tighter">{selectedProduct.name}</h3>

                {/* Image Placeholder */}
              <div className="aspect-video bg-[#0a0a0a] border border-slate-900 flex flex-col items-center justify-center text-slate-600 text-xs uppercase tracking-widest gap-2 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${selectedProduct._id}/600/400`}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0a0a0a] p-4 border border-slate-900">
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest">Opportunity</p>
                  <p className="text-xl font-bold text-white mt-1">{selectedProduct.opportunityScore}</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 border border-slate-900">
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest">Price (BRL)</p>
                  <p className="text-xl font-bold text-white mt-1">R$ {selectedProduct.averagePrice?.toFixed(2)}</p>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="h-32 w-full bg-[#0a0a0a] border border-slate-900 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { name: 'D-7', value: 40 },
                    { name: 'D-6', value: 45 },
                    { name: 'D-5', value: 38 },
                    { name: 'D-4', value: 55 },
                    { name: 'D-3', value: 60 },
                    { name: 'D-2', value: 75 },
                    { name: 'D-1', value: 90 },
                    { name: 'HOJE', value: 85 },
                  ]}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fff" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#fff" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#050505', borderColor: '#334155', fontSize: '10px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Details List */}
              <div className="space-y-3 pt-4 border-t border-slate-900">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 uppercase tracking-widest">Category</span>
                  <span className="text-white font-bold uppercase tracking-widest">{selectedProduct.category || '—'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 uppercase tracking-widest">Platforms</span>
                  <span className="text-white font-bold uppercase tracking-widest">{selectedProduct.platforms?.join(', ') || '—'}</span>
                </div>
                {selectedProduct.highScoreReason && (
                  <div className="flex justify-between items-start text-xs gap-4">
                    <span className="text-slate-500 uppercase tracking-widest shrink-0">High Score Reason</span>
                    <span className="text-white font-bold uppercase tracking-widest text-right">{selectedProduct.highScoreReason}</span>
                  </div>
                )}
                {(selectedProduct.relatedTrend || selectedProduct.relatedTrends?.[0]?.title || (typeof selectedProduct.relatedTrends?.[0] === 'string' && selectedProduct.relatedTrends[0])) && (
                  <div className="flex justify-between items-start text-xs gap-4">
                    <span className="text-slate-500 uppercase tracking-widest shrink-0">Related Trend</span>
                    <span className="text-white font-bold uppercase tracking-widest text-right">
                      {selectedProduct.relatedTrend || selectedProduct.relatedTrends?.[0]?.title || selectedProduct.relatedTrends?.[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
