import React, { useRef, useEffect } from 'react';

interface ContentProps {
  darkMode: boolean;
  text: string;
  setContent: (content: string) => void;
  isSaved?: boolean;
}

const Content: React.FC<ContentProps> = ({ darkMode, text, setContent }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Auto-focus editor on mount
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  // Update innerText when `text` changes without breaking cursor
  useEffect(() => {
    if (!ref.current) return;

    const selection = window.getSelection();
    let cursorPos = 0;

    // Safe check for a selection range
    if (selection && selection.rangeCount > 0) {
      cursorPos = selection.getRangeAt(0).startOffset;
    }

    if (ref.current.innerText !== text) {
      ref.current.innerText = text;

      // Restore cursor safely
      const range = document.createRange();
      const node = ref.current.firstChild || ref.current;
      range.setStart(node, Math.min(cursorPos, node.textContent?.length ?? 0));
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [text]);

  const handleInput = () => {
    if (ref.current) setContent(ref.current.innerText);
  };

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      className={`h-full w-full p-4 outline-none overflow-auto resize-none ${
        darkMode ? 'bg-zinc-800 text-gray-100' : 'bg-white text-gray-800'
      }`}
      style={{ whiteSpace: 'pre-wrap' }}
    />
  );
};

export default Content;
