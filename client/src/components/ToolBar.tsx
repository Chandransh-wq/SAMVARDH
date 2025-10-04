import React from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaLink,
  FaUndo,
  FaRedo,
  FaSave,
} from 'react-icons/fa';

interface ToolBarProps {
  darkMode: boolean;
  onAction?: (action: string) => void; // callback when a button is clicked
  isSaved: boolean;
  setIsSaved: (save: boolean) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ darkMode, onAction, isSaved, setIsSaved }) => {
  const buttons = [
    { icon: <FaBold />, action: 'bold', label: 'Bold' },
    { icon: <FaItalic />, action: 'italic', label: 'Italic' },
    { icon: <FaUnderline />, action: 'underline', label: 'Underline' },
    { icon: <FaStrikethrough />, action: 'strikethrough', label: 'Strikethrough' },
    { icon: <FaListUl />, action: 'unordered-list', label: 'Unordered List' },
    { icon: <FaListOl />, action: 'ordered-list', label: 'Ordered List' },
    { icon: <FaLink />, action: 'link', label: 'Insert Link' },
    { icon: <FaUndo />, action: 'undo', label: 'Undo' },
    { icon: <FaRedo />, action: 'redo', label: 'Redo' },
    { icon: <FaSave />, action: 'save', label: isSaved ? 'Saved' : 'Save' },
  ];

  const handleClick = (action: string) => {
    if (onAction) onAction(action);

    if (action === 'save') {
      setIsSaved(true);
    }
  };

  return (
    <div
      className={`h-[4rem] px-3 flex items-center gap-2 w-full rounded-3xl ${
        darkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black'
      }`}
    >
      {buttons.map((btn) => (
        <button
          key={btn.action}
          onClick={() => handleClick(btn.action)}
          title={btn.label}
          className={`p-2 rounded transition-colors ${
            darkMode ? 'hover:bg-zinc-700/50' : 'hover:bg-zinc-300/30'
          }`}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

export default ToolBar;
