import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getComputedData, hexToRgba } from '../assets/functions';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiClock, FiStar } from 'react-icons/fi';
import { basic } from '../assets/Illustraitions/basics';
import Carsouls from '../components/DashBoard/Carsouls';
import type { Notebook, subject, topic } from '../sources/notebookServices';

interface SubjectProps {
  darkMode: boolean;
}

const Subject: React.FC<SubjectProps> = ({ darkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notebookData, setNotebook] = useState<Notebook[]>([]);
  const [selected, setSelected] = useState(0);
  const [carsoulSelected, setCarsoulSelected] = useState(1);

  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [monthWindowStart, setMonthWindowStart] = useState(Math.max(0, today.getMonth() - 2));

  const dayContainerRef = useRef<HTMLDivElement>(null);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const daysInSelectedMonth = getDaysInMonth(today.getFullYear(), selectedMonth);
  const daysArray = Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1);

  useEffect(() => {
    const fetchData = async () => {
      const { notebooks: fetchedNotebooks } = await getComputedData();
      setNotebook(fetchedNotebooks);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selectedEl = dayContainerRef.current?.querySelector<HTMLButtonElement>('.active-day');
    if (selectedEl && dayContainerRef.current) {
      const container = dayContainerRef.current;
      const scrollPos = selectedEl.offsetLeft - container.offsetWidth / 2 + selectedEl.offsetWidth / 2;
      container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, [selectedDay, selectedMonth]);

  if (!notebookData.length) return <div>Loading notebooks...</div>;

  const notebook = notebookData.find(nb => nb._id === id);
  const selectedSubject: subject | undefined = notebook?.subjects?.[selected];

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

  const options1: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const options2: Intl.DateTimeFormatOptions = { weekday: "short" };
  const options3: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const options4: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };

  const CarsoulArray = [
    { name: "By Due Day", number: 1 },
    { name: "See All", number: 2 },
  ];

  // --- Topics filtering logic moved outside JSX and typed properly ---
  let filteredTopics: topic[] = [];
  if (selectedSubject?.topics) {
    const selectedDate = new Date(today.getFullYear(), selectedMonth, selectedDay);
    if (carsoulSelected === 1) {
      filteredTopics = selectedSubject.topics.filter((topic: topic) => {
        if (!topic.dueDate) return true;
        const topicDate = new Date(topic.dueDate);
        return topicDate >= selectedDate;
      });
    } else {
      filteredTopics = [...selectedSubject.topics]; // See All
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${darkMode ? 'primary-dark' : 'primary-light'} flex justify-evenly h-[92vh] md:w-[calc(100%)] absolute md:top-[4.5rem] pt-5 top-0 left-0 w-screen pl-16 gap-5`}
    >
      {/* LEFT PANEL */}
      <div className="w-1/2 text-left pl-12">
        {/* Header */}
        <div>
          <span className='text-3xl tracking-wider font-semibold flex items-center gap-3'>
            <div className='h-5 w-5 rounded-full' style={{ backgroundColor: darkMode ? notebook?.color : hexToRgba(notebook?.color ?? "#ccc", 0.7) }}></div>
            {notebook?.title || "Notebook not found"}
          </span>
          <span className='flex items-center gap-5 text-md text-zinc-500 mt-2'>
            <span className='flex items-center gap-2'>
              <FiCalendar />
              {notebook ? new Date(notebook.createdAt).toLocaleDateString("en-UK", options1) : "-"}
            </span>
            <span className='flex items-center gap-2'>
              <FiClock />
              {notebook ? new Date(notebook.createdAt).toLocaleDateString("en-UK", options2) : "-"}
            </span>
          </span>
        </div>

        {/* Subject List */}
        <div className='mt-5'>
          <span className='text-2xl tracking-wider font-semibold mb-4'>
            Subjects:
          </span>
          <div className='mt-5 flex flex-col gap-15'>
            {notebook?.subjects?.map((subject: subject, idx: number) => {
              const tagKey = subject.tags.find(tag => tag in basic) || "Other";
              return (
                <div
                  key={idx}
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
                      {subject.tags.map((tag: string, i: number) => (
                        <div key={i} className='bg-blue-100 p-2 px-3 rounded-lg text-black'>{tag}</div>
                      ))}
                    </div>
                    <div className='flex items-center justify-between pr-6'>
                      <span className='mt-3'>Created At :&nbsp;
                        <span className='font-semibold text-lg'>
                          {subject.createdAt ? new Date(subject.createdAt).toLocaleDateString("en-UK", options3) : "-"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <motion.div
        className={`w-1/3 relative h-[calc(100%-1rem)] -right-5 p-4 px-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} rounded-lg shadow-md`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Month Row */}
        <div className="flex items-center p-4 px-4 justify-center gap-4 text-gray-400 font-medium w-full relative mt-6">
          <button onClick={handlePrevMonth} disabled={monthWindowStart === 0} className="p-2 rounded-full bg-zinc-400 text-white hover:bg-gray-400 dark:hover:bg-gray-700 disabled:opacity-40 absolute left-0">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <motion.div className="flex flex-nowrap gap-6 overflow-hidden mx-12" key={monthWindowStart}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            {months.slice(monthWindowStart, monthWindowStart + 5).map((month, idx) => {
              const realIndex = monthWindowStart + idx;
              return (
                <button
                  key={realIndex}
                  onClick={() => setSelectedMonth(realIndex)}
                  className={`pb-1 transition ${selectedMonth === realIndex ? "text-orange-500 font-semibold border-b-2 border-orange-500" : "text-gray-400 dark:text-zinc-400"}`}
                >
                  {month}
                </button>
              );
            })}
          </motion.div>
          <button onClick={handleNextMonth} disabled={monthWindowStart >= months.length - 5} className="p-2 rounded-full bg-zinc-400 text-white hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 absolute right-0">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Date Wheel */}
        <div ref={dayContainerRef} className="flex gap-3 mt-6 overflow-x-auto my-scrollbar py-2">
          {daysArray.map((day: number) => {
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
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex flex-col items-center justify-center min-w-[4rem] w-14 h-20 rounded-2xl shadow-sm transition ${isActive ? "bg-orange-500 text-white active-day" : darkMode ? "bg-zinc-700 text-zinc-300" : "bg-white text-gray-600"}`}
              >
                <span className="text-lg font-semibold">{day}</span>
                <span className="text-sm">{weekday}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Carsoul Selection */}
        <div className='flex justify-evenly items-center mb-4'>
          {CarsoulArray.map((item) => (
            <Carsouls
              key={item.number}
              darkMode={darkMode}
              name={item.name}
              number={item.number}
              selected={carsoulSelected}
              setSelected={setCarsoulSelected}
            />
          ))}
        </div>

        {/* Topics Header */}
        <div className='text-left text-lg tracking-wide font-semibold mb-4'>
          Topics for {selectedSubject?.title || "N/A"}:
        </div>

        {/* Topics List */}
        <div className='flex flex-col gap-5'>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic: topic, idx: number) => (
              <div
                key={topic._id ?? idx}
                className={`w-full rounded-2xl ${darkMode ? "bg-zinc-950 hover:bg-zinc-900" : "bg-zinc-50 hover:bg-zinc-100"} group p-3 shadow-md flex items-center gap-4 cursor-pointer transition-all duration-200`}
                onClick={() => navigate(`/subject/${topic._id}`)}
              >
                <span className='text-4xl font-bold px-4 flex items-center gap-5'>
                  {(idx + 1 < 10 ? "0" + (idx + 1) : idx + 1)}
                  <svg width="1" height="50" fill='black' xmlns="http://www.w3.org/2000/svg">
                    <line x1="1" y1="0" x2="1" y2="100" stroke={darkMode ? 'white' : 'black'} strokeWidth="2" />
                  </svg>
                </span>

                <div className='flex flex-col text-left text-sm'>
                  <span className='text-xl tracking-wider flex items-center justify-between pr-3 font-normal'>
                    <span style={{ fontWeight: "2rem" }}>{topic.title}</span>
                    <span className='text-sm mt-3 tracking-wide text-zinc-500 font-semibold relative -top-1'>
                      {topic.dueDate ? new Date(topic.dueDate).toLocaleDateString("en-UK", options4) : "-"}
                    </span>
                  </span>
                  <span className={`text-sm tracking-wide ${darkMode ? "text-zinc-300" : "text-zinc-600"} flex items-center pr-3 group-hover:translate-x-4 transition-all duration-100`}>
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

      </motion.div>
    </motion.div>
  );
};

export default Subject;
