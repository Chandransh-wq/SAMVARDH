import React, { useRef, useEffect, useState } from 'react';
import { fetchWikiFromBackend, summarize, type WikiData, type SummarizeData } from '../sources/Wikipedia';
import { toast } from 'sonner';

interface ContentProps {
  darkMode: boolean;
  text: string;
  setContent: (content: string) => void;
  isSaved?: boolean;
  content: string;
  webForm: boolean;
  setWebForm: (state: boolean) => void;
}

const Content: React.FC<ContentProps> = ({ darkMode, text, setContent, isSaved, content, webForm, setWebForm }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [wikiQuery, setWikiQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectionText, setSelectionText] = useState("");
  const [summarizeLoading, setSummarizeLoading] = useState(false);

  // Auto-focus editor on mount
  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  // Update innerText when `text` changes without breaking cursor
  useEffect(() => {
    if (!ref.current) return;

    const selection = window.getSelection();
    let cursorPos = 0;

    if (selection && selection.rangeCount > 0) {
      cursorPos = selection.getRangeAt(0).startOffset;
    }

    if (ref.current.innerText !== text) {
      ref.current.innerText = text;

      const range = document.createRange();
      const node = ref.current.firstChild || ref.current;
      range.setStart(node, Math.min(cursorPos, node.textContent?.length ?? 0));
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [text]);

  // Track text selection
  useEffect(() => {
    const handleSelection = () => {
      const sel = window.getSelection();
      if (sel && sel.toString().length >= 25) {
        setSelectionText(sel.toString());
      } else {
        setSelectionText("");
      }
    };

    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, []);

  const handleInput = () => {
    if (ref.current) setContent(ref.current.innerText);
  };

  const handleWikiFetch = async () => {
    if (!wikiQuery.trim()) return;
    setLoading(true);
    try {
      const wikiData: WikiData | null = await fetchWikiFromBackend(wikiQuery);
      if (wikiData) {
        if(content == "Start typing")
          setContent(wikiData.content)
        else
          setContent(prev => prev + "\n\n" + wikiData.content);
        toast.success(`Inserted content from ${wikiData.title}`);
      } else {
        toast.error("Page not found on Wikipedia");
      }
    } catch {
      toast.error("Failed to fetch Wikipedia page");
    } finally {
      setLoading(false);
      setWebForm(false)
    }
  };

  const handleSummarize = async () => {
    if (!selectionText || !ref.current) return;
    setSummarizeLoading(true);
    try {
      const summaryData: SummarizeData | null = await summarize(selectionText);
      if (summaryData?.summary) {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);

          // Remove selected text
          range.deleteContents();

          // Insert summary at selection
          range.insertNode(document.createTextNode(summaryData.summary));

          // Move cursor after inserted text
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);

          // Update React state
          setContent(ref.current.innerText);
        }
        toast.success("Summary added!");
      } else {
        toast.error("Failed to summarize text");
      }
    } catch {
      toast.error("Error during summarization");
    } finally {
      setSummarizeLoading(false);
      setSelectionText("");
    }
  };

  return (
    <>
      <div className='hidden'>{isSaved ? "true" : "false"}</div>

      {/* Wikipedia fetch */}
      {webForm &&
        <div className="my-4 flex gap-2 items-center h-fit w-fit bg-white shadow-md absolute p-4 z-20 left-[50%] top-[50%]">
          <label>Acess an information</label>
          <input
            type="text"
            placeholder="Enter Wikipedia page"
            className="border rounded px-3 py-1 flex-1"
            value={wikiQuery}
            onChange={(e) => setWikiQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
            onClick={handleWikiFetch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get"}
          </button>
        </div>
      }
      {/* Editable content area */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className={`h-full w-full p-4 my-scrollbar outline-none overflow-auto resize-none relative ${
          darkMode ? 'text-gray-100' : 'text-gray-800'
        }`}
        style={{ whiteSpace: 'pre-wrap' }}
      />

      {/* Summarize button */}
      {selectionText && (
        <button
          onClick={handleSummarize}
          disabled={summarizeLoading}
          className="fixed bottom-10 right-10 z-50 bg-orange-500 text-white px-4 py-2 rounded shadow-lg"
        >
          {summarizeLoading ? "Summarizing..." : "Summarize"}
        </button>
      )}
    </>
  );
};

export default Content;
