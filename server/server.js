const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { analyzeEmployee } = require('./utils/aiLogic');
const { generateInsights } = require('./utils/geminiAI');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_PATH = path.join(__dirname, 'data', 'employees.json');

app.use(cors());
app.use(express.json());

// Ensure data directory exists
fs.ensureDirSync(path.join(__dirname, 'data'));

// Helper to generate 50 records
const generateInitialData = () => {
  const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Support'];
  const positions = {
    'IT': ['Senior Developer', 'Junior Developer', 'Tech Lead', 'QA Engineer'],
    'HR': ['HR Manager', 'Recruiter', 'HR Specialist'],
    'Finance': ['Accountant', 'Finance Controller', 'Analyst'],
    'Marketing': ['Marketing Manager', 'SEO Specialist', 'Content Writer'],
    'Operations': ['Operations Manager', 'Logistics Coordinator'],
    'Sales': ['Sales Executive', 'Account Manager'],
    'Support': ['Support Specialist', 'Technical Support']
  };
  const names = [
    'Rajesh Sharma', 'Priya Singh', 'Amit Patel', 'Sneha Reddy', 'Vikram Malhotra',
    'Anjali Gupta', 'Suresh Kumar', 'Deepika Iyer', 'Arjun Verma', 'Kavita Rao',
    'Rohan Mehra', 'Sonal Deshmukh', 'Manoj Tiwari', 'Pooja Bhatt', 'Karan Johar',
    'Neha Kakkar', 'Rahul Dravid', 'Ishita Dutta', 'Varun Dhawan', 'Shraddha Kapoor',
    'Abhishek Bachchan', 'Aishwarya Rai', 'Hrithik Roshan', 'Kareena Kapoor', 'Ranbir Kapoor',
    'Alia Bhatt', 'Sidarth Malhotra', 'Kiara Advani', 'Kartik Aaryan', 'Sara Ali Khan',
    'Vicky Kaushal', 'Katrina Kaif', 'Ranveer Singh', 'Deepika Padukone', 'Shah Rukh Khan',
    'Salman Khan', 'Aamir Khan', 'Akshay Kumar', 'Ajay Devgn', 'Priyanka Chopra',
    'Virat Kohli', 'Anushka Sharma', 'MS Dhoni', 'Sakshi Dhoni', 'Sachin Tendulkar',
    'Anjali Tendulkar', 'Rohit Sharma', 'Ritika Sajdeh', 'Hardik Pandya', 'Natasa Stankovic'
  ];

  const employees = [];
  for (let i = 0; i < 50; i++) {
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const pos = positions[dept][Math.floor(Math.random() * positions[dept].length)];
    const status = Math.random() > 0.2 ? 'Active' : 'Inactive';
    const gender = i % 2 === 0 ? 'Male' : 'Female';
    
    employees.push({
      id: `EMP${String(i + 1).padStart(3, '0')}`,
      fullName: names[i],
      email: `${names[i].toLowerCase().replace(' ', '.')}@company.com`,
      phone: `+91-${9800000000 + i}`,
      dateOfBirth: `19${85 + Math.floor(Math.random() * 15)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      gender,
      address: {
        street: `${Math.floor(Math.random() * 999)} MG Road`,
        city: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'][Math.floor(Math.random() * 5)],
        state: ['Karnataka', 'Maharashtra', 'Delhi', 'Telangana'][Math.floor(Math.random() * 4)],
        pincode: `${560000 + i}`
      },
      department: dept,
      position: pos,
      dateOfJoining: `20${21 + Math.floor(Math.random() * 3)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      salary: 400000 + Math.floor(Math.random() * 2100000),
      employmentType: ['Full-time', 'Part-time', 'Contract'][Math.floor(Math.random() * 3)],
      manager: names[Math.floor(Math.random() * names.length)],
      performanceRating: Math.floor(Math.random() * 5) + 1,
      attendancePercentage: 80 + Math.floor(Math.random() * 20),
      status
    });
  }
  return employees;
};

// Initialize file if not exists
if (!fs.existsSync(DATA_PATH)) {
  fs.writeJsonSync(DATA_PATH, generateInitialData(), { spaces: 2 });
}

// Routes
app.get('/api/employees', async (req, res) => {
  const employees = await fs.readJson(DATA_PATH);
  res.json(employees);
});

app.get('/api/employees/:id', async (req, res) => {
  const employees = await fs.readJson(DATA_PATH);
  const employee = employees.find(e => e.id === req.params.id);
  if (employee) {
    const aiInsights = analyzeEmployee(employee);
    res.json({ ...employee, aiInsights });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.post('/api/employees', async (req, res) => {
  const employees = await fs.readJson(DATA_PATH);
  const newEmployee = {
    ...req.body,
    id: `EMP${String(employees.length + 1).padStart(3, '0')}`
  };
  employees.push(newEmployee);
  await fs.writeJson(DATA_PATH, employees, { spaces: 2 });
  res.status(201).json(newEmployee);
});

app.put('/api/employees/:id', async (req, res) => {
  const employees = await fs.readJson(DATA_PATH);
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...req.body };
    await fs.writeJson(DATA_PATH, employees, { spaces: 2 });
    res.json(employees[index]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  let employees = await fs.readJson(DATA_PATH);
  employees = employees.filter(e => e.id !== req.params.id);
  await fs.writeJson(DATA_PATH, employees, { spaces: 2 });
  res.json({ message: 'Employee deleted' });
});

app.get('/api/dashboard/stats', async (req, res) => {
  const employees = await fs.readJson(DATA_PATH);
  const activeEmployees = employees.filter(e => e.status === 'Active');
  const departments = [...new Set(employees.map(e => e.department))];
  const avgSalary = employees.reduce((acc, curr) => acc + curr.salary, 0) / employees.length;

  // Department distribution
  const deptDistribution = departments.map(dept => ({
    name: dept,
    count: employees.filter(e => e.department === dept).length,
    avgSalary: Math.round(employees.filter(e => e.department === dept).reduce((acc, curr) => acc + curr.salary, 0) / employees.filter(e => e.department === dept).length)
  }));

  // Gender distribution
  const genderDistribution = [
    { name: 'Male', count: employees.filter(e => e.gender === 'Male').length },
    { name: 'Female', count: employees.filter(e => e.gender === 'Female').length },
    { name: 'Other', count: employees.filter(e => e.gender === 'Other').length }
  ];

  res.json({
    totalEmployees: employees.length,
    activeEmployees: activeEmployees.length,
    avgSalary: Math.round(avgSalary),
    totalDepartments: departments.length,
    deptDistribution,
    genderDistribution,
    recentHires: employees.sort((a, b) => new Date(b.dateOfJoining) - new Date(a.dateOfJoining)).slice(0, 5)
  });
});

app.post('/api/employee/ai-insights', async (req, res) => {
  const { employeeData } = req.body;
  const insights = await generateInsights(employeeData);
  if (insights) {
    res.json(insights);
  } else {
    res.status(500).json({ message: 'Failed to generate AI insights' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
