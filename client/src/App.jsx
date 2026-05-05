import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Menu, 
  X,
  Bell,
  Search,
  User as UserIcon,
  UserCircle,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import Analytics from './pages/Analytics';
import EmployeeDashboard from './pages/EmployeeDashboard';
import LoginPage from './pages/LoginPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Load user from localStorage on mount and migrate old name
  useEffect(() => {
    const savedUser = localStorage.getItem('hrm_user');
    if (savedUser) {
      let userData = JSON.parse(savedUser);
      // Migration for name change
      if (userData.name === 'Aditya Singh') {
        userData.name = 'Mark Doe';
        localStorage.setItem('hrm_user', JSON.stringify(userData));
      }
      setUser(userData);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('hrm_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hrm_user');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const navItems = user.role === 'admin' ? [
    { name: 'Admin Overview', path: '/', icon: LayoutDashboard },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ] : [
    { name: 'My Dashboard', path: '/my-dashboard', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-background text-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-card/80 backdrop-blur-2xl border-r border-white/5 transition-all duration-500 fixed h-full z-20`}
      >
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen && (
            <span className="text-2xl font-black bg-premium-gradient bg-clip-text text-transparent tracking-tighter">
              HRM PRO
            </span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl hover:bg-white/5 transition-all text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-4 rounded-2xl transition-all duration-300 mb-2 group ${
                  isActive 
                    ? 'bg-primary/20 text-white shadow-glow ring-1 ring-white/10' 
                    : 'text-gray-500 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                <Icon size={22} className={isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
                {isSidebarOpen && <span className="ml-4 font-semibold text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-4 right-4 space-y-4">
          {isSidebarOpen && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/5 overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all"></div>
              <h4 className="font-bold text-xs text-white">{user.name}</h4>
              <p className="text-[10px] mt-1 text-gray-500 font-bold uppercase tracking-widest">{user.role}</p>
            </div>
          )}
          
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center ${isSidebarOpen ? 'px-6 py-4' : 'justify-center py-4'} rounded-2xl text-danger hover:bg-danger/10 transition-all group`}
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="ml-4 font-bold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-500 min-h-screen relative`}>
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>

        {/* Header */}
        <header className="h-24 bg-background/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4 bg-white/5 px-5 py-3 rounded-2xl border border-white/5 w-96 group focus-within:ring-2 focus-within:ring-primary/40 transition-all">
            <Search size={18} className="text-gray-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="bg-transparent border-none outline-none text-sm w-full text-gray-200 placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-center gap-8">
            <button className="relative p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-gray-400 hover:text-white border border-white/5">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full ring-4 ring-background"></span>
            </button>
            <div className="flex items-center gap-4 pl-8 border-l border-white/5">
              <div className="text-right">
                <p className="text-sm font-bold text-white">{user.name}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {user.role === 'admin' ? 'Strategic Lead' : 'Senior Specialist'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-premium-gradient p-[1px] shadow-lg shadow-primary/20">
                <div className="w-full h-full rounded-[15px] bg-card flex items-center justify-center text-white">
                  {user.role === 'admin' ? <ShieldCheck size={24} /> : <UserCircle size={24} />}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-10 max-w-7xl mx-auto">
          <Routes>
            {user.role === 'admin' ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route path="/my-dashboard" element={<EmployeeDashboard />} />
                <Route path="*" element={<Navigate to="/my-dashboard" replace />} />
              </>
            )}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
