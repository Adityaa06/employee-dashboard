import React, { useState } from 'react';
import { 
  UserCircle, 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Lock, 
  ChevronLeft,
  Sparkles
} from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState(null); // 'admin' or 'employee'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const adminEmail = "admin@email.com";
    const adminPass = "admin@1234";
    const empEmail = "EmployeeAdityaSingh@email.com";
    const empPass = "Employee@1234";

    if (role === 'admin') {
      if (email === adminEmail && password === adminPass) {
        onLogin({ role: 'admin', name: 'Master Admin' });
      } else {
        setError('Invalid Admin credentials');
      }
    } else {
      if (email === empEmail && password === empPass) {
        onLogin({ role: 'employee', name: 'Mark Doe' });
      } else {
        setError('Invalid Employee credentials');
      }
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Selection */}
          <button 
            onClick={() => setRole('admin')}
            className="group relative h-[400px] rounded-[40px] bg-card/40 border border-white/5 hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col items-center justify-center gap-6"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-8 rounded-[32px] bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
              <ShieldCheck size={64} className="group-hover:text-white transition-colors" />
            </div>
            <div className="text-center relative z-10">
              <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Corporate Admin</h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Manage Workforce & Strategy</p>
            </div>
            <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
              <span className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                Access Portal <ArrowRight size={14} />
              </span>
            </div>
          </button>

          {/* Employee Selection */}
          <button 
            onClick={() => setRole('employee')}
            className="group relative h-[400px] rounded-[40px] bg-card/40 border border-white/5 hover:border-secondary/40 transition-all duration-500 overflow-hidden flex flex-col items-center justify-center gap-6"
          >
            <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-8 rounded-[32px] bg-secondary/10 text-secondary group-hover:scale-110 group-hover:bg-secondary transition-all duration-500">
              <UserCircle size={64} className="group-hover:text-white transition-colors" />
            </div>
            <div className="text-center relative z-10">
              <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Employee Portal</h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Rewards, Progress & Insights</p>
            </div>
            <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
              <span className="flex items-center gap-2 text-secondary font-black uppercase tracking-widest text-[10px]">
                Access Portal <ArrowRight size={14} />
              </span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className={`absolute top-0 left-0 w-[500px] h-[500px] ${role === 'admin' ? 'bg-primary/10' : 'bg-secondary/10'} rounded-full blur-[120px] -z-10 animate-pulse`}></div>
      
      <div className="max-w-md w-full glass-card p-10 rounded-[40px] relative">
        <button 
          onClick={() => setRole(null)}
          className="absolute top-8 left-8 p-2 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back
        </button>

        <div className="text-center mt-8 mb-10">
          <div className={`inline-flex p-4 rounded-3xl ${role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'} mb-6`}>
            {role === 'admin' ? <ShieldCheck size={32} /> : <UserCircle size={32} />}
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2">
            {role === 'admin' ? 'Admin Login' : 'Employee Login'}
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
            Please enter your credentials below
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Corporate Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center text-gray-500 group-focus-within:text-primary transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@email.com' : 'EmployeeMarkDoe@email.com'}
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 text-sm transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Secure Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center text-gray-500 group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 text-sm transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-bold text-center animate-shake">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className={`w-full py-4 ${role === 'admin' ? 'bg-primary shadow-primary/20' : 'bg-secondary shadow-secondary/20'} text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-2`}
          >
            Authenticate <Sparkles size={16} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            Protected by HRM PRO Advanced Security
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
