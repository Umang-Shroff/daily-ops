import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X, Pencil, Trash2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import bcrypt from "bcryptjs";

const Notes = () => {
  // madhav
  const access_password = "$2b$10$tUGkt98XnSTXzMmX83xtcu66oao79jaeMrc8QgqMKxbNgqf5hFy2W";
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPass, setInputPass] = useState("");

  const [notes, setNotes] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    document.body.style.overflow = authenticated ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [authenticated]);

  const handleCheckPassword = () => {
    bcrypt.compare(inputPass, access_password, (err, res) => {
      if (err) {
        console.error("Error comparing passwords", err);
      } else if (res) {
        setAuthenticated(true);
      } else {
        alert("Incorrect passkey");
      }
    });
  };

  const API =
    import.meta.env.MODE === "production"
      ? "https://daily-ops.onrender.com/api/notes"
      : "http://localhost:5000/api/notes";

  const fetchNotes = async () => {
    try {
      const response = await axios.get(API);
      setNotes(response.data);
    } catch (e) {
      console.error("Error fetching notes:", e);
      toast.error("Error fetching notes!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async () => {
    if (!formData.title || !formData.content) return;
    try {
      if (editingId) {
        // Update existing note
        const response = await axios.put(`${API}/${editingId}`, formData);
        const updatedNote = response.data;
        setNotes((prev) =>
          prev.map((note) => (note._id === editingId ? updatedNote : note))
        );
      } else {
        // Create new note
        const response = await axios.post(API, formData);
        setNotes((prev) => [...prev, response.data]);
      }
      closePanel();
      toast.success("Note saved successfully!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } catch (e) {
      console.error("Error saving note:", e);
    }
  };

  const openPanel = (note = null) => {
    if (note) {
      setFormData({ title: note.title, content: note.content });
      setEditingId(note._id);
    } else {
      setFormData({ title: "", content: "" });
      setEditingId(null);
    }
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setFormData({ title: "", content: "" });
    setEditingId(null);
  };

  // const handleSave = () => {
  //   const timestamp = new Date().toLocaleString();
  //   const newNote = { ...formData, timestamp };

  //   if (editIndex !== null) {
  //     const updated = [...notes];
  //     updated[editIndex] = { ...updated[editIndex], ...newNote };
  //     setNotes(updated);
  //   } else {
  //     setNotes([...notes, newNote]);
  //   }

  //   closePanel();
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchNotes();
      toast.success("Note Deleted Successfully", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      <Toaster
        containerStyle={{
          top: 80,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        className="z-50"
      />
      {!authenticated ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f2ee] backdrop-blur-md">
          <div className="bg-white shadow-md p-6 rounded-xl border border-[#ccc] w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#693b1d]">
              Enter Passkey to Access Expenses
            </h2>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-[#693b1d]"
              placeholder="Enter passkey..."
              value={inputPass}
              onChange={(e) => setInputPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheckPassword()}
            />
            <button
              onClick={handleCheckPassword}
              className="w-full cursor-pointer bg-[#693b1d] text-white py-2 rounded-lg hover:bg-[#512f16] transition"
            >
              Unlock
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full bg-[#f5f2ee] bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] bg-repeat bg-fixed bg-top font-sans text-[#1a1a1a] px-4 py-6 md:px-12 lg:px-20 relative">
          {/* Heading */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#2b2b2b]">
              Quick Capture
            </h1>
            <button
              onClick={() => openPanel()}
              className="p-2 rounded-full cursor-pointer bg-[#844d28] text-white shadow hover:bg-[#6e3f20] transition"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => (
              <div
                key={note._id}
                className="bg-white rounded-xl p-4 border border-[#e0deda] shadow hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-[#2b2b2b] mb-2">
                    {note.title}
                  </h2>
                  <p className="text-sm text-[#4b5563] line-clamp-4 mb-3">
                    {note.content}
                  </p>
                  <p className="text-xs text-gray-400 relative top-6 inline-block">
                    {new Date(note.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex justify-end space-x-2 mt-3">
                  <button
                    onClick={() => openPanel(note)}
                    className="text-[#693b1d] cursor-pointer hover:text-[#2b2b2b] transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Panel Modal */}
          {isPanelOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
              <div className="relative bg-white rounded-xl shadow-lg max-w-xl w-full mx-4 md:mx-0 overflow-hidden border border-[#e0deda]">
                {/* Close Button */}
                <button
                  onClick={closePanel}
                  className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800 transition"
                >
                  <X size={24} />
                </button>

                {/* Heading */}
                <div className="px-6 pt-6 pb-4 border-b border-[#e0deda]">
                  <h1 className="text-3xl font-extrabold tracking-tight text-[#2b2b2b]">
                    {editingId !== null ? "Edit Note" : "Add Note"}
                  </h1>
                </div>

                {/* Form */}
                <div className="p-6 space-y-4">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Title"
                    className="w-full border border-[#e0deda] rounded-md px-4 py-2 text-sm text-[#2b2b2b] focus:outline-none focus:ring-2 focus:ring-[#844d28]/40"
                  />
                  <textarea
                    rows={6}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Write your note..."
                    className="w-full border border-[#e0deda] rounded-md px-4 py-2 text-sm text-[#2b2b2b] resize-none focus:outline-none focus:ring-2 focus:ring-[#844d28]/40"
                  ></textarea>
                </div>

                {/* Save Button */}
                <div className="px-6 pb-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="bg-[#844d28] cursor-pointer text-white px-6 py-2 rounded-lg font-medium hover:bg-[#6e3f20] transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Notes;
