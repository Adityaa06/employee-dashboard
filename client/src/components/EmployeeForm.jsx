import { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, Building2, Briefcase, IndianRupee, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={16} />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <User size={20} />
            </div>
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name *"
              icon={User}
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
            <InputField
              label="Email Address *"
              icon={Mail}
              type="email"
              placeholder="rahul@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <InputField
              label="Phone Number"
              icon={Phone}
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Department</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Building2 size={16} />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all appearance-none"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  {['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Support'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
            <InputField
              label="Position / Designation *"
              icon={Briefcase}
              placeholder="e.g. Software Engineer"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
            <InputField
              label="Annual Salary (₹) *"
              icon={IndianRupee}
              type="number"
              placeholder="e.g. 1200000"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) || '' })}
              required
            />
            <InputField
              label="Date of Joining"
              icon={Calendar}
              type="date"
              value={formData.dateOfJoining}
              onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
            />
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Employment Type</label>
              <select
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none"
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <Save size={18} />
              {employee ? 'Update Records' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
