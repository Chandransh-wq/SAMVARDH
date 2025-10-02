import React, { useState } from "react";
import { createNotebook } from "../sources/notebookServices";

interface CreateNotebookFormProps {
  darkMode: boolean;
  setOpen: (open: boolean) => void;
}

interface NewNotebook {
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  favorite?: boolean;
}

const COLORS = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA"];
const TAGS = ["Computer", "Programming", "Math", "Chemistry", "Physics", "Astronomy", "Enviorment", "Finance", "Art", "AI", "Psychology", "Sociology", "Communication", "Language",  "Other"];

const CreateNotebookForm: React.FC<CreateNotebookFormProps> = ({ darkMode, setOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [color, setColor] = useState<string>(COLORS[0]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!title.trim()) return alert("Title is required");
    setLoading(true);
    try {
      const newNotebook: NewNotebook = {
        title,
        description,
        icon: "",
        color,
        favorite,
      };

      const created = await createNotebook(newNotebook);
      console.log("Created notebook:", created);
      setOpen(false);
    } catch (err) {
      console.error("Failed to create notebook:", err);
      alert("Failed to create notebook. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)}></div>
      <div className={`relative h-fit w-[32rem] p-6 rounded-3xl shadow-xl z-10 ${darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>
        <button className="absolute top-3 right-3 text-2xl font-bold hover:text-red-500" onClick={() => setOpen(false)}>&times;</button>
        <div className="text-2xl font-semibold mb-5 border-b pb-4 border-zinc-600">Create New Notebook</div>
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex gap-5 items-center">
            <label>Title:</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={`h-8 rounded-md w-full px-2 border ${darkMode ? "border-zinc-700 bg-zinc-800 text-white" : "border-black bg-white text-black"}`} />
          </div>

          {/* Description */}
          <div className="flex items-center gap-1">
            <label>Description:</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className={`h-10 rounded-md w-full px-2 py-1 border resize-none ${darkMode ? "border-zinc-700 bg-zinc-800 text-white" : "border-black bg-white text-black"}`} />
          </div>

          {/* Favorite */}
          <div className="flex items-center gap-3">
            <label className="font-medium">Mark as Favorite:</label>
            <button type="button" onClick={() => setFavorite(!favorite)} className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${favorite ? "bg-blue-500 justify-end" : "bg-gray-300 justify-start"}`}>
              <div className="w-4 h-4 bg-white rounded-full shadow-md duration-300" />
            </button>
          </div>

          {/* Color Selection */}
          <div className="flex items-center gap-3">
            <label>Assign a color:</label>
            <div className="flex gap-2">
              {COLORS.map(c => (
                <div key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-full cursor-pointer border-2 ${color === c ? "border-black" : "border-transparent"}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1">
            <label>Assign Tags:</label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag, idx) => (
                <div key={tag + idx} onClick={() => toggleTag(tag)} className={`px-3 py-1 rounded-full cursor-pointer border ${selectedTags.includes(tag) ? "bg-blue-500 text-white border-blue-500" : darkMode ? "bg-zinc-800 text-white border-zinc-700" : "bg-white text-black border-black"}`}>
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div>
            <button className="w-full h-fit p-3 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition-colors disabled:opacity-50" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotebookForm;
