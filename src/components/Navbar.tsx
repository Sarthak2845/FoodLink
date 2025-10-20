'use client';
import { Link } from 'react-router';
import { IoFastFood } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';

export default function HomeNav() {
  const { isAuthenticated, logout, profile } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700 shadow-sm rounded-b-lg">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
        <IoFastFood className="text-3xl" />
        FoodLink
      </Link>

      <div className="flex items-center gap-8">
        <Link to="/how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300">
          How It Works
        </Link>
        <Link to="/for-ngo" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300">
          For NGOs
        </Link>
        <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300">
          Contact
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors">
              Welcome, {profile?.name || 'User'}
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
}
