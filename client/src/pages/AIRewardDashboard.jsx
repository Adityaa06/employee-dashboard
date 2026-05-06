import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Trophy, Star, Users, Clock, Brain, Search, BarChart2, Sparkles, Zap, Crown } from 'lucide-react';
import { enrichEmployees, getCategoryConfig, handleAIQuery } from '../utils/aiRewardLogic';

// ── Sub-components ──────────────────────────────────────────────

const CategoryBadge = ({ category }) => {
  const c = getCategoryConfig(category);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border ${c.bg} ${c.color} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {category}
    </span>
  );
};

const ScoreRing = ({ score, size = 52 }) => {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 90 ? '#10b981' : score >= 75 ? '#3b82f6' : score >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <span className="absolute text-[10px] font-black text-white">{score}</span>
    </div>
  );
};

const MiniBar = ({ value, max = 100, color = 'bg-emerald-500' }) => (
  <div className="flex items-center gap-2">
    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
    <span className="text-xs font-bold text-gray-300">{value}</span>
  </div>
);

// ── Main Component ──────────────────────────────────────────────

const AIRewardDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    axios.get('/api/employees')
      .then(res => setEmployees(enrichEmployees(res.data)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatHistory]);

  const top10 = [...employees].sort((a, b) => b.rewardScore - a.rewardScore).slice(0, 10);
  const byField = (field) => employees.reduce((best, e) => (!best || (e[field] || 0) > (best[field] || 0)) ? e : best, null);

  const insightCards = [
    { title: 'Star Performer', sub: 'Best Attendance', emp: byField('attendancePercentage'), val: `${byField('attendancePercentage')?.attendancePercentage}%`, icon: Trophy, iconBg: 'bg-yellow-500', border: 'border-yellow-500/20', bg: 'bg-yellow-500/10', color: 'text-yellow-400' },
    { title: 'Most Reliable', sub: 'Most Punctual', emp: byField('punctualityScore'), val: `${byField('punctualityScore')?.punctualityScore}/10`, icon: Clock, iconBg: 'bg-blue-500', border: 'border-blue-500/20', bg: 'bg-blue-500/10', color: 'text-blue-400' },
    { title: 'Best Collaborator', sub: 'Team Leader', emp: byField('collaborationScore'), val: `${byField('collaborationScore')?.collaborationScore}/10`, icon: Users, iconBg: 'bg-emerald-500', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
    { title: 'Top Performer', sub: 'Highest Rating', emp: byField('performanceRating'), val: `${byField('performanceRating')?.performanceRating}/5 ⭐`, icon: Star, iconBg: 'bg-purple-500', border: 'border-purple-500/20', bg: 'bg-purple-500/10', color: 'text-purple-400' },
  ];

  const rankMeta = [
    { emoji: '👑', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', color: 'text-yellow-400' },
    { emoji: '🥈', bg: 'bg-gray-400/10', border: 'border-gray-400/30', color: 'text-gray-300' },
    { emoji: '🥉', bg: 'bg-amber-600/10', border: 'border-amber-600/30', color: 'text-amber-600' },
  ];

  const submitQuery = () => {
    if (!query.trim()) return;
    const result = handleAIQuery(query, employees);
    setChatHistory(prev => [...prev, { query, ...result }]);
    setQuery('');
  };

  const SUGGESTIONS = ['show top employees', 'low attendance employees', 'best collaborator', 'who needs improvement', 'punctual employees', 'best performers'];

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Computing AI Reward Scores…</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
              <Brain size={22} className="text-primary" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">AI Reward Dashboard</h1>
          </div>
          <p className="text-gray-500 font-medium ml-14">AI-powered performance analytics &amp; reward intelligence</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-2xl border border-primary/20">
          <Zap size={15} className="text-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{employees.length} Employees Analysed</span>
        </div>
      </div>

      {/* ── Insight Cards ── */}
      <div>
        <h2 className="text-base font-black text-white tracking-tight mb-5 flex items-center gap-2">
          <Sparkles size={16} className="text-primary" /> Performance Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {insightCards.map((card, i) => (
            <div key={i} className={`glass-card p-6 rounded-[26px] border ${card.border} ${card.bg} group hover:scale-[1.03] transition-all duration-500 relative overflow-hidden`}>
              <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${card.iconBg}`} />
              <div className={`inline-flex p-3 rounded-2xl ${card.iconBg} text-white mb-4 shadow-lg`}>
                <card.icon size={18} />
              </div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${card.color} mb-0.5`}>{card.title}</p>
              <p className="text-gray-600 text-[9px] font-bold uppercase tracking-wider mb-3">{card.sub}</p>
              <p className="text-white font-black text-sm truncate">{card.emp?.fullName || '—'}</p>
              <p className="text-gray-500 text-[10px] mt-0.5">{card.emp?.department}</p>
              <div className={`mt-3 px-3 py-1.5 rounded-xl ${card.bg} border ${card.border} w-fit`}>
                <span className={`text-sm font-black ${card.color}`}>{card.val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Leaderboard + AI Assistant ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Top 10 Leaderboard */}
        <div className="lg:col-span-2 glass-card rounded-[32px] overflow-hidden">
          <div className="p-7 border-b border-white/5 flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <Trophy size={18} className="text-yellow-400" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">Top 10 Employees</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Ranked by AI Reward Score</p>
            </div>
          </div>
          <div className="p-4 space-y-1">
            {top10.map((emp, idx) => {
              const meta = idx < 3 ? rankMeta[idx] : null;
              return (
                <div key={emp.id} className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all group hover:bg-white/[0.04] ${idx < 3 ? 'bg-white/[0.025]' : ''}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm border flex-shrink-0 ${meta ? `${meta.bg} ${meta.border} ${meta.color}` : 'bg-white/5 border-white/10 text-gray-500'}`}>
                    {meta ? meta.emoji : idx + 1}
                  </div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm flex-shrink-0 ${idx < 3 ? 'bg-premium-gradient' : 'bg-white/5 border border-white/10'}`}>
                    {emp.fullName?.[0] || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-100 truncate group-hover:text-white transition-colors">{emp.fullName}</p>
                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest truncate">{emp.department} · {emp.position}</p>
                  </div>
                  <div className="hidden sm:block flex-shrink-0">
                    <CategoryBadge category={emp.aiCategory} />
                  </div>
                  <div className="flex-shrink-0">
                    <ScoreRing score={emp.rewardScore} size={48} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Performance Assistant */}
        <div className="glass-card rounded-[32px] overflow-hidden flex flex-col">
          <div className="p-5 border-b border-white/5 flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-xl border border-primary/30">
              <Brain size={16} className="text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white">AI Performance Assistant</h2>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Keyword-powered search</p>
            </div>
          </div>

          {/* Chat area */}
          <div ref={chatRef} className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[460px] min-h-[180px]">
            {chatHistory.length === 0 && (
              <div className="space-y-2 py-3">
                <p className="text-[10px] text-gray-600 text-center font-bold uppercase tracking-widest mb-3">Try asking:</p>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => setQuery(s)}
                    className="w-full text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-primary/10 border border-white/5 hover:border-primary/30 text-xs text-gray-400 hover:text-primary transition-all font-medium">
                    💬 {s}
                  </button>
                ))}
              </div>
            )}

            {chatHistory.map((entry, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-end">
                  <div className="px-3 py-2 bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm max-w-[85%]">
                    <p className="text-xs text-primary font-bold">{entry.query}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="px-3 py-2 bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm">
                    <p className="text-xs text-gray-300 font-semibold">{entry.message}</p>
                  </div>
                  {entry.results?.length > 0 && (
                    <div className="space-y-1">
                      {entry.results.slice(0, 5).map((emp, j) => {
                        const c = getCategoryConfig(emp.aiCategory);
                        return (
                          <div key={j} className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-xl border border-white/5">
                            <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-black text-primary flex-shrink-0">
                              {emp.fullName?.[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-200 truncate">{emp.fullName}</p>
                              <p className="text-[9px] text-gray-600 truncate">{emp.department}</p>
                            </div>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${c.bg} ${c.color} flex-shrink-0`}>
                              {emp.rewardScore}
                            </span>
                          </div>
                        );
                      })}
                      {entry.results.length > 5 && (
                        <p className="text-[10px] text-gray-600 text-center">+{entry.results.length - 5} more results</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text" value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitQuery()}
                placeholder="Ask about employees…"
                className="flex-1 bg-white/5 border border-white/10 focus:border-primary/40 rounded-xl px-4 py-2.5 text-xs text-gray-200 placeholder:text-gray-600 outline-none transition-all"
              />
              <button onClick={submitQuery} className="p-2.5 bg-primary rounded-xl hover:opacity-80 transition-all text-white">
                <Search size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full Performance Table ── */}
      <div className="glass-card rounded-[32px] overflow-hidden">
        <div className="p-7 border-b border-white/5 flex items-center gap-3">
          <div className="p-2 bg-secondary/10 rounded-xl border border-secondary/20">
            <BarChart2 size={18} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">All Employee Performance Metrics</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Full AI analysis · {employees.length} employees · sorted by reward score</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="dark-table-header">
                {['Employee', 'Dept', 'Attendance', 'Collaboration', 'Punctuality', 'Perf Rating', 'Reward Score', 'AI Category'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...employees].sort((a, b) => b.rewardScore - a.rewardScore).map(emp => (
                <tr key={emp.id} className="dark-table-row group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-primary flex-shrink-0">
                        {emp.fullName?.[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-100 whitespace-nowrap">{emp.fullName}</p>
                        <p className="text-[9px] text-gray-600 whitespace-nowrap">{emp.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold text-gray-400 whitespace-nowrap">{emp.department}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <MiniBar value={emp.attendancePercentage || 0} max={100} color={emp.attendancePercentage > 85 ? 'bg-emerald-500' : 'bg-red-500'} />
                  </td>
                  <td className="px-5 py-3.5">
                    <MiniBar value={emp.collaborationScore} max={10} color="bg-blue-500" />
                  </td>
                  <td className="px-5 py-3.5">
                    <MiniBar value={emp.punctualityScore} max={10} color="bg-purple-500" />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} className={i < (emp.performanceRating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'} />
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <ScoreRing score={emp.rewardScore} size={44} />
                  </td>
                  <td className="px-5 py-3.5">
                    <CategoryBadge category={emp.aiCategory} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AIRewardDashboard;
