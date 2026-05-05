import {
  X,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  IndianRupee,
  Star,
  Activity,
  AlertTriangle,
  TrendingUp,
  Lightbulb
} from 'lucide-react';

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
    <div className="p-2 bg-white rounded-lg text-primary shadow-sm">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const InsightCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className={`${bg} p-5 rounded-2xl border ${color} flex items-center gap-4`}>
    <div className={`p-3 rounded-xl bg-white shadow-sm ${color.replace('border-', 'text-')}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-wider opacity-70">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);

const EmployeeDetail = ({ employee, onClose }) => {
  if (!employee) return null;

  const { aiInsights } = employee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-primary to-secondary p-8 flex items-end">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-6 translate-y-12">
            <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
              <div className="w-full h-full rounded-[1.4rem] bg-gray-100 flex items-center justify-center text-4xl font-bold text-primary">
                {employee.fullName[0]}
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white shadow-sm">{employee.fullName}</h2>
              <p className="text-white/80 font-medium flex items-center gap-2 mt-1">
                <Briefcase size={16} />
                {employee.position} • {employee.department}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: AI Insights */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                <Lightbulb size={20} className="text-warning" />
                AI Talent Insights
              </h3>

              <InsightCard
                title="Performance Status"
                value={aiInsights.performanceStatus}
                icon={Star}
                color="border-blue-200 text-blue-600"
                bg="bg-blue-50"
              />

              <InsightCard
                title="Promotion Status"
                value={aiInsights.promotionStatus}
                icon={TrendingUp}
                color="border-purple-200 text-purple-600"
                bg="bg-purple-50"
              />

              <InsightCard
                title="Retention Risk"
                value={aiInsights.riskLevel}
                icon={AlertTriangle}
                color={aiInsights.riskLevel === 'High Risk' ? "border-red-200 text-red-600" : "border-green-200 text-green-600"}
                bg={aiInsights.riskLevel === 'High Risk' ? "bg-red-50" : "bg-green-50"}
              />

              <div className="p-5 bg-gray-900 rounded-2xl text-white">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">AI Recommendation</p>
                <p className="text-lg font-semibold">{aiInsights.recommendation}</p>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem icon={Mail} label="Email Address" value={employee.email} />
                <DetailItem icon={Phone} label="Phone Number" value={employee.phone} />
                <DetailItem icon={Calendar} label="Joining Date" value={employee.dateOfJoining} />
                <DetailItem icon={MapPin} label="Location" value={`${employee.address.city}, ${employee.address.state}`} />
                <DetailItem icon={IndianRupee} label="Annual Salary" value={`₹${employee.salary.toLocaleString()}`} />
                <DetailItem icon={Activity} label="Attendance" value={`${employee.attendancePercentage}%`} />
                <DetailItem icon={Star} label="Manager" value={employee.manager} />
                <DetailItem icon={Briefcase} label="Employment Type" value={employee.employmentType} />
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="font-bold text-gray-900 mb-4">Internal Notes</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Employee has shown consistent performance in {employee.department}.
                  The AI analysis suggests a {aiInsights.performanceStatus.toLowerCase()} trajectory.
                  Manager {employee.manager} should review the recommendation: "{aiInsights.recommendation}".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
