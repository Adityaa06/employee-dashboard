// Deterministic pseudo-random based on employee ID seed
function seededRandom(seed, index = 0) {
  let hash = index * 31337;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function enrichEmployee(employee) {
  const seed = employee.id || employee.email || employee.fullName || 'emp';

  // Generate consistent collaboration and punctuality scores (1-10)
  const collaborationScore = (seededRandom(seed, 1) % 10) + 1;
  const punctualityScore = (seededRandom(seed, 2) % 10) + 1;

  // Calculate reward score based on AI logic
  let rewardScore = 0;
  if ((employee.attendancePercentage || 0) > 85) rewardScore += 20;
  if ((employee.performanceRating || 0) >= 4) rewardScore += 30;
  if (collaborationScore >= 7) rewardScore += 20;
  if (punctualityScore >= 7) rewardScore += 20;
  if (employee.status === 'Active') rewardScore += 10;

  // AI Category from reward score
  let aiCategory;
  if (rewardScore >= 90) aiCategory = 'Outstanding Employee';
  else if (rewardScore >= 75) aiCategory = 'Excellent Performer';
  else if (rewardScore >= 60) aiCategory = 'Good Employee';
  else aiCategory = 'Needs Improvement';

  return { ...employee, collaborationScore, punctualityScore, rewardScore, aiCategory };
}

export function enrichEmployees(employees) {
  return employees.map(enrichEmployee);
}

export function getCategoryConfig(category) {
  switch (category) {
    case 'Outstanding Employee':
      return { color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', dot: 'bg-emerald-400', hex: '#10b981' };
    case 'Excellent Performer':
      return { color: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/30', dot: 'bg-blue-400', hex: '#3b82f6' };
    case 'Good Employee':
      return { color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', dot: 'bg-amber-400', hex: '#f59e0b' };
    case 'Needs Improvement':
      return { color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', dot: 'bg-red-400', hex: '#ef4444' };
    default:
      return { color: 'text-gray-400', bg: 'bg-gray-500/15', border: 'border-gray-500/30', dot: 'bg-gray-400', hex: '#6b7280' };
  }
}

export function handleAIQuery(query, employees) {
  const q = query.trim().toLowerCase();
  let results = [];
  let message = '';

  if (q.includes('top') || q.includes('best performer') || q.includes('outstanding')) {
    results = [...employees].sort((a, b) => b.rewardScore - a.rewardScore).slice(0, 10);
    message = `🏆 Top 10 employees by Reward Score:`;
  } else if (q.includes('low attendance') || q.includes('absent')) {
    results = [...employees].sort((a, b) => (a.attendancePercentage || 0) - (b.attendancePercentage || 0)).slice(0, 10);
    message = `⚠️ Employees with lowest attendance:`;
  } else if (q.includes('attendance')) {
    results = [...employees].sort((a, b) => (b.attendancePercentage || 0) - (a.attendancePercentage || 0)).slice(0, 10);
    message = `📊 Best attendance employees:`;
  } else if (q.includes('collaborat')) {
    results = [...employees].sort((a, b) => b.collaborationScore - a.collaborationScore).slice(0, 10);
    message = `🤝 Best collaborators:`;
  } else if (q.includes('needs improvement') || q.includes('improve')) {
    results = employees.filter(e => e.aiCategory === 'Needs Improvement');
    message = `🔴 Employees needing improvement (${results.length} found):`;
  } else if (q.includes('punctual')) {
    results = [...employees].sort((a, b) => b.punctualityScore - a.punctualityScore).slice(0, 10);
    message = `⏰ Most punctual employees:`;
  } else if (q.includes('excellent')) {
    results = employees.filter(e => e.aiCategory === 'Excellent Performer');
    message = `🔵 Excellent Performers (${results.length} found):`;
  } else if (q.includes('good')) {
    results = employees.filter(e => e.aiCategory === 'Good Employee');
    message = `🟡 Good Employees (${results.length} found):`;
  } else if (q.includes('active')) {
    results = employees.filter(e => e.status === 'Active').sort((a, b) => b.rewardScore - a.rewardScore).slice(0, 10);
    message = `✅ Active employees by reward score:`;
  } else if (q.includes('inactive')) {
    results = employees.filter(e => e.status === 'Inactive');
    message = `❌ Inactive employees (${results.length} found):`;
  } else {
    results = employees.filter(e =>
      e.fullName?.toLowerCase().includes(q) ||
      e.department?.toLowerCase().includes(q) ||
      e.position?.toLowerCase().includes(q)
    );
    message = results.length > 0
      ? `🔍 Results for "${query}":`
      : `❌ No results for "${query}". Try: "top employees", "low attendance", "best collaborator", "needs improvement", "punctual employees"`;
  }

  return { message, results: results.slice(0, 10) };
}
