import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Database, Users, Search, RefreshCw, AlertCircle } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
}

function UserData() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load user data. Please try again later.');
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8">
      <Toaster position="top-right" />
      
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <div className="flex items-center space-x-2">
            <Database size={24} />
            <h1 className="text-2xl font-bold">Registered Users</h1>
          </div>
          <p className="mt-2 text-indigo-200">View all registered users in the system</p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center">
              <Users size={20} className="text-indigo-600 mr-2" />
              <span className="text-gray-700 font-medium">
                Total Users: <span className="font-bold">{users.length}</span>
              </span>
            </div>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <button 
              onClick={fetchUsers}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              {searchTerm ? 'No users match your search criteria' : 'No users registered yet'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserData;