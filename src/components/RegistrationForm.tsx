import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { UserPlus, Mail, Phone, MapPin, User, ArrowRight, CheckCircle } from 'lucide-react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log(response.data);
      toast.success('Registration successful!');
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: ''
      });
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <div className="flex items-center space-x-2">
            <UserPlus size={24} />
            <h1 className="text-2xl font-bold">Create Account</h1>
          </div>
          <p className="mt-2 text-indigo-200">Join our community today!</p>
        </div>
        
        {success ? (
          <div className="p-8 flex flex-col items-center justify-center">
            <CheckCircle size={64} className="text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Complete!</h2>
            <p className="text-gray-600 text-center mb-6">Your account has been successfully created.</p>
            <button 
              onClick={() => setSuccess(false)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Register Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Phone size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="123-456-7890"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="city" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <MapPin size={16} />
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="New York"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : (
                <>
                  Register Now
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;