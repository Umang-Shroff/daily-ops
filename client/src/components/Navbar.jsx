import { Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-slate-800/50 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-x-2">
        <button onClick={onMenuClick} className="text-white md:ml-10">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-white md:mr-10">DailyOps</h1>
      </div>
    </nav>
  );
};

export default Navbar;
