import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import UserData from './components/UserData';
import { Home } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <Home size={24} />
            Registration App
          </Link>
          <div className="flex gap-4">
            <Link to="/registration" className="hover:text-indigo-200 transition-colors">
              Register
            </Link>
            <Link to="/data" className="hover:text-indigo-200 transition-colors">
              View Data
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/registration" replace />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/data" element={<UserData />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;