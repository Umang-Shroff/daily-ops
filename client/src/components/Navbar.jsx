import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-[#f5f2ee]/80 backdrop-blur-md shadow-md border-b border-[#e0deda]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="text-[#333] md:ml-10 cursor-pointer hover:text-[#8833dc] transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1
          className="text-2xl font-extrabold tracking-tight text-[#2b2b2b] md:mr-10 cursor-pointer hover:text-[#8833dc] transition-colors"
          onClick={() => {
            navigate("/");
          }}
        >
          DailyOps
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
