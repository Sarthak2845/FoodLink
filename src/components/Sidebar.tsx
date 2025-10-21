import React from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { MdDashboard, MdFastfood, MdSearch, MdList, MdBusiness, MdLogout, MdLocationOn } from 'react-icons/md';
import { FaUser, FaTrophy } from 'react-icons/fa';

interface SidebarProps {
  onNavigate?: (view: string) => void;
  activeView?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activeView = 'dashboard' }) => {
  const { profile, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (onNavigate && (path === '/donate' || path === '/my-donations')) {
      return activeView === (path === '/donate' ? 'share-food' : 'my-donations');
    }
    return location.pathname === path;
  };

  const handleClick = (path: string, e?: React.MouseEvent) => {
    if (onNavigate && (path === '/donate' || path === '/my-donations')) {
      e?.preventDefault();
      onNavigate(path === '/donate' ? 'share-food' : 'my-donations');
    }
  };

  const menuItems = [
    { path: '/dashboard', icon: MdDashboard, label: 'Dashboard', roles: ['donor', 'ngo'] },
    { path: '/donate', icon: MdFastfood, label: 'Share Food', roles: ['donor'] },
    { path: '/browse', icon: MdSearch, label: 'Browse Food', roles: ['ngo'] },
    { path: '/my-donations', icon: MdList, label: 'My Donations', roles: ['donor'] },
    { path: '/ngo-profile', icon: MdBusiness, label: 'NGO Profile', roles: ['ngo'] },
    { path: '/leaderboard', icon: FaTrophy, label: 'Leaderboard', roles: ['donor', 'ngo'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(profile?.role || 'donor')
  );

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-xl h-screen fixed left-0 top-0 z-40 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="flex items-center gap-3">
          <div className="text-3xl">🍽️</div>
          <div>
            <h1 className="text-xl font-bold text-emerald-600">FoodLink</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Share • Care • Connect</p>
          </div>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{profile?.name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <MdLocationOn className="w-3 h-3" />
              <span className="truncate">{profile?.location?.split(',')[0]}</span>
            </div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
              profile?.role === 'donor' 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
            }`}>
              {profile?.role === 'donor' ? 'Donor' : 'NGO'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={(e) => handleClick(item.path, e)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full"
        >
          <MdLogout className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;