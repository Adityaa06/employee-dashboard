import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Plus,
  Download,
  Shield
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import EmployeeDetail from '../components/EmployeeDetail';
import EmployeeForm from '../components/EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      toast.error('Data retrieval failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingEmployee) {
        await axios.put(`/api/employees/${editingEmployee.id}`, formData);
        toast.success('Talent record synchronized');
      } else {
        await axios.post('/api/employees', formData);
        toast.success('New talent onboarded');
      }
      setIsFormOpen(false);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      toast.error('Synchronization failed');
    }
  };

  const handleExport = () => {
    const headers = ['ID', 'Full Name', 'Email', 'Department', 'Position', 'Salary', 'Status', 'Performance', 'Attendance'];
    const csvContent = [
      headers.join(','),
      ...filteredEmployees.map(e => [
        e.id,
        `"${e.fullName}"`,
        e.email,
        e.department,
        `"${e.position}"`,
        e.salary,
        e.status,
        e.performanceRating,
        e.attendancePercentage
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `employees_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Secure data export complete');
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`/api/employees/${id}`);
      setSelectedEmployee(response.data);
    } catch (error) {
      toast.error('Insight retrieval failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Execute record deletion? This action is irreversible.')) {
      try {
        await axios.delete(`/api/employees/${id}`);
        toast.success('Record purged from database');
        fetchEmployees();
      } catch (error) {
        toast.error('Deletion protocol failed');
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredEmployees = employees
    .filter(emp => 
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (deptFilter === 'All' || emp.department === deptFilter)
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const departments = ['All', ...new Set(employees.map(e => e.department))];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Workforce Ledger</h1>
          <p className="text-gray-500 font-medium mt-1">High-fidelity database of company talent.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setEditingEmployee(null); setIsFormOpen(true); }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            Hire Talent
          </button>
          <button 
            onClick={handleExport}
            className="btn-outline flex items-center gap-2 group"
          >
            <Download size={18} className="group-hover:text-primary transition-colors" />
            Archive CSV
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search record by name..." 
            className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/5 rounded-[20px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/10 transition-all text-white placeholder:text-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <select 
            className="pl-12 pr-10 py-4 bg-white/5 border border-white/5 rounded-[20px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none text-white font-bold cursor-pointer"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            {departments.map(dept => <option key={dept} value={dept} className="bg-background">{dept}</option>)}
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="glass-card rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer group" onClick={() => handleSort('fullName')}>
                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors">Employee <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Division</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Role</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer group" onClick={() => handleSort('salary')}>
                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors">Compensation <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Security Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-32 text-gray-500 font-bold uppercase tracking-widest text-xs animate-pulse">Decrypting Records...</td></tr>
              ) : currentEmployees.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-32 text-gray-500 font-bold uppercase tracking-widest text-xs">Zero Records Found</td></tr>
              ) : (
                currentEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-white/[0.02] transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          {employee.fullName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-100 group-hover:text-primary transition-colors">{employee.fullName}</p>
                          <p className="text-[10px] text-gray-500 font-bold">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{employee.department}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{employee.position}</span>
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-white tracking-tighter">
                      ₹{employee.salary.toLocaleString()}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.1em] ${
                        employee.status === 'Active' 
                          ? 'bg-success/10 text-success ring-1 ring-success/20' 
                          : 'bg-white/5 text-gray-500 ring-1 ring-white/10'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${employee.status === 'Active' ? 'bg-success animate-pulse' : 'bg-gray-600'}`}></div>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                        <button 
                          onClick={() => handleViewDetails(employee.id)}
                          className="p-2.5 bg-white/5 hover:bg-primary/20 rounded-xl text-gray-400 hover:text-primary transition-all border border-white/5"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(employee)}
                          className="p-2.5 bg-white/5 hover:bg-success/20 rounded-xl text-gray-400 hover:text-success transition-all border border-white/5"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(employee.id)}
                          className="p-2.5 bg-white/5 hover:bg-danger/20 rounded-xl text-gray-400 hover:text-danger transition-all border border-white/5"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-10 py-6 bg-white/[0.03] border-t border-white/5 flex items-center justify-between">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em]">
            Index <span className="text-white">{(currentPage - 1) * itemsPerPage + 1}</span> — <span className="text-white">{Math.min(filteredEmployees.length, currentPage * itemsPerPage)}</span> / Total <span className="text-white">{filteredEmployees.length}</span> Records
          </p>
          <div className="flex items-center gap-3">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-3 rounded-xl border border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                    currentPage === i + 1 
                      ? 'bg-primary text-white shadow-glow' 
                      : 'bg-white/5 border border-white/5 text-gray-500 hover:bg-white/10'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-3 rounded-xl border border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <EmployeeForm 
          employee={editingEmployee}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}

      {selectedEmployee && (
        <EmployeeDetail 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
        />
      )}
    </div>
  );
};

export default EmployeeList;
