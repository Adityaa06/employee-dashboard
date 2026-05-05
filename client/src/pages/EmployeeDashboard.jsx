import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Wallet, 
  TrendingUp, 
  Award, 
  Lightbulb, 
  Quote, 
  MessageSquare, 
  Bell,
  Star,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingDown,
  Zap,
  Target,
  BrainCircuit,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { mockEmployee } from '../data/mockEmployee';

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 rounded-xl bg-primary/10 text-primary">
      <Icon size={20} />
    </div>
    <div>
      <h3 className="text-lg font-black text-white tracking-tight">{title}</h3>
      {subtitle && <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{subtitle}</p>}
    </div>
  </div>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`glass-card p-6 rounded-[32px] hover:border-white/10 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const EmployeeDashboard = () => {
  const [employee] = useState(mockEmployee);
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Top Section: Profile & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <GlassCard className="lg:col-span-2 flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-primary/10 to-transparent">
          <div className="relative group">
            <div className="absolute -inset-1 bg-premium-gradient rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={employee.profilePicture} 
              alt={employee.name}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-[35px] object-cover border-2 border-white/10"
            />
            <div className="absolute -bottom-2 -right-2 bg-success p-2 rounded-2xl border-4 border-background shadow-lg">
              <CheckCircle2 size={20} className="text-white" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
              <h1 className="text-3xl font-black text-white tracking-tighter">{employee.name}</h1>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-primary border border-primary/20 uppercase tracking-widest self-center md:self-auto">
                {employee.id}
              </span>
            </div>
            <p className="text-gray-400 font-bold text-sm mb-6">{employee.role}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-5 py-3 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Current Points</p>
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-warning fill-warning" />
                  <span className="text-xl font-black text-white">{employee.points.toLocaleString()}</span>
                </div>
              </div>
              <div className="px-5 py-3 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Badge Level</p>
                <div className="flex items-center gap-2">
                  <Trophy size={18} className="text-primary" />
                  <span className="text-xl font-black text-white">{employee.badgeLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Notifications & Quick Alerts */}
        <GlassCard>
          <SectionHeader icon={Bell} title="Notifications" subtitle="Recent Alerts" />
          <div className="space-y-4">
            {employee.notifications.map(notif => (
              <div key={notif.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${notif.type === 'bonus' ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'}`}>
                    {notif.type === 'bonus' ? <Star size={14} /> : <Calendar size={14} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-200 group-hover:text-white leading-relaxed">{notif.message}</p>
                    <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Second Row: Attendance & Earnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Today's Status */}
        <GlassCard className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 -mr-8 -mt-8 bg-success/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <SectionHeader icon={Calendar} title="Attendance" subtitle="Today" />
          <div className="text-center mt-4">
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl ${
              employee.attendance.today === 'Present' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'
            } border-2 mb-4`}>
              <CheckCircle2 size={24} />
              <span className="text-2xl font-black uppercase tracking-tighter">{employee.attendance.today}</span>
            </div>
            <p className="text-xs font-bold text-gray-500">Check-in at 9:05 AM</p>
          </div>
        </GlassCard>

        {/* Weekly Summary */}
        <GlassCard>
          <SectionHeader icon={Clock} title="Summary" subtitle="Performance" />
          <div className="space-y-6 mt-2">
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-bold text-gray-400">Weekly Rate</p>
                <p className="text-lg font-black text-white">{employee.attendance.weekly}%</p>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${employee.attendance.weekly}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-bold text-gray-400">Monthly Rate</p>
                <p className="text-lg font-black text-white">{employee.attendance.monthly}%</p>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: `${employee.attendance.monthly}%` }}></div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Earnings Today */}
        <GlassCard className="bg-gradient-to-br from-success/5 to-transparent">
          <SectionHeader icon={Wallet} title="Wage" subtitle="Today's Earnings" />
          <div className="mt-4">
            <h4 className="text-4xl font-black text-white tracking-tighter">₹{employee.earnings.today.toLocaleString()}</h4>
            <div className="flex items-center gap-1 mt-2 text-success">
              <TrendingUp size={14} />
              <span className="text-[10px] font-black uppercase">Standard Rate</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-4 font-bold uppercase tracking-widest">Base Salary + Daily Allowance</p>
          </div>
        </GlassCard>

        {/* Total Earnings */}
        <GlassCard>
          <SectionHeader icon={TrendingUp} title="Earnings" subtitle="Monthly Total" />
          <div className="mt-4">
            <h4 className="text-4xl font-black text-white tracking-tighter">₹{(employee.earnings.monthly / 1000).toFixed(1)}k</h4>
            <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest mb-6">Total Accumulated</p>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Bonuses Earned</p>
              <p className="text-lg font-black text-white">₹{employee.earnings.bonuses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Third Row: Performance & Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Trends */}
        <GlassCard className="lg:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <SectionHeader icon={Target} title="Performance Index" subtitle="AI Generated Analytics" />
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 hover:border-primary/30 transition-all cursor-help group/score">
              <div className="w-10 h-10 rounded-xl bg-premium-gradient flex items-center justify-center font-black text-white text-lg shadow-glow shadow-primary/20 group-hover/score:scale-110 transition-transform">
                {employee.performance.score}
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Score</p>
                <p className="text-xs font-bold text-success flex items-center gap-1">
                  <ArrowUpRight size={12} /> +4.2% Growth
                </p>
              </div>
            </div>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={employee.performance.trends}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#4b5563', fontSize: 10, fontWeight: 700}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#4b5563', fontSize: 10, fontWeight: 700}} 
                  domain={[60, 100]} 
                  dx={-10}
                />
                <Tooltip 
                  cursor={{stroke: '#6366F1', strokeWidth: 2}}
                  contentStyle={{backgroundColor: '#18181b', borderRadius: '24px', border: '1px solid #ffffff10', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)', padding: '12px 16px'}}
                  itemStyle={{color: '#f8fafc', fontWeight: 900, fontSize: '14px'}}
                  labelStyle={{color: '#6366f1', fontWeight: 900, marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#6366F1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {employee.performance.strengths.map((s, i) => (
              <div key={i} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/20 text-success text-[10px] font-black uppercase tracking-widest">
                <Star size={12} className="fill-success" /> {s}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Badges & Progress */}
        <GlassCard>
          <SectionHeader icon={Award} title="Achievements" subtitle="Earned Badges" />
          <div className="grid grid-cols-3 gap-4 mb-8">
            {employee.badges.map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-warning group-hover:scale-110 group-hover:bg-warning/10 transition-all duration-300">
                  {badge.icon === 'Zap' && <Zap size={24} className="fill-warning" />}
                  {badge.icon === 'Sun' && <Star size={24} className="fill-warning" />}
                  {badge.icon === 'Users' && <Award size={24} className="fill-warning" />}
                </div>
                <p className="text-[10px] font-bold text-gray-400 text-center">{badge.name}</p>
              </div>
            ))}
          </div>
          
          <div className="p-5 rounded-3xl bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Next Reward</p>
                <p className="text-sm font-bold text-white">{employee.nextReward.title}</p>
              </div>
              <Target size={20} className="text-secondary" />
            </div>
            <div className="flex justify-between items-end mb-2">
              <p className="text-[10px] font-bold text-gray-500">{employee.nextReward.progress}% complete</p>
              <p className="text-[10px] font-bold text-gray-500">{employee.nextReward.remainingPoints} pts left</p>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: `${employee.nextReward.progress}%` }}></div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Fourth Row: AI Insights & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Insights */}
        <GlassCard className="lg:col-span-1 bg-gradient-to-br from-primary/10 via-transparent to-transparent border-primary/20">
          <SectionHeader icon={BrainCircuit} title="AI Smart Insights" subtitle="Predictive Analytics" />
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 border-l-4 border-l-primary">
              <p className="text-sm text-gray-300 italic leading-relaxed">
                "{employee.aiInsights.feedback}"
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Key Suggestions</p>
              {employee.aiInsights.suggestions.map((sug, i) => (
                <div key={i} className="flex gap-3 items-start group">
                  <div className="p-1 rounded-full bg-success/20 text-success mt-1 group-hover:scale-125 transition-transform">
                    <CheckCircle2 size={12} />
                  </div>
                  <p className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{sug}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Feedback Section */}
        <GlassCard className="lg:col-span-1">
          <SectionHeader icon={MessageSquare} title="Manager Feedback" subtitle="Recent Reviews" />
          <div className="space-y-4">
            {employee.recentFeedback.map((fb, i) => (
              <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px] font-black text-white">
                    {fb.manager.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{fb.manager}</p>
                    <p className="text-[8px] text-gray-500 font-bold uppercase">{fb.date}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">"{fb.content}"</p>
                {!acknowledged ? (
                  <button 
                    onClick={() => setAcknowledged(true)}
                    className="w-full py-3 bg-white/5 hover:bg-primary/20 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20 rounded-xl transition-all"
                  >
                    Acknowledge Feedback
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-success font-black text-[10px] uppercase tracking-widest">
                    <CheckCircle2 size={14} /> Acknowledged
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Motivation Card */}
        <GlassCard className="lg:col-span-1 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <SectionHeader icon={Quote} title="Daily Motivation" subtitle="Fuel your day" />
          <div className="relative z-10 py-8">
            <Quote size={48} className="text-primary/20 absolute -top-4 -left-4" />
            <p className="text-xl font-black text-white italic text-center leading-tight tracking-tighter">
              {employee.motivation}
            </p>
          </div>
          <button className="relative z-10 w-full py-4 bg-premium-gradient rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1">
            Share Motivation
          </button>
        </GlassCard>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
