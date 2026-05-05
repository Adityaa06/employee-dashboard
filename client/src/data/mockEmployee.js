export const mockEmployee = {
  name: "Mark Doe",
  id: "EMP-2024-001",
  role: "Senior Full Stack Developer",
  profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
  points: 4500,
  badgeLevel: "Platinum Elite",
  attendance: {
    today: "Present",
    weekly: 95,
    monthly: 98,
    history: [
      { day: "Mon", status: "Present" },
      { day: "Tue", status: "Present" },
      { day: "Wed", status: "Late" },
      { day: "Thu", status: "Present" },
      { day: "Fri", status: "Present" },
    ]
  },
  earnings: {
    today: 2500,
    weekly: 12500,
    monthly: 55000,
    bonuses: [
      { title: "Performance Bonus", amount: 5000, date: "2024-03-15" },
      { title: "Perfect Attendance", amount: 1000, date: "2024-03-01" }
    ]
  },
  performance: {
    score: 92,
    trends: [
      { month: "Jan", score: 85 },
      { month: "Feb", score: 88 },
      { month: "Mar", score: 92 },
      { month: "Apr", score: 90 },
      { month: "May", score: 94 },
    ],
    strengths: ["Clean Code", "Mentorship", "Problem Solving"],
    weaknesses: ["Meeting Punctuality"]
  },
  badges: [
    { name: "Code Ninja", icon: "Zap", date: "2024-01-10" },
    { name: "Early Bird", icon: "Sun", date: "2024-02-05" },
    { name: "Team Player", icon: "Users", date: "2024-03-12" }
  ],
  nextReward: {
    title: "Master Architect Badge",
    progress: 75,
    remainingPoints: 500
  },
  aiInsights: {
    feedback: "Your productivity has increased by 15% this month. Keep focusing on the architectural reviews.",
    suggestions: [
      "Try to join the morning standup 5 minutes earlier to improve attendance score.",
      "Explore the new React Server Components to stay ahead of the curve."
    ]
  },
  motivation: "The only way to do great work is to love what you do. - Steve Jobs",
  recentFeedback: [
    {
      manager: "Sarah Connor",
      content: "Excellent work on the dashboard migration! The UI is stunning.",
      date: "2024-03-20",
      acknowledged: false
    }
  ],
  notifications: [
    { id: 1, type: "bonus", message: "You earned a performance bonus of ₹5000!", time: "2 hours ago" },
    { id: 2, type: "attendance", message: "Attendance marked as Present for today.", time: "4 hours ago" }
  ]
};
