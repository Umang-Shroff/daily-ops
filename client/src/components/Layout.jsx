import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <main className="pt-16"> {/* Add padding to top to avoid content being hidden by fixed navbar */}
        <Outlet /> {/* This is where our page components (like NewsFeed) will be rendered */}
      </main>
    </div>
  );
};

export default Layout;