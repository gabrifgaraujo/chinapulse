import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  Package,
  Bell,
  Flame,
  Sparkles,
  Layers,
  ArrowRight,
  AlertTriangle,
  RefreshCw,
  Zap,
  Target,
  BarChart3,
  Activity,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = () => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/dashboard')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro no servidor: Status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar dados do dashboard:', err);
        setError(err.message || 'Falha ao conectar com o servidor da API.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Dados mockados para evolução temporal de tendências (Linha/Área)
  const evolutionData = [
    { label: 'Semana 1', viralidade: 42, impactoBR: 28 },
    { label: 'Semana 2', viralidade: 58, impactoBR: 40 },
    { label: 'Semana 3', viralidade: 70, impactoBR: 55 },
    { label: 'Semana 4', viralidade: 88, impactoBR: 72 },
    { label: 'Semana 5', viralidade: 96, impactoBR: 85 },
  ];

  // Cores dinâmicas para categorias
  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-400 space-y-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-red-500 animate-spin"></div>
          <Sparkles className="w-5 h-5 text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-sm font-medium animate-pulse">Carregando Radar de Inteligência China → Brasil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto mt-12">
        <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Não foi possível carregar o Dashboard</h3>
          <p className="text-sm text-slate-400">{error}</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-xl text-sm transition-all shadow-lg shadow-red-600/20"
        >
          <RefreshCw className="w-4 h-4" /> Tentar Novamente
        </button>
      </div>
    );
  }

  const summary = stats?.summaryCards || { totalTrends: 0, totalProducts: 0, activeAlerts: 0 };
  const topTrends = stats?.topTrends || [];
  const topProducts = stats?.topProducts || [];
  const categoryDist = stats?.categoryDistribution || [];

  // Calcular Score Médio de Impacto (baseado nos topTrends)
  const avgImpactScore = topTrends.length > 0
    ? Math.round(topTrends.reduce((acc, t) => acc + (t.brazilImpactScore || 0), 0) / topTrends.length)
    : 84;

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-slate-900 pb-8">
        <h2 className="text-3xl font-bold text-white tracking-tighter">Market Intelligence</h2>
        <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest">Dashboard // {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      {/* 4 Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Trends', value: summary.totalTrends, change: '+12%', icon: Flame },
          { label: 'Market Opps', value: summary.totalProducts, change: '+4.5%', icon: Target },
          { label: 'Impact Score', value: `${avgImpactScore}%`, change: '-2.1%', icon: Activity },
          { label: 'Active Alerts', value: summary.activeAlerts, change: '0', icon: Bell },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-slate-900 p-6 flex flex-col justify-between group hover:border-slate-800 transition-colors">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-bold text-slate-500 tracking-widest">{stat.label}</p>
              <stat.icon className="w-4 h-4 text-slate-700 group-hover:text-slate-400" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <h3 className="text-3xl font-bold text-white tracking-tighter">{stat.value}</h3>
              <div className={`flex items-center text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : stat.change === '0' ? 'text-slate-500' : 'text-rose-500'}`}>
                {stat.change !== '0' && (stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />)}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-slate-900 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Trend Dynamics // Viral vs Impact</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-white"></div><span className="text-[9px] text-slate-500 uppercase font-bold">Virality</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-600"></div><span className="text-[9px] text-slate-500 uppercase font-bold">Impact</span></div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#171717" vertical={false} />
                <XAxis dataKey="label" stroke="#404040" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#404040" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#050505', borderColor: '#171717', fontSize: '12px' }} />
                <Area type="monotone" dataKey="viralidade" stroke="#ffffff" fill="url(#colorVirality)" strokeWidth={2} />
                <Area type="monotone" dataKey="impactoBR" stroke="#475569" fill="url(#colorImpact)" strokeWidth={2} />
                <defs>
                  <linearGradient id="colorVirality" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#fff" stopOpacity={0.1}/></linearGradient>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#475569" stopOpacity={0.1}/></linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-slate-900 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Distribution // Top Categories</h3>
            <span className="text-[9px] text-slate-600">TOTAL: 142</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDist}>
                <XAxis dataKey="category" stroke="#404040" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#050505', borderColor: '#171717', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#ffffff" radius={[2, 2, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Seção de Oportunidades */}
      <div className="bg-[#0a0a0a] border border-slate-900 p-8">
          <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-8">Hot Opportunities // High Growth Potential</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topProducts.slice(0, 3).map((prod, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#050505] border border-slate-900 hover:border-slate-700 transition-colors cursor-pointer group">
                      <div>
                          <p className="text-xs text-white font-bold">{prod.name}</p>
                          <p className="text-[9px] text-slate-500 uppercase mt-1">Score: {prod.opportunityScore}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors" />
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}
