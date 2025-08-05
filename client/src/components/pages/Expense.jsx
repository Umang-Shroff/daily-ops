import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X, Trash2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

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
  const [view, setView] = useState("add");
  const [showPanel, setShowPanel] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const [ledgerData, setLedgerData] = useState({});

  const API =
    import.meta.env.MODE === "production"
      ? "https://your-production-url.com/api/expenses"
      : "http://localhost:5000/api/expenses";

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API}/today`);

      if (res.data.length > 0) {
        setExpenses(res.data[0].entries);
      } else {
        setExpenses([]);
      }
    } catch (e) {
      console.error("Error fetching expenses", e);
      setExpenses([]);
    }
  };

  const cleanupOldData = async () => {
    try {
      await axios.delete(`${API}/cleanup`);
    } catch (e) {
      console.error("Cleanup error:", e);
    }
  };

  useEffect(() => {
    fetchExpenses();
    cleanupOldData();
  }, []);

  const handleAddExpense = async () => {
    if (!title || !price) return;
    try {
      const res = await axios.post(API, { title, price: parseFloat(price) });
      setExpenses(res.data); // backend returns updated array
      setTitle("");
      setPrice("");
      setShowPanel(false);
    } catch (e) {
      console.error("Error adding expense", e);
    }
  };

  const handleDelete = async (cat) => {
    try {
      await axios.delete(`${API}/${cat}`);
      fetchExpenses(); // Refetch to update
    } catch (e) {
      console.error("Error deleting", e);
    }
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

  const fetchLedger = async () => {
    try {
      const res = await axios.get(`${API}/ledger`);
      setLedgerData(res.data);
      setLedgerOpen(true);
    } catch (e) {
      console.error("Ledger fetch error", e);
    }
  };

  return (
    <div className="min-h-screen w-full  px-6 py-8 font-sans text-[#1a1a1a]">
      <div className="flex justify-center mb-6">
        <div className="flex bg-[#f1e4db] border border-[#d8c0af] rounded-full p-[3px] shadow-md">
          <button
            onClick={() => setView("add")}
            className={`px-5 py-2 cursor-pointer text-sm font-medium rounded-full transition-all duration-200 ${
              view === "add"
                ? "bg-[#844d28] text-white shadow"
                : "text-[#444] hover:text-[#844d28]"
            }`}
          >
            Add Expense
          </button>
          <button
            onClick={() => setView("analysis")}
            className={`px-5 py-2 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ${
              view === "analysis"
                ? "bg-[#844d28] text-white shadow"
                : "text-[#444] hover:text-[#844d28]"
            }`}
          >
            Analysis
          </button>
        </div>
      </div>

      {/* Add Expense View */}
      {view === "add" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Today's Expenses</h2>
            <button
              onClick={() => setShowPanel(true)}
              className="p-2 rounded-full cursor-pointer bg-[#844d28] text-white hover:bg-[#6e3f20] transition"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="grid gap-4">
            {expenses.map((exp, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-semibold text-[#2b2b2b]">
                    {exp.title}
                  </p>
                  <p className="text-xs text-[#693b1d]">₹ {exp.price}</p>
                </div>
                <button
                  onClick={() => handleDelete(exp.title)}
                  className="cursor-pointer text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Analysis View */}
      {view === "analysis" && (
        <div className="flex flex-col items-center">
          <div className="w-full h-[300px] md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={groupByCategory()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name }) => name}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
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

          <p className="mt-4 text-lg font-bold text-[#2b2b2b]">
            Total Expense Today: ₹{totalToday.toFixed(2)}
          </p>

          <button
            onClick={fetchLedger}
            className="mt-6 px-5 py-2 cursor-pointer rounded-full bg-[#844d28] text-white hover:bg-[#6e3f20] transition"
          >
            Ledger
          </button>
        </div>
      )}

      {/* Ledger Panel */}
      {ledgerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 p-6 relative">
            <button
              onClick={() => setLedgerOpen(false)}
              className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#2b2b2b]">
              Monthly Ledger
            </h2>
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              {Object.entries(ledgerData).map(([day, records], i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 border border-[#e0deda] shadow-sm"
                >
                  {/* Header: Date + Total */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#693b1d] border-l-4 border-[#844d28] pl-3">
                      {day}
                    </h2>
                    <p className="text-sm font-medium text-[#844d28]">
                      Total: ₹{records.total}
                    </p>
                  </div>

                  {/* Category breakdown */}
                  {records.categories.map((rec, j) => (
                    <div key={j} className="flex justify-between">
                      <span>{rec.title}</span>
                      <span className="text-[#693b1d] font-medium">
                        ₹{rec.price}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Panel */}
      {showPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6 relative">
            <button
              onClick={() => setShowPanel(false)}
              className="absolute top-4 cursor-pointer right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#2b2b2b]">
              Add Expense
            </h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              list="categories"
              placeholder="Category"
              className="w-full border border-[#e0deda] rounded-md px-4 py-2 mb-3"
            />
            <datalist id="categories">
              {categorySuggestions.map((cat, i) => (
                <option key={i} value={cat} />
              ))}
            </datalist>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price in ₹"
              className="w-full border border-[#e0deda] rounded-md px-4 py-2 mb-6"
            />

            <div className="flex justify-end">
              <button
                onClick={handleAddExpense}
                className="px-6 py-2 cursor-pointer rounded-lg bg-[#844d28] text-white hover:bg-[#6e3f20]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
