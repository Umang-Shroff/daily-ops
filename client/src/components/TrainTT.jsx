import { useState, useEffect } from 'react';

const TrainTT = () => {
  const [direction, setDirection] = useState('BOR');
  const [data, setData] = useState([]);

  const fetchData = async (dir) => {
    try {
      const response = await fetch(`/data/${dir === 'BOR' ? 'Borivali' : 'Parla'}.json`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch train data:', error);
    }
  };

  useEffect(() => {
    fetchData(direction);
  }, [direction]);

  return (
    <div className="min-h-screen w-full bg-[#f5f2ee] bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] bg-repeat bg-fixed bg-top font-sans text-[#1a1a1a] px-4 py-6 md:px-12 lg:px-20">
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-4 sticky top-0 z-10 bg-[#f5f2ee]/95 backdrop-blur-md py-2 px-1 border-b border-[#d9d4ce]">
        <button
          onClick={() => setDirection('BOR')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            direction === 'BOR' ? 'bg-[#8833dc] text-white shadow' : 'text-[#444] hover:text-[#8833dc]'
          }`}
        >
          BOR ➝ VP
        </button>
        <button
          onClick={() => setDirection('VP')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            direction === 'VP' ? 'bg-[#8833dc] text-white shadow' : 'text-[#444] hover:text-[#8833dc]'
          }`}
        >
          VP ➝ BOR
        </button>
      </div>

      {/* Timetable */}
      <div className="overflow-y-scroll max-h-[70vh] border border-[#e0deda] rounded-xl bg-white shadow-inner">
        <table className="min-w-full table-fixed text-left text-sm">
          <thead className="bg-[#f0e9ff] text-[#222] uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">To</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Train</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0deda]">
            {data.map((train, index) => (
              <tr key={index} className="hover:bg-[#f9f6ff] transition-all duration-200">
                <td className="px-4 py-3">{train.from}</td>
                <td className="px-4 py-3">{train.to}</td>
                <td className="px-4 py-3">{train.time}</td>
                <td className="px-4 py-3">{train.platform}</td>
                <td className="px-4 py-3">{train.type}</td>
                <td className="px-4 py-3">{train.train}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainTT;
