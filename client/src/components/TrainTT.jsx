import { useState, useEffect } from "react";

const TrainTT = () => {
  const [direction, setDirection] = useState("BOR");
  const [data, setData] = useState([]);

  const fetchData = async (dir) => {
    try {
      const response = await fetch(
        `/data/${dir === "BOR" ? "Borivali" : "Parla"}.json`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch train data:", error);
    }
  };

  useEffect(() => {
    fetchData(direction);
  }, [direction]);

  return (
    <div className="min-h-screen w-full bg-[#f5f2ee] bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] bg-repeat bg-fixed bg-top font-sans text-[#1a1a1a] px-4 py-6 md:px-12 lg:px-20">
      <div className="flex justify-center mb-6">
        <div className="flex bg-[#f1e4db] border border-[#d8c0af] rounded-full p-[3px] shadow-md">
          <button
            onClick={() => setDirection("BOR")}
            className={`px-5 py-2 text-sm cursor-pointer font-medium rounded-full transition-all duration-200 ${
              direction === "BOR"
                ? "bg-[#844d28] text-white shadow"
                : "text-[#444] hover:text-[#844d28]"
            }`}
          >
            BOR ➝ VP
          </button>
          <button
            onClick={() => setDirection("VP")}
            className={`px-5 py-2 text-sm cursor-pointer font-medium rounded-full transition-all duration-200 ${
              direction === "VP"
                ? "bg-[#844d28] text-white shadow"
                : "text-[#444] hover:text-[#844d28]"
            }`}
          >
            VP ➝ BOR
          </button>
        </div>
      </div>

      {/* Timetable */}
      <div className="overflow-y-scroll max-h-[70vh] rounded-xl border border-[#e5e7eb] bg-white shadow-md">
        <table className="min-w-full text-sm text-[#1f2937] relative">
          {/* Sticky Header */}
          <thead className="sticky top-0 bg-[#fafafa] z-10 text-xs text-[#693817] uppercase tracking-wider border-b border-[#e5e7eb] shadow-sm">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">From</th>
              <th className="w-4"></th>
              <th className="px-6 py-4 text-left font-semibold">To</th>
              <th className="px-6 py-4 text-left font-semibold">Time</th>
              <th className="px-6 py-4 text-center font-semibold">Platform</th>
              <th className="px-6 py-4 text-left font-semibold">Type</th>
              <th className="px-6 py-4 text-left font-semibold">Train</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f3f4f6]">
            {data.map((train, index) => (
              <tr key={index} className="hover:bg-[#f9fafb] transition-all">
                <td className="px-6 py-4">{train.from}</td>
                <td className="relative right-6 text-gray-400">➝</td>
                <td className="px-6 py-4">{train.to}</td>
                <td className="px-6 py-4 font-semibold text-[#111827]">
                  {train.time}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-block bg-[#fee9e9] text-[#8B4513] text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
                    {train.platform}
                  </span>
                </td>
                <td className="px-6 py-4 capitalize text-[#4b5563]">
                  {train.type}
                </td>
                <td className="px-6 py-4 capitalize text-[#4b5563]">
                  {train.train}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainTT;
