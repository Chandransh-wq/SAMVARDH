import React, { useState } from "react";
import { createPage } from "../sources/notebookServices";
import { toast } from "sonner";

interface CreateContentFormProps {
  darkMode: boolean;
  setOpen: (open: boolean) => void;
  notebookId: string;
  subjectId: string;
  topicId: string;
  onContentCreated?: (newContent: NewPage) => void;
}

export interface NewPage {
  page: string;
  pageContent: string;
  createdAt?: string;
  editedAt?: string;
  tags?: string[];
}

const TAGS = [
  "Computer","Programming","Math","Chemistry","Physics","Astronomy",
  "Environment","Finance","Art","AI","Psychology","Sociology",
  "Communication","Language","Other",
];

const CreateContentForm: React.FC<CreateContentFormProps> = ({
  darkMode,
  setOpen,
  notebookId,
  subjectId,
  topicId,
  onContentCreated
}) => {
  const [page, setPage] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!page.trim()) return;

    setLoading(true);
    try {
      const newPage: NewPage = {
        page: page.trim(),
        pageContent: pageContent.trim(),
        tags: selectedTags,
        createdAt: new Date().toISOString(),
        editedAt: new Date().toISOString(),
      };

      // Call backend
      const created = await createPage(newPage, notebookId, subjectId, topicId);

      toast.success("Page created successfully");

      if (onContentCreated) {
        // Backend returns the page directly, so no need for extra checks
        const safeContent: NewPage = {
          page: created.page,
          pageContent: created.pageContent,
          tags: Array.isArray(created.tags) ? created.tags : [],
          createdAt: created.createdAt ?? new Date().toISOString(),
          editedAt: created.editedAt ?? new Date().toISOString(),
        };
        onContentCreated(safeContent);
      }

      // Reset form
      setPage("");
      setPageContent("");
      setSelectedTags([]);
      setOpen(false);

    } catch (err) {
      console.error(err);
      toast.error("Failed to create page. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div
        className={`relative w-[32rem] p-6 rounded-3xl shadow-xl z-10 ${
          darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
        }`}
      >
        <button
          className="absolute top-3 right-3 text-2xl font-bold hover:text-red-500"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <div className="text-2xl font-semibold mb-5 border-b pb-4 border-zinc-600">
          Create New Page
        </div>
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              className={`h-10 rounded-md px-3 border focus:outline-none ${
                darkMode
                  ? "border-zinc-700 bg-zinc-800 text-white focus:border-blue-500"
                  : "border-zinc-400 bg-white text-black focus:border-blue-500"
              }`}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={pageContent}
              onChange={(e) => setPageContent(e.target.value)}
              rows={4}
              className={`rounded-md px-3 py-2 border resize-none focus:outline-none ${
                darkMode
                  ? "border-zinc-700 bg-zinc-800 text-white focus:border-blue-500"
                  : "border-zinc-400 bg-white text-black focus:border-blue-500"
              }`}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1">
            <label>Assign Tags</label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag, idx) => (
                <div
                  key={tag + idx}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full cursor-pointer border transition-colors select-none ${
                    selectedTags.includes(tag)
                      ? "bg-blue-500 text-white border-blue-500"
                      : darkMode
                      ? "bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700"
                      : "bg-white text-black border-zinc-400 hover:bg-zinc-100"
                  }`}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            className="w-full py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading || !page.trim()}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContentForm;
