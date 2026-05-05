import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  IndianRupee, 
  Building2,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const StatsCard = ({ title, value, icon: Icon, trend, color, bg }) => (
  <div className="glass-card p-8 rounded-[32px] group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-32 h-32 ${bg} opacity-10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity`}></div>
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">{title}</p>
        <h3 className="text-4xl font-black mt-3 text-white tracking-tighter">{value}</h3>
        {trend && (
          <div className="flex items-center mt-4 text-success text-xs font-bold bg-success/10 w-fit px-2 py-1 rounded-lg">
            <ArrowUpRight size={14} className="mr-1" />
            <span>{trend}% Higher</span>
          </div>
        )}
      </div>
      <div className={`p-4 rounded-2xl ${bg} text-white shadow-xl shadow-black/20 group-hover:rotate-12 transition-transform duration-500`}>
        <Icon size={28} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !stats) return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Architecting Workforce Data...</p>
    </div>
  );

  const COLORS = ['#6366F1', '#A855F7', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Enterprise Overview</h1>
          <p className="text-gray-500 font-medium mt-2">Strategic workforce intelligence at your fingertips.</p>
        </div>
        <Link to="/employees" className="btn-primary group">
          <span className="flex items-center gap-2">
            <Zap size={18} className="group-hover:fill-current transition-all" />
            Add New Talent
          </span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatsCard 
          title="Total Workforce" 
          value={stats.totalEmployees} 
          icon={Users} 
          trend="12"
          bg="bg-primary"
        />
        <StatsCard 
          title="Active Capacity" 
          value={stats.activeEmployees} 
          icon={UserCheck} 
          bg="bg-success"
        />
        <StatsCard 
          title="Average Payroll" 
          value={`₹${(stats.avgSalary / 100000).toFixed(1)}L`} 
          icon={IndianRupee} 
          bg="bg-secondary"
        />
        <StatsCard 
          title="Total Divisions" 
          value={stats.totalDepartments} 
          icon={Building2} 
          bg="bg-warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-10 rounded-[40px] relative">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Talent Distribution</h3>
              <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-widest">Across key operational departments</p>
            </div>
            <button className="text-primary text-xs font-black uppercase tracking-widest flex items-center hover:opacity-80 transition-opacity">
              Intelligence Report <ArrowUpRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.deptDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{backgroundColor: '#18181b', borderRadius: '20px', border: '1px solid #ffffff10', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)'}}
                  itemStyle={{color: '#f8fafc', fontWeight: 700, fontSize: '12px'}}
                  labelStyle={{color: '#6366f1', fontWeight: 900, marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase'}}
                />
                <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={40}>
                  {stats.deptDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Hires */}
        <div className="glass-card p-10 rounded-[40px]">
          <h3 className="text-xl font-black text-white tracking-tight mb-8 italic underline decoration-primary/40 decoration-4 underline-offset-8">Fresh Talent</h3>
          <div className="space-y-8">
            {stats.recentHires.map((employee) => (
              <div key={employee.id} className="flex items-center gap-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-primary text-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {employee.fullName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-100 group-hover:text-primary transition-colors">{employee.fullName}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{employee.position}</p>
                </div>
                <div className="px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                   <p className="text-[8px] font-black text-primary uppercase">
                    {employee.department}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-12 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
            Audit Complete Workforce
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
