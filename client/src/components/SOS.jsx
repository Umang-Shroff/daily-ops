import { useEffect, useState } from "react";

const SOS = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchSOSData = async () => {
      try {
        const response = await fetch("/sos/emergency.json");
        const json = await response.json();
        setSections(json);
      } catch (err) {
        console.error("Failed to load SOS data:", err);
      }
    };

    fetchSOSData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f5f2ee] bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] bg-repeat bg-fixed bg-top font-sans text-[#1a1a1a] px-4 py-6 md:px-12 lg:px-20">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#2b2b2b] mb-8">
        Emergency Numbers
      </h1>

      <div className="columns-1 md:columns-2 gap-6 space-y-6">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="break-inside-avoid-column bg-white rounded-xl shadow-sm border border-[#e0deda] p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-[#693b1d] border-l-4 border-[#844d28] pl-3 mb-4">
              {section.title}
            </h2>
            <ul className="space-y-4">
              {section.data.map((item, index) => (
                <li
                  key={index}
                  className="border border-[#f0ece8] rounded-lg p-4 bg-[#fdfbfa] shadow-sm"
                >
                  <p className="font-medium text-[#2b2b2b] mb-1">
                    {item.title}
                  </p>
                  <p className="text-[#844d28] font-mono text-sm">{item.pno}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SOS;
