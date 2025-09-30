import React from 'react';
import { FaFlask, FaAtom, FaCalculator, FaPaintBrush, FaBook, FaCode } from "react-icons/fa";
import { notebookData } from '../../assets/demodata';

interface NotebookListProps {
  darkMode?: boolean;
}

// Tag → Icon mapping
const tagIconMap: Record<string, React.ElementType> = {
  science: FaFlask,
  chemistry: FaAtom,
  physics: FaCalculator,
  math: FaCalculator,
  design: FaPaintBrush,
  history: FaBook,
  english: FaBook,
  programming: FaCode,
};

// Function to get icon for an array of tags
const getIconForTags = (tags: string[]) => {
  if (!tags || tags.length === 0) return null;
  for (let tag of tags) {
    if (tagIconMap[tag]) return tagIconMap[tag];
  }
  return null;
};

const NotebookList: React.FC<NotebookListProps> = ({ darkMode }) => {
  return (
    <div className='flex flex-wrap flex-col w-full'>
      {notebookData.map((notebook) => {
        // Collect all subject tags from this notebook
        const allTags = notebook.subjects.flatMap(subject => subject.tags);
        const Icon = getIconForTags(allTags); // Get icon for the first matching tag

        return (
          <div
            key={notebook.id}
            className={`border ${darkMode ? 'border-zinc-700 secondary-dark' : 'border-gray-300 primary-light'} p-4 m-2 rounded-lg hover:scale-105 w-full transition-transform cursor-pointer text-left flex items-center gap-2 shadow-md`}
          >
            {Icon && <Icon className={`text-xl ${darkMode ? "text-zinc-50" : "text-zinc-800"} mr-5`} />}
            <div>
              <div className="text-xl font-bold">{notebook.title}</div>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {notebook.subjects.length} Subject{notebook.subjects.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NotebookList;
