import React from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onNavigate?: (view: string) => void;
  activeView?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onNavigate, activeView }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar onNavigate={onNavigate} activeView={activeView} />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;