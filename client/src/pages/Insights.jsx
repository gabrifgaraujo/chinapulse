import React from 'react';
import {
  Lightbulb,
  TrendingUp,
  Zap,
  Target,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  BarChart2,
  PieChart as PieChartIcon,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

export default function Insights() {
  const comparisonData = [
    {
      metric: 'Tempo de Adoção de Tendência',
      china: 'Viralização relâmpago em 3 a 5 dias (Douyin / Xiaohongshu)',
      brasil: 'Início de tração em 2 a 4 semanas (TikTok BR / Reels)'
    },
    {
      metric: 'Categorias de Maior Demanda',
      china: 'Smart Beauty, Gadgets Pets, Moda Y2K, Utensílios de Cozinha Smart',
      brasil: 'Skincare Coreano/Chinês, Acessórios Fitness, Casa Inteligente'
    },
    {
      metric: 'Canais de Divulgação Principal',
      china: 'Live Streaming de Fábrica, Reviews em Vídeo Curto, Social Commerce',
      brasil: 'Influencers de TikTok/Instagram, Tráfego Pago (Meta Ads)'
    }
  ];

  const recentTimeline = [
    {
      date: 'Há 3 dias',
      title: 'Dispositivos de Limpeza Facial Ultrassônica (Gua Sha Tech)',
      category: 'Beleza',
      impact: '92% Impacto BR'
    },
    {
      date: 'Há 5 dias',
      title: 'Organizadores Magnéticos Transparentes para Cozinha',
      category: 'Casa',
      impact: '88% Impacto BR'
    },
    {
      date: 'Há 1 semana',
      title: 'Miniventiladores Portáteis com Display Digital',
      category: 'Eletrônicos',
      impact: '95% Impacto BR'
    },
    {
      date: 'Há 2 semanas',
      title: 'Acessórios de Moda Balletcore & Laços de Cetim',
      category: 'Moda',
      impact: '90% Impacto BR'
    }
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-slate-900 pb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter">Insights & Arbitrage</h2>
          <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest">Analytics // {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="flex gap-2">
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 uppercase tracking-widest">System Live</span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1 uppercase tracking-widest">v2.4.0</span>
        </div>
      </div>

      {/* Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
              { label: 'Growth Vector', value: '+124%', icon: Activity, color: 'text-white' },
              { label: 'Avg Arbitrage', value: '3.2x', icon: Target, color: 'text-white' },
              { label: 'Market Velocity', value: 'High', icon: Zap, color: 'text-emerald-500' },
              { label: 'Risk Factor', value: 'Low', icon: ShieldCheck, color: 'text-slate-400' },
          ].map((stat, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-slate-900 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest">{stat.label}</p>
                      <stat.icon className="w-4 h-4 text-slate-700" />
                  </div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            {/* Chart Section */}
            <div className="bg-[#0a0a0a] border border-slate-900 p-8 space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Category Distribution // Opportunity Volume</h3>
                    <BarChart2 className="w-4 h-4 text-slate-700" />
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            { name: 'MODA', value: 85, color: '#fff' },
                            { name: 'BELEZA', value: 72, color: '#cbd5e1' },
                            { name: 'CASA', value: 45, color: '#94a3b8' },
                            { name: 'ELETRÔNICOS', value: 92, color: '#64748b' },
                            { name: 'PETS', value: 38, color: '#475569' },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{fill: '#0f172a'}}
                                contentStyle={{ backgroundColor: '#050505', border: '1px solid #1e293b', borderRadius: '0', fontSize: '10px' }}
                            />
                            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                                {[0,1,2,3,4].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#fff' : '#334155'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-[#0a0a0a] border border-slate-900 p-8 space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Comparative Data // Market Dynamics</h3>
                <span className="text-[9px] text-slate-600 font-mono tracking-widest">CN_BR_LATENCY_REPORT</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px] uppercase font-bold tracking-widest">
                  <thead className="text-slate-600 border-b border-slate-900">
                    <tr>
                      <th className="pb-4 font-black">Metric</th>
                      <th className="pb-4 font-black">China (Origin)</th>
                      <th className="pb-4 font-black">Brazil (Destination)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-white">
                    {comparisonData.map((item, idx) => (
                      <tr key={idx} className="group hover:bg-slate-900/30 transition-colors">
                        <td className="py-6 pr-4 align-top text-slate-300 group-hover:text-white">{item.metric}</td>
                        <td className="py-6 pr-4 align-top text-slate-500 font-medium leading-relaxed">{item.china}</td>
                        <td className="py-6 align-top text-slate-500 font-medium leading-relaxed">{item.brasil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-[#0a0a0a] border border-slate-900 p-8 space-y-8">
              <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">STRATEGIC Directives</h3>
              <div className="space-y-6">
                {[
                    { label: 'Opportunity Window', value: '2-4 week lag allows high margin arbitrage.', icon: Clock },
                    { label: 'Compliance Risk', value: 'Always validate Anvisa/Inmetro before scaling.', icon: ShieldCheck },
                    { label: 'Scale Potential', value: 'High for micro-niches in home decor.', icon: TrendingUp },
                ].map((item, i) => (
                    <div key={i} className="bg-[#050505] p-6 border border-slate-900 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                            <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">{item.label}</p>
                        <p className="text-xs text-slate-300 leading-relaxed mt-3 font-medium">{item.value}</p>
                    </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-slate-900 p-8 space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Market Pulse</h3>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Realtime</span>
                    </div>
                </div>
                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                            { v: 40 }, { v: 45 }, { v: 42 }, { v: 50 }, { v: 48 }, { v: 55 }, { v: 52 }, { v: 60 }
                        ]}>
                            <Area type="stepAfter" dataKey="v" stroke="#fff" fill="#fff" fillOpacity={0.05} strokeWidth={1} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                    Generate Full Report <ArrowUpRight className="w-3 h-3" />
                </button>
            </div>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-slate-900 p-8 space-y-8">
        <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Surveillance Timeline</h3>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white"></div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">High Impact</span>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentTimeline.map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 p-6 border border-slate-900 bg-[#050505] group hover:border-slate-700 transition-all">
              <div className="w-20 text-[9px] font-bold text-slate-500 tracking-widest uppercase border-r border-slate-900 pr-4">{item.date}</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{item.title}</p>
                <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{item.category}</span>
                    <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Priority Detection</span>
                </div>
              </div>
              <div className="text-[11px] font-black text-white tracking-widest bg-slate-900 px-3 py-1 border border-slate-800">{item.impact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
