// SubjectLeftPanel.tsx
import React, { useState } from 'react';
import { FiPlus, FiStar, FiCalendar, FiClock } from 'react-icons/fi';
import { hexToRgba } from '../assets/functions';
import { basic } from '../assets/Illustraitions/basics';
import type { Notebook, Subjects } from '../assets/types';
import CreateSubjectForm from './CreateSubjectForm';

interface SubjectLeftPanelProps {
  notebook: Notebook;
  selected: number;
  setSelected: (index: number) => void;
  darkMode: boolean;
  onAddSubject: (newSubject: Subjects) => void;
}

const SubjectLeftPanel: React.FC<SubjectLeftPanelProps> = ({
  notebook,
  setSelected,
  darkMode,
  onAddSubject
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-1/2 text-left pl-12">
      {/* Notebook Header */}
      <div>
        <span className='text-3xl tracking-wider font-semibold flex items-center gap-3'>
          <div className='h-5 w-5 rounded-full' style={{ backgroundColor: darkMode ? notebook?.color : hexToRgba(notebook?.color ?? "#ccc", 0.7) }}></div>
          {notebook?.title || "Notebook not found"}
        </span>
        <span className='flex items-center gap-5 text-md text-zinc-500 mt-2'>
          <span className='flex items-center gap-2'>
            <FiCalendar />
            {notebook ? new Date(notebook.createdAt ?? "").toLocaleDateString("en-UK", { year: "numeric", month: "long", day: "numeric" }) : "-"}
          </span>
          <span className='flex items-center gap-2'>
            <FiClock />
            {notebook ? new Date(notebook.createdAt ?? "").toLocaleDateString("en-UK", { weekday: "short" }) : "-"}
          </span>
        </span>
      </div>

      {/* Subject List */}
      <div className='mt-5'>
        <div className='flex items-center pr-2 justify-between'>
          <span className='text-2xl tracking-wider font-semibold mb-4'>Subjects:</span>
          <div>
            <button className='flex gap-4 items-center bg-orange-500 text-white p-2 px-5 rounded-full relative -top-1 shadow-md' onClick={() => setShowForm(true)}>
              <FiPlus />Create
            </button>
          </div>
        </div>
        <div className='mt-5 w-full flex flex-col gap-15 h-[40rem] my-scrollbar pb-4 px-2 overflow-scroll'>
          {notebook?.subjects?.map((subject: Subjects, idx: number) => {
            const tagKey = subject.tags?.find(tag => tag in basic) || "Other";
            return (
              <div
                key={subject._id}
                className={`flex p-3 rounded-3xl ${darkMode ? "bg-zinc-900" : "bg-white"} shadow-lg gap-5`}
                onClick={() => setSelected(idx)}
              >
                <div className='w-1/4 p-2'>
                  <div dangerouslySetInnerHTML={{ __html: basic[tagKey as keyof typeof basic] }} />
                </div>
                <div className='flex flex-col w-3/4'>
                  <span className='flex items-center justify-between'>
                    <span className='text-xl tracking-wider'>{subject.title}</span>
                    <span className='flex gap-2 items-center mr-16'>
                      <FiStar fill={darkMode ? 'white' : 'black'} />{subject.importance}
                    </span>
                  </span>
                  <span className='text-md tracking-wide text-zinc-600 mt-1 mb-3'>{subject.description}</span>
                  <div className='flex gap-4 my-1'>
                    {subject.tags?.map((tag, i) => (
                      <div key={i} className='bg-blue-100 p-2 px-3 rounded-lg text-black'>{tag}</div>
                    ))}
                  </div>
                  <div className='flex items-center justify-between pr-6'>
                    <span className='mt-3'>Created At :&nbsp;
                      <span className='font-semibold text-lg'>
                        {subject.createdAt ? new Date(subject.createdAt).toLocaleDateString("en-UK", { month: "short", day: "numeric" }) : "-"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Subject Form */}
      {showForm && (
        <div className='fixed left-[20.2rem] top-[12rem] z-50'>
          <CreateSubjectForm
            setOpen={setShowForm}
            id={notebook._id ? notebook._id : ""}
            darkMode={darkMode}
            onCreated={(newSubject: Subjects) => onAddSubject(newSubject)}
          />
        </div>
      )}
    </div>
  );
};

export default SubjectLeftPanel;
