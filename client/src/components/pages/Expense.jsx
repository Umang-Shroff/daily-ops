import { useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const categorySuggestions = [
  "Food",
  "Travel",
  "Stationery",
  "Snacks",
  "College Fees",
  "Books",
  "Misc",
];

const COLORS = [
  "#844d28",
  "#c6874e",
  "#f3c892",
  "#a27241",
  "#ddb892",
  "#ae683c",
  "#693b1d",
];

const Expenses = () => {
  const [view, setView] = useState("add"); // 'add' or 'analysis'
  const [showPanel, setShowPanel] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = () => {
    if (title && price) {
      setExpenses([...expenses, { title, price: parseFloat(price) }]);
      setTitle("");
      setPrice("");
      setShowPanel(false);
    }
  };

  const handleDelete = (index) => {
    const updated = [...expenses];
    updated.splice(index, 1);
    setExpenses(updated);
  };

  const groupByCategory = () => {
    const map = {};
    expenses.forEach(({ title, price }) => {
      map[title] = (map[title] || 0) + price;
    });
    return Object.keys(map).map((key, i) => ({
      name: key,
      value: map[key],
      color: COLORS[i % COLORS.length],
    }));
  };

  const totalToday = expenses.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div className="min-h-screen w-full bg-[#f5f2ee] bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] bg-repeat bg-fixed bg-top px-4 py-6 md:px-12 lg:px-20 font-sans text-[#1a1a1a]">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#2b2b2b]">
        Daily Expense
      </h1>
      {/* Top capsule tab selector */}
      <div className="z-20  inline-block justify-center mb-6 relative top-10">
        <div className="flex bg-[#f1e4db] border border-[#d8c0af] rounded-full p-[3px] shadow-md">
          <button
            onClick={() => setView("add")}
            className={`px-5 py-2 text-sm cursor-pointer font-medium rounded-full transition-all duration-200 ${
              view === "add"
                ? "bg-[#844d28] text-white shadow"
                : "text-[#444] hover:text-[#844d28]"
            }`}
          >
            Add Expense
          </button>
          <button
            onClick={() => setView("analysis")}
            className={`px-5 py-2 text-sm cursor-pointer font-medium rounded-full transition-all duration-200 ${
              view === "analysis"
                ? "bg-[#844d28] text-white shadow"
                : "text-[#444] hover:text-[#844d28]"
            }`}
          >
            Analysis
          </button>
        </div>
      </div>

      {/* + icon */}
      {view === "add" && (
        <div className="flex justify-end mb-4 relative bottom-6">
          <button
            onClick={() => setShowPanel(true)}
            className="bg-[#844d28] cursor-pointer text-white p-3 rounded-full shadow-md hover:bg-[#693b1d] transition"
          >
            <Plus size={20} />
          </button>
        </div>
      )}

      {/* Panel */}
      {showPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6 border border-[#e0deda]">
            <button
              onClick={() => setShowPanel(false)}
              className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800 transition"
            >
              <X size={24} />
            </button>

            <h1 className="text-4xl font-extrabold tracking-tight text-[#2b2b2b] mb-6">
              Add Expense
            </h1>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category (e.g. Travel)"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setFilteredCategories(
                    categorySuggestions.filter((c) =>
                      c.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                  );
                }}
                className="w-full border border-[#d8c0af] rounded-lg px-4 py-2 focus:outline-none"
              />

              {filteredCategories.length > 0 && (
                <div className="bg-white border border-[#e0deda] rounded-md shadow-sm max-h-32 overflow-y-auto">
                  {filteredCategories.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setTitle(item);
                        setFilteredCategories([]);
                      }}
                      className="px-4 py-2 hover:bg-[#fdf3ed] cursor-pointer text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}

              <input
                type="number"
                placeholder="Price (₹)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-[#d8c0af] rounded-lg px-4 py-2 focus:outline-none"
              />

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleAddExpense}
                  className="px-6 py-2 cursor-pointer font-semibold bg-[#844d28] text-white rounded-lg hover:bg-[#693b1d] transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expense List */}
      {view === "add" && (
        <div className="space-y-4">
          {expenses.map((expense, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-white border border-[#e0deda] p-4 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-medium">{expense.title}</p>
                <p className="text-sm text-[#844d28]">₹ {expense.price}</p>
              </div>
              <button
                onClick={() => handleDelete(idx)}
                className="text-red-500 bg-red-100 rounded-full p-2 cursor-pointer hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Analysis Section */}
      {view === "analysis" && (
        <div className="bg-white border border-[#e0deda] rounded-lg shadow-md mt-14 p-6">
          <h2 className="text-xl font-bold text-[#2b2b2b] mb-4">
            Expense Breakdown (Today)
          </h2>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={groupByCategory()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {groupByCategory().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-right font-semibold text-[#2b2b2b] mt-4">
            Total Spent Today: ₹ {totalToday}
          </div>

          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 cursor-pointer font-semibold bg-[#844d28] text-white rounded-lg hover:bg-[#693b1d] transition">
              View Ledger →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
