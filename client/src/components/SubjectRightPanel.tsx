// SubjectRightPanel.tsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import CreateTopicForm from './CreateTopicForm';
import Carsouls from './DashBoard/Carsouls';
import type { Subjects, Topic } from '../assets/types';

interface SubjectRightPanelProps {
  subject: Subjects;
  notebookId: string;
  darkMode: boolean;
  onAddTopic: (newTopic: Topic) => void;
}

const SubjectRightPanel: React.FC<SubjectRightPanelProps> = ({ subject, darkMode, onAddTopic, notebookId }) => {
  const navigate = useNavigate();
  const [carsoulSelected, setCarsoulSelected] = useState(1);
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [monthWindowStart, setMonthWindowStart] = useState(Math.max(0, today.getMonth() - 2));
  const [showFormTopic, setShowFormTopic] = useState(false);
  const dayContainerRef = useRef<HTMLDivElement>(null);

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const daysInSelectedMonth = getDaysInMonth(today.getFullYear(), selectedMonth);
  const daysArray = Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1);

  useEffect(() => {
    const selectedEl = dayContainerRef.current?.querySelector<HTMLButtonElement>('.active-day');
    if (selectedEl && dayContainerRef.current) {
      const container = dayContainerRef.current;
      const scrollPos = selectedEl.offsetLeft - container.offsetWidth / 2 + selectedEl.offsetWidth / 2;
      container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, [selectedDay, selectedMonth]);

  const handlePrevMonth = () => { 
    if (monthWindowStart > 0) {
      setMonthWindowStart(monthWindowStart - 1);
      setSelectedMonth(selectedMonth - 1);
    }
  };
  const handleNextMonth = () => { 
    if (monthWindowStart < months.length - 4) {
      setMonthWindowStart(monthWindowStart + 1); 
      setSelectedMonth(selectedMonth + 1);
    }
  };

  let filteredTopics: Topic[] = [];
  if (subject?.topics) {
    const selectedDate = new Date(today.getFullYear(), selectedMonth, selectedDay);
    if (carsoulSelected === 1) {
      filteredTopics = subject.topics.filter(topic => !topic.dueDate || new Date(topic.dueDate) >= selectedDate);
    } else {
      filteredTopics = [...subject.topics];
    }
  }

  const CarsoulArray = [
    { name: "By Due Day", number: 1 },
    { name: "See All", number: 2 },
  ];

  return (
    <motion.div
      className={`w-1/3 relative h-[calc(100%-1rem)] -right-5 p-4 px-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} rounded-lg shadow-md`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Month Row */}
      <div className="flex items-center p-4 justify-center gap-4 text-gray-400 font-medium w-full relative mt-6">
        <button onClick={handlePrevMonth} disabled={monthWindowStart === 0} className="p-2 rounded-full bg-zinc-400 text-white disabled:opacity-40 absolute left-0">‹</button>
        <motion.div className="flex flex-nowrap gap-6 overflow-hidden mx-12">
          {months.slice(monthWindowStart, monthWindowStart + 5).map((month, idx) => {
            const realIndex = monthWindowStart + idx;
            return (
              <button
                key={realIndex}
                onClick={() => setSelectedMonth(realIndex)}
                className={`pb-1 transition ${selectedMonth === realIndex ? "text-orange-500 font-semibold border-b-2 border-orange-500" : "text-gray-400"}`}
              >
                {month}
              </button>
            );
          })}
        </motion.div>
        <button onClick={handleNextMonth} disabled={monthWindowStart >= months.length - 5} className="p-2 rounded-full bg-zinc-400 text-white disabled:opacity-40 absolute right-0">›</button>
      </div>

      {/* Date Wheel */}
      <div ref={dayContainerRef} className="flex gap-3 mt-6 overflow-x-auto my-scrollbar py-2">
        {daysArray.map(day => {
          const date = new Date(today.getFullYear(), selectedMonth, day);
          const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
          const isActive = day === selectedDay;
          return (
            <motion.button
              key={day}
              onClick={() => setSelectedDay(day)}
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`flex flex-col items-center justify-center min-w-[4rem] w-14 h-20 rounded-2xl transition ${isActive ? "bg-orange-500 text-white active-day" : darkMode ? "bg-zinc-700 text-zinc-300" : "bg-white text-gray-600"}`}
            >
              <span className="text-lg font-semibold">{day}</span>
              <span className="text-sm">{weekday}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Carsoul */}
      <div className='flex justify-evenly items-center mb-4'>
        {CarsoulArray.map(item => (
          <Carsouls key={item.number} darkMode={darkMode} name={item.name} number={item.number} selected={carsoulSelected} setSelected={setCarsoulSelected} />
        ))}
      </div>

      {/* Topics Header */}
      <div className='flex items-center justify-between'>
        <div className='text-left text-lg tracking-wide font-semibold mb-4'>
          Topics for {subject?.title || "N/A"}:
        </div>
        <button className='flex gap-4 items-center bg-orange-500 p-2 px-5 text-white rounded-full' onClick={() => setShowFormTopic(true)}>
          <FiPlus />Create
        </button>
      </div>

      {/* Topics List */}
      <div className='flex flex-col gap-5 h-[26rem] pb-4 overflow-scroll my-scrollbar'>
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, idx) => (
            <div
              key={topic._id ?? idx}
              className={`w-full rounded-2xl ${darkMode ? "bg-zinc-950 hover:bg-zinc-900" : "bg-zinc-50 hover:bg-zinc-100"} group p-3 shadow-md flex items-center gap-4 cursor-pointer`}
              onClick={() => navigate(`/subject/${topic._id}`)}
            >
              <span className='text-4xl font-bold px-4 flex items-center gap-5'>
                {(idx + 1 < 10 ? "0" + (idx + 1) : idx + 1)}
                <svg width="1" height="50" fill='black'>
                  <line x1="1" y1="0" x2="1" y2="100" stroke={darkMode ? 'white' : 'black'} strokeWidth="2" />
                </svg>
              </span>
              <div className='flex flex-col text-left text-sm w-full'>
                <div className='text-xl w-full tracking-wider flex items-center justify-between pr-3 font-normal'>
                  <span style={{ fontWeight: "2rem" }}>{topic.title}</span>
                  <span className='text-sm mt-3 tracking-wide text-zinc-500 font-semibold relative -top-1'>
                    {topic.dueDate ? new Date(topic.dueDate).toLocaleDateString("en-UK", { month: "short", day: "numeric" }) : "-"}
                  </span>
                </div>
                <span className={`text-sm tracking-wide ${darkMode ? "text-zinc-300" : "text-zinc-600"} flex items-center pr-3 justify-between`}>
                  {topic.description}
                  <div className={`${darkMode ? "bg-zinc-900" : "bg-white"} h-fit w-fit p-2 rounded-full shadow`}>
                    <FiArrowRight />
                  </div>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className='w-full text-center py-10 text-gray-500 text-lg'>
            No Topics Due for now
          </div>
        )}
      </div>

      {/* Create Topic Form */}
      {showFormTopic && (
        <div className='fixed left-[20.2rem] top-[12rem] z-50'>
<CreateTopicForm
  id={notebookId}           // notebook ID
  subjectId={subject._id}   // subject ID
  darkMode={darkMode}
  setOpen={setShowFormTopic}
  onCreated={onAddTopic}
/>

        </div>
      )}
    </motion.div>
  );
};

export default SubjectRightPanel;
