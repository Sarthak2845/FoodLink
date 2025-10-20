import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import GooglePlacesInput from '../components/GooglePlacesInput';
import type { UserProfile } from '../types/Users';
import { MdPerson, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaUserTie, FaHandsHelping } from 'react-icons/fa';

const Auth: React.FC = () => {
  const { login, signup, loading, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile_no: '',
    location: '',
    role: 'donor' as 'donor' | 'ngo',
  });
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        const userData: UserProfile & { password: string } = {
          id: '',
          name: formData.name,
          email: formData.email,
          password: formData.password,
          mobile_no: formData.mobile_no,
          location: formData.location,
          role: formData.role,
        };
        await signup(userData);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="page-gradient min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">
              {isLogin ? 'Welcome Back!' : 'Join FoodLink'}
            </h2>
            <p className="text-secondary">
              {isLogin ? 'Sign in to continue sharing food' : 'Start making a difference today'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    <MdPerson className="inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    <MdPhone className="inline mr-2" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile_no"
                    value={formData.mobile_no}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="input-field"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    <MdLocationOn className="inline mr-2" />
                    Location
                  </label>
                  <GooglePlacesInput
                    value={formData.location}
                    onChange={handleLocationChange}
                    placeholder="Start typing your address..."
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-3">
                    I want to join as:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'donor' }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.role === 'donor'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                      }`}
                    >
                      <FaUserTie className="text-2xl mx-auto mb-2 text-emerald-600" />
                      <div className="text-sm font-medium text-primary">Food Donor</div>
                      <div className="text-xs text-secondary">Share surplus food</div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'ngo' }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.role === 'ngo'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                      }`}
                    >
                      <FaHandsHelping className="text-2xl mx-auto mb-2 text-blue-600" />
                      <div className="text-sm font-medium text-primary">NGO</div>
                      <div className="text-xs text-secondary">Collect & distribute</div>
                    </button>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                <MdEmail className="inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg font-semibold"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;