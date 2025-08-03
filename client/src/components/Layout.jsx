import { useState } from "react";
import { CornerLeftUp } from "lucide-react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen bg-[#f5f2ee] bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] bg-repeat font-sans text-[#1a1a1a]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <main className="pt-20 px-4 md:px-12 lg:px-20 relative z-10">
        <Outlet />
      </main>
      <button
        onClick={() => scrollToTop()}
        className="fixed bottom-6 cursor-pointer right-6 z-50 p-3 bg-[#844d28] text-white rounded-full shadow-lg transition-all hover:bg-[#6d4930] focus:outline-none"
      >
        <CornerLeftUp />
      </button>
    </div>
  );
};

export default Layout;
