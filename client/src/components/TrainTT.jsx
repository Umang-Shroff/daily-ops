import { useState, useEffect } from "react";
import { Map, X } from "lucide-react";
import { useRef } from "react";

const TrainTT = () => {
  const [direction, setDirection] = useState("BOR");
  const [data, setData] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const rowRefs = useRef([]);
  rowRefs.current = [];

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const fetchData = async (dir) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    try {
      const response = await fetch(
        `/data/${dir === "BOR" ? "Borivali" : "Parla"}.json`
      );
      const result = await response.json();
      setData(result);
      const highlight = result.findIndex(
        (train) => timeToMinutes(train.time) >= currentMinutes
      );
      setHighlightIndex(highlight);
      setTimeout(() => {
        if (highlight !== -1 && rowRefs.current[highlight]) {
          rowRefs.current[highlight].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    } catch (error) {
      console.error("Failed to fetch train data:", error);
    }
  };

  useEffect(() => {
    fetchData(direction);
  }, [direction]);

  return (
    <div className="min-h-screen w-full bg-[#f5f2ee] bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] bg-repeat bg-fixed bg-top font-sans text-[#1a1a1a] px-4 py-6 md:px-12 lg:px-20">
      <div className="flex justify-between mb-6">
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
        <div
          className="cursor-pointer duration-300 hover:shadow-md hover:bg-[#fff6f1] rounded-lg px-3 flex justify-center items-center"
          onClick={() => setIsMapOpen(true)}
        >
          <Map className="text-[#693b1d]" />
        </div>
      </div>

      {/* Timetable */}
      <div className="overflow-y-scroll max-h-[70vh] rounded-xl border border-[#e5e7eb] bg-white shadow-md">
        <table className="min-w-full text-sm text-[#1f2937] relative">
          {/* Sticky Header */}
          <thead className="sticky top-0 bg-[#fafafa] z-10 text-xs text-[#693817] uppercase tracking-wider border-b border-[#e5e7eb] shadow-sm">
            <tr>
              <th className="px-6 py-4 w-1 text-left font-semibold">From</th>
              <th className=""></th>
              <th className="px-6 py-4 text-left font-semibold">To</th>
              <th className="px-6 py-4 text-left font-semibold">Time</th>
              <th className="px-6 py-4 text-center font-semibold">Platform</th>
              <th className="px-6 py-4 text-left font-semibold">Type</th>
              <th className="px-6 py-4 text-left font-semibold">Train</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f3f4f6]">
            {data.map((train, index) => (
              <tr
                key={index}
                ref={(el) => (rowRefs.current[index] = el)}
                className={`transition-all ${
                  index === highlightIndex
                    ? "bg-[#fff7e6] hover:bg-[#fff2d1]"
                    : "hover:bg-[#f9fafb]"
                }`}
              >
                <td className="px-6 py-4">{train.from}</td>
                <td className="relative text-gray-400">➝</td>
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

      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="relative bg-white rounded-xl shadow-lg max-w-3xl w-full mx-4 md:mx-0 overflow-hidden border border-[#e0deda]">
            {/* Close Button */}
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              <X size={24} />
            </button>

            {/* Heading */}
            <div className="px-6 pt-6 pb-4 border-b border-[#e0deda]">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#2b2b2b]">
                Station Map
              </h1>
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <iframe
                src={direction==="BOR"?"/map/borivali.png":"/map/parla.png"}
                title={direction==="BOR"?"Borivali Station:":"Parla Station:"}
                className="w-full h-[60vh] rounded-lg border border-[#e0deda]"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainTT;
