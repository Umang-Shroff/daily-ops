import { AlertCircle, X, Minus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const sideBarData = [
    { label: "News", route: "/" },
    { label: "Train Timetable", route: "/train" },
    { label: "Expense Tracker", route: "/expenses" },
    { label: "Notes", route: "/notes" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-20 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] bg-repeat bg-fixed text-[#1a1a1a] z-50 shadow-xl border-r border-[#e0deda] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex justify-between items-center bg-white border-b border-[#e0deda]">
          <h2 className="text-lg font-bold tracking-tight">Menu</h2>
          <button
            onClick={onClose}
            className="text-[#555] cursor-pointer hover:text-[#6c462c] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-5 space-y-3 text-sm">
          {sideBarData.map(({ label, route }) => (
            <button
              key={route}
              onClick={() => {
                navigate(route);
                onClose();
              }}
              className={`flex items-center gap-3 font-serif text-[16px] cursor-pointer py-[5px] pl-2 w-full text-left transition-colors ${
                isActive(route)
                  ? "text-[#9c5e5e]"
                  : "text-[#555] hover:text-[#9c5e5e]"
              }`}
            >
              <Minus size={15} />
              {label}
            </button>
          ))}

          <button className="flex items-center gap-3 bg-red-100 text-red-900 font-semibold rounded-lg px-3 py-2 mt-6 shadow hover:bg-red-200 cursor-pointer transition-all w-full text-left">
            <AlertCircle size={15} className="text-red-900" />
            SOS
          </button>
        </div>
        {/* <div className="p-5 space-y-3  text-sm">
          <button className="flex items-center font-serif text-[16px] text-[#555] gap-3 cursor-pointer rounded-md py-[5px] pl-2 hover:text-[#ad8484] transition-colors w-full text-left">
            <Minus size={15} />
            News
          </button>

          <button className="flex items-center font-serif text-[16px] text-[#555] gap-3 cursor-pointer rounded-md py-[5px] pl-2 hover:text-[#ad8484] transition-colors w-full text-left">
            <Minus size={15} />
            Train Timetable
          </button>

          <button className="flex items-center gap-3 font-serif text-[16px] text-[#555] cursor-pointer rounded-md py-[5px] pl-2 hover:text-[#ad8484] transition-colors w-full text-left">
            <Minus size={15} />
            Expense Tracker
          </button>

          <button className="flex items-center gap-3 font-serif text-[16px] text-[#555] cursor-pointer rounded-md py-[5px] pl-2 hover:text-[#ad8484] transition-colors w-full text-left">
            <Minus size={15} />
            Notes
          </button>

          <button className="flex items-center gap-3 bg-red-100 text-red-900 font-semibold rounded-lg px-3 py-2 mt-6 shadow hover:bg-red-200 cursor-pointer transition-all w-full text-left">
            <AlertCircle size={15} className="text-red-900" />
            SOS
          </button>
        </div> */}
      </aside>
    </>
  );
};

export default Sidebar;
