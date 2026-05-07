import { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, Building2, Briefcase, IndianRupee, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
        <Icon size={18} />
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:bg-white/[0.08] transition-all duration-300"
      />
    </div>
  </div>
);

const EmployeeForm = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: 'IT',
    position: '',
    salary: '',
    dateOfJoining: new Date().toISOString().split('T')[0],
    status: 'Active',
    manager: '',
    employmentType: 'Full-time',
    gender: 'Male',
    performanceRating: 3,
    attendancePercentage: 90
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.position) {
      toast.error('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-card w-full max-w-2xl rounded-[40px] border border-white/10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-2xl text-primary shadow-glow">
                <User size={24} />
              </div>
              {employee ? 'Edit Employee Profile' : 'Hire New Talent'}
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1 ml-14">
              {employee ? 'Update existing credentials' : 'Add to the corporate workforce'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              label="Full Name *"
              icon={User}
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
            <InputField
              label="Corporate Email *"
              icon={Mail}
              type="email"
              placeholder="rahul.sharma@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <InputField
              label="Phone Connection"
              icon={Phone}
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Strategic Division</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                  <Building2 size={18} />
                </div>
                <select
                  className="w-full pl-12 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  {['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Support', 'Engineering', 'Product'].map(d => (
                    <option key={d} value={d} className="bg-card text-white">{d}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg size={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
            <InputField
              label="Professional Role *"
              icon={Briefcase}
              placeholder="e.g. Software Engineer"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
            <InputField
              label="Annual Compensation (₹) *"
              icon={IndianRupee}
              type="number"
              placeholder="e.g. 1200000"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) || '' })}
              required
            />
            <InputField
              label="Onboarding Date"
              icon={Calendar}
              type="date"
              value={formData.dateOfJoining}
              onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
            />
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Employment Model</label>
              <select
                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/[0.08] transition-all cursor-pointer"
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
              >
                <option value="Full-time" className="bg-card">Full-time</option>
                <option value="Part-time" className="bg-card">Part-time</option>
                <option value="Contract" className="bg-card">Contract</option>
                <option value="Intern" className="bg-card">Intern</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-5 pt-8 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center gap-2 group"
            >
              <Save size={20} className="group-hover:scale-110 transition-transform" />
              {employee ? 'Save Profile' : 'Confirm Hiring'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
