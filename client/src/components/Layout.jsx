import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Lightbulb,
  Bell,
  Search,
  Globe2,
  UserCircle2
} from 'lucide-react';

export default function Layout() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Tendências', path: '/trends', icon: TrendingUp },
    { name: 'Produtos', path: '/products', icon: Package },
    { name: 'Insights', path: '/insights', icon: Lightbulb },
    { name: 'Alertas', path: '/alerts', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-slate-900 flex flex-col fixed inset-y-0 z-50">
        {/* Logo / Brand */}
        <div className="h-20 flex items-center px-8 border-b border-slate-900 gap-3">
          <div className="bg-white p-2 rounded-sm text-black">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tighter text-white">ChinaPulse</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Intelligence</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-sm text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white border-l-2 border-white'
                      : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-300'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div className="p-6 border-t border-slate-900">
          <div className="bg-[#0f0f0f] p-3 rounded-sm border border-slate-900">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Mercado: Brasil</p>
            <p className="text-[9px] text-slate-600 mt-1">Data: 14/11/2026</p>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col pl-64">
        {/* Header */}
        <header className="h-20 bg-[#050505]/80 backdrop-blur-md border-b border-slate-900 sticky top-0 z-40 px-10 flex items-center justify-between">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="text"
                placeholder="Search metrics..."
                className="w-full bg-[#0a0a0a] border border-slate-900 rounded-sm pl-10 pr-4 py-2 text-xs text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-slate-700 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-900">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold border border-slate-800">
                CP
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-10 bg-[#050505] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
