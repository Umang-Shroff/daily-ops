import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      setMessage(data.message);
    };
    fetchData();
  }, []);
  return (
    <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
      <h1 className="text-4xl font-bold">{message || "Loading..."}</h1>
    </div>
  );
}

export default App;
