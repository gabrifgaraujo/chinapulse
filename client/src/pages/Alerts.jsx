import React, { useEffect, useState } from 'react';
import { Bell, Plus, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const fetchAlerts = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/alerts')
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleCreateAlert = (e) => {
    e.preventDefault();
    if (!keyword) return;

    fetch('http://localhost:5000/api/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword, category, userId: 'user-demo-123' })
    })
      .then(res => res.json())
      .then(() => {
        setKeyword('');
        setCategory('');
        fetchAlerts();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/alerts/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetchAlerts())
      .catch(err => console.error(err));
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-slate-900 pb-8">
        <h2 className="text-3xl font-bold text-white tracking-tighter">System Alerts</h2>
        <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest">Notification Engine // {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      {/* Form Criar Alerta */}
      <div className="bg-[#0a0a0a] border border-slate-900 p-8">
        <h3 className="text-xs font-bold text-slate-400 tracking-widest mb-6 uppercase">New Alert Configuration</h3>
        <form onSubmit={handleCreateAlert} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="bg-[#050505] border border-slate-900 px-4 py-3 text-xs text-white placeholder:text-slate-700 focus:outline-none"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#050505] border border-slate-900 px-4 py-3 text-xs text-slate-300 focus:outline-none"
          >
            <option value="">CATEGORY</option>
            <option value="beleza">BELEZA</option>
            <option value="moda">MODA</option>
            <option value="eletrônicos">ELETRÔNICOS</option>
            <option value="casa">CASA</option>
          </select>
          <button
            type="submit"
            className="bg-white text-black font-bold text-xs uppercase tracking-widest px-4 py-3"
          >
            Create
          </button>
        </form>
      </div>

      {/* Lista de Alertas */}
      <div className="bg-[#0a0a0a] border border-slate-900 p-8">
        <h3 className="text-xs font-bold text-slate-400 tracking-widest mb-6 uppercase">Active Monitors</h3>

        {loading ? (
          <div className="text-center py-10 text-slate-500 text-xs uppercase tracking-widest">Scanning...</div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert._id}
                className="bg-[#050505] border border-slate-900 p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="w-2 h-2 bg-white"></div>
                  <div>
                    <h4 className="font-bold text-white text-xs tracking-widest">{alert.keyword}</h4>
                    <p className="text-[9px] text-slate-600 uppercase tracking-widest mt-1">{alert.category || 'Geral'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest bg-slate-900 px-2 py-1">Active</span>
                  <button
                    onClick={() => handleDelete(alert._id)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {alerts.length === 0 && !loading && (
              <p className="text-center py-10 text-slate-700 text-xs uppercase tracking-widest">No active monitors.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
