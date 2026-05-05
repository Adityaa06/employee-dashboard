# Employee Management System (HRM Pro)

A professional, full-stack Employee Management System built with the MERN stack (MongoDB simulated with JSON for ease of use).

## 🚀 Features

- **Premium Dashboard**: Real-time statistics and visualizations using Recharts.
- **Employee Management**: Full CRUD operations (Add, View, Edit, Delete).
- **Advanced Filtering**: Search by name, filter by department, and sort by salary/name.
- **Analytics**: Detailed reports on department distribution, salary averages, and gender diversity.
- **Responsive Design**: Modern UI built with Tailwind CSS, fully responsive across devices.
- **Pre-filled Data**: Comes with 50 realistic Indian employee records pre-loaded.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React, Recharts, Axios.
- **Backend**: Node.js, Express.js.
- **Storage**: In-memory JSON storage (auto-seeded).

## 📥 Setup Instructions

1. **Clone the repository** (or copy the files).
2. **Backend Setup**:
   ```bash
   cd server
   npm install
   npm start
   ```
3. **Frontend Setup**:
   ```bash
   cd client
   npm install
   npm run dev
   ```
4. **Access the App**:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)

## 📁 Project Structure

- `server/`: Express API and employee data.
- `client/`: React frontend with Tailwind CSS and Recharts.

## ⚠️ Important Note
This project uses a local `server/data/employees.json` file for data persistence. No database installation is required!
