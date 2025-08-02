import { X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800 text-white z-30 shadow-lg transform transition-transform duration-400 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-slate-700">
          <h2 className="font-bold">Menu</h2>
          <button onClick={onClose} className="text-white cursor-pointer">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          {/* Navigation links will go here */}
          <p className="text-gray-400">Features coming soon...</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;