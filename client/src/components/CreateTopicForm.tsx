import React, { useState } from "react";
import { createTopic, type NewTopicPayload } from "../sources/notebookServices";
import ImportanceSlider from "./ImportanceSlider";
import type { Topic } from "../assets/types";

interface CreateTopicFormProps {
  darkMode: boolean;
  setOpen: (open: boolean) => void;
  id: string; // Notebook ID
  subjectId: string; // Subject ID
  onCreated?: (topic: Topic) => void; // callback after creation
  isVisible?: boolean
}

const COLORS = ["#F87171","#FBBF24","#34D399","#60A5FA","#A78BFA"];

const CreateTopicForm: React.FC<CreateTopicFormProps> = ({ darkMode, id, setOpen, subjectId, isVisible, onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState(1);
  const [color, setColor] = useState<string>(COLORS[0]);
  const [loading, setLoading] = useState(false);
  const visible = isVisible ? true : false

  const handleSubmit = async () => {
    if (!title.trim()) return alert("Title is required");

    setLoading(true);
    try {
      const payload: NewTopicPayload = { 
        title, 
        description, 
        importance, 
        color, 
        content: [] 
      };
      const created: Topic = await createTopic(payload, id, subjectId);
      onCreated?.(created); // pass newly created topic to parent
      setOpen(false);
    } catch (err) {
      console.error("Failed to create topic:", err);
      alert("Failed to create topic. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {visible && <>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className={`relative h-fit w-[32rem] p-6 rounded-3xl shadow-xl z-10 ${darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>
          <button className="absolute top-3 right-3 text-2xl font-bold hover:text-red-500" onClick={() => setOpen(false)}>&times;</button>
          <div className="text-2xl font-semibold mb-5 border-b pb-4 border-zinc-600">Create New Topic</div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-5 items-center">
              <label>Title:</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                className={`h-8 rounded-md w-full px-2 border ${darkMode ? "border-zinc-700 bg-zinc-800 text-white" : "border-black bg-white text-black"}`} />
            </div>

            <div className="flex flex-col gap-1">
              <label>Description:</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)}
                className={`h-20 rounded-md w-full px-2 py-1 border resize-none ${darkMode ? "border-zinc-700 bg-zinc-800 text-white" : "border-black bg-white text-black"}`} />
            </div>

            <ImportanceSlider darkMode={darkMode} value={importance} setValue={setImportance} />

            <div className="flex items-center gap-3">
              <label>Assign a color:</label>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <div key={c} onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full cursor-pointer border-2 ${color === c ? (darkMode ? "border-white" : "border-black") : "border-transparent"}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>

            <button className="w-full h-fit p-3 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition-colors disabled:opacity-50"
              onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div></>
      }
    </div>
  );
};

export default CreateTopicForm;
