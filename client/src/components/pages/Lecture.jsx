import { useEffect, useState } from "react";

const Lecture = () => {
  const [todayLectures, setTodayLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await fetch("data/Lecture.json");
        const allData = await res.json();

        const today = new Date().toLocaleString("en-US", {
          weekday: "long",
        });

        const todayData = allData.find(
          (d) => d.day.toLowerCase() === today.toLowerCase()
        );

        if (todayData) setTodayLectures(todayData.lectures);
      } catch (err) {
        console.error("Error fetching lecture data:", err);
      }
    };

    fetchLectures();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f5f2ee] bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] bg-repeat bg-fixed bg-top font-sans text-[#1a1a1a] px-4 py-6 md:px-12 lg:px-20">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#2b2b2b] mb-8">
        Today's Timetable
      </h1>
      <h2 className="text-2xl text-[#693817] font-bold mb-10">
        {new Date().toLocaleDateString("en-US", { weekday: "long" })}
      </h2>
      {todayLectures.length > 0 ? (
        <div className="overflow-x-auto border border-[#e0deda] bg-white rounded-xl shadow-sm">
          <table className="min-w-full text-sm text-[#1f2937]">
            <thead className="bg-[#fafafa] text-[#693817] uppercase tracking-wider text-xs border-b border-[#e0deda] sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Time</th>
                <th className="px-6 py-4 text-left font-semibold">Subject</th>
                <th className="px-6 py-4 text-left font-semibold">Teacher</th>
                <th className="px-6 py-4 text-left font-semibold">Room</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {todayLectures.map((lecture, idx) => (
                <tr
                  key={idx}
                  className={`transition-all ${
                    lecture.subject.toLowerCase() === "break"
                      ? "bg-[#fff8f0] text-[#a65e20] font-semibold italic"
                      : "hover:bg-[#f9fafb]"
                  }`}
                >
                  <td className="px-6 py-4 font-mono">
                    {parseInt(lecture.start.split(":")[0]) > 12
                      ? parseInt(lecture.start.split(":")[0]) -
                        12 +
                        ":" +
                        lecture.start.split(":")[1] +
                        " PM"
                      : lecture.start + " AM"}{" "}
                    -{" "}
                    {parseInt(lecture.end.split(":")[0]) > 12
                      ? parseInt(lecture.end.split(":")[0]) -
                        12 +
                        ":" +
                        lecture.end.split(":")[1] +
                        " PM"
                      : lecture.end + " AM"}
                  </td>
                  <td className="px-6 py-4 font-semibold">{lecture.subject}</td>
                  <td className="px-6 py-4">{lecture.teacher}</td>
                  <td className="px-6 py-4 font-semibold">{lecture.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No lectures today 🎉</p>
      )}
    </div>
  );
};

export default Lecture;
