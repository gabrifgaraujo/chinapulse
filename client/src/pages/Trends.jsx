import React, { useEffect, useState } from 'react';
import {
  Search,
  Flame,
  Globe,
  Tag,
  ExternalLink,
  Sparkles,
  Layers,
  LayoutGrid,
  Table as TableIcon,
  X,
  AlertTriangle,
  RefreshCw,
  Package,
  Calendar,
  ChevronRight
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

export default function Trends() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedTrend, setSelectedTrend] = useState(null);

  const fetchTrends = () => {
    setLoading(true);
    setError(null);
    let url = 'http://localhost:5000/api/trends?';
    if (category) url += `category=${category}&`;
    if (platform) url += `platform=${platform}&`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}: Erro ao carregar tendências`);
        return res.json();
      })
      .then((data) => {
        setTrends(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Falha ao buscar tendências.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTrends();
  }, [category, platform]);

  // Filtragem local por texto de busca
  const filteredTrends = trends.filter((t) =>
    t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-slate-900 pb-8">
        <h2 className="text-3xl font-bold text-white tracking-tighter">Market Trends</h2>
        <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest">Global Surveillance // {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#0a0a0a] border border-slate-900 p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3 bg-[#050505] px-4 py-2 border border-slate-900 flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-700" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
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

        <div className="flex items-center gap-1 bg-[#0a0a0a] border border-slate-900 p-1">
          <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-white text-black' : 'text-slate-600'}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('table')} className={`p-2 ${viewMode === 'table' ? 'bg-white text-black' : 'text-slate-600'}`}>
            <TableIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 text-xs uppercase tracking-widest">Synchronizing...</div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrends.map((trend) => (
                <div
                  key={trend._id}
                  onClick={() => setSelectedTrend(trend)}
                  className="bg-[#0a0a0a] border border-slate-900 p-8 flex flex-col justify-between hover:border-slate-700 transition-all cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-900 px-2 py-1">
                        {trend.category}
                      </span>
                      <span className="text-[10px] font-bold text-white tracking-widest">
                        {trend.viralityScore} SCORE
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-lg tracking-tight">
                        {trend.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                        {trend.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-900 flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    <span>IMPACT: {trend.brazilImpactScore || 0}%</span>
                    <span>DETAILS →</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0a0a0a] border border-slate-900 overflow-hidden">
              <table className="w-full text-left text-xs uppercase font-bold tracking-widest">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500">
                    <th className="py-4 px-6">TREND</th>
                    <th className="py-4 px-6">CATEGORY</th>
                    <th className="py-4 px-6">VIRALITY</th>
                    <th className="py-4 px-6">IMPACT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {filteredTrends.map((trend) => (
                    <tr key={trend._id} onClick={() => setSelectedTrend(trend)} className="hover:bg-slate-900/50 cursor-pointer text-white">
                      <td className="py-4 px-6">{trend.title}</td>
                      <td className="py-4 px-6 text-slate-500">{trend.category}</td>
                      <td className="py-4 px-6">{trend.viralityScore}</td>
                      <td className="py-4 px-6">{trend.brazilImpactScore || 0}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Modal de Detalhes da Tendência */}
      {selectedTrend && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#050505] border border-slate-900 w-full max-w-xl p-10 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button onClick={() => setSelectedTrend(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-900 px-2 py-1">
                  {selectedTrend.category}
                </span>
                <h3 className="text-3xl font-bold text-white tracking-tighter mt-4">{selectedTrend.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0a0a0a] p-6 border border-slate-900 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Flame className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest relative z-10">Virality Score</p>
                  <p className="text-3xl font-bold text-white mt-1 relative z-10">{selectedTrend.viralityScore}</p>
                </div>
                <div className="bg-[#0a0a0a] p-6 border border-slate-900 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Globe className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest relative z-10">Brazil Impact</p>
                  <p className="text-3xl font-bold text-white mt-1 relative z-10">{selectedTrend.brazilImpactScore || 0}%</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-2">Analysis Context</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {selectedTrend.description}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-2">Growth Trajectory</h4>
                <div className="h-40 w-full bg-[#0a0a0a] border border-slate-900 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { name: 'W1', v: 10, i: 5 },
                      { name: 'W2', v: 25, i: 12 },
                      { name: 'W3', v: 45, i: 20 },
                      { name: 'W4', v: selectedTrend.viralityScore * 0.7, i: 35 },
                      { name: 'W5', v: selectedTrend.viralityScore, i: selectedTrend.brazilImpactScore },
                    ]}>
                      <defs>
                        <linearGradient id="colorVirality" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fff" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#050505', borderColor: '#334155', fontSize: '10px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="v" stroke="#fff" fillOpacity={1} fill="url(#colorVirality)" strokeWidth={2} name="Virality" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-900">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Origin Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrend.platforms?.map(p => (
                      <span key={p} className="text-[9px] bg-white text-black px-2 py-1 font-bold uppercase tracking-tighter">
                        {p}
                      </span>
                    )) || <span className="text-xs text-slate-600">Global Web</span>}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Related Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrend.tags?.map(t => (
                      <span key={t} className="text-[9px] text-slate-400 border border-slate-800 px-2 py-1 uppercase tracking-widest">
                        #{t}
                      </span>
                    )) || <span className="text-xs text-slate-600">—</span>}
                  </div>
                </div>
              </div>

              {selectedTrend.relatedProducts && selectedTrend.relatedProducts.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Monetization Opportunities</h4>
                  <div className="space-y-2">
                    {selectedTrend.relatedProducts.map((prod, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-slate-900 hover:border-slate-700 transition-colors cursor-pointer group">
                        <span className="text-xs text-white font-bold">{typeof prod === 'string' ? prod : prod.name}</span>
                        <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-white transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
