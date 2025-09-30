import React, { useState, useEffect } from 'react';
import Carsouls from './Carsouls';
import Calendar from './Calendar';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import GroupedTopics from './GroupedTopics';
import { ActivityData } from '../../assets/demodata';
import Timeline from './TimeLine';

interface RightSideProps {
  darkMode: boolean;
}

const CarsoulArray = [
  { name: "Timeline", number: 1 },
  { name: "Calendar", number: 2 },
];

const RightSideProps: React.FC<RightSideProps> = ({ darkMode }) => {
  const [selected, setSelected] = useState<number>(1); // carousel selection
  const [year, setYear] = useState<number>(2025);
  const [month, setMonth] = useState<number>(8); // September (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Keep time updated every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const headerDate = new Date(year, month);
  const formattedDate = headerDate.toLocaleDateString("en-UK", {
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString("en-UK", {
    hour: "numeric",
    minute: "numeric",
  });

  // Construct ISO string for GroupedTopics
const fullDate = new Date(year, month, selectedDay); // time will default to 00:00:00
const isoDateString = `${fullDate.getFullYear()}-${String(fullDate.getMonth() + 1).padStart(2, '0')}-${String(fullDate.getDate()).padStart(2, '0')}T12:00:00`;


  return (
    <div className={`p-4 ${darkMode ? "bg-zinc-900" : "bg-white"} w-[24rem] h-full`}>
      {/* Carousel */}
      <div className='flex justify-evenly items-center mb-4'>
        {CarsoulArray.map((item) => (
          <Carsouls
            key={item.number}
            darkMode={darkMode}
            name={item.name}
            number={item.number}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>

      {/* Timeline / Calendar Views */}
      {selected === 1 ? (
        <div className={`p-4 rounded-lg w-[21.7rem] shadow-md ${darkMode ? "bg-[#050005] text-white" : "bg-white text-black"}`}>
          <h2 className="text-xl font-bold mb-4">Timeline View</h2>

          {ActivityData.length ? 
            <div className={` bg-transparent ${darkMode ? "shadow-zinc-900/20" : "shadow-[secondary-light]"}`}>
              <Timeline darkMode={darkMode} />
            </div> 
            : 
            <div>No activities have been done yet</div>
          }
        </div>
      ) : (
        <div className={`p-4 rounded-lg shadow-md flex flex-col items-center justify-evenly ${darkMode ? "bg-[#050005] text-white" : "bg-white text-black"} w-[22rem]`}>
          {/* Month / Year Navigation */}
          <div className='flex items-center justify-between gap-4 border-b-2 border-zinc-300/80 w-full mb-2 pb-1'>
            <button
              className={`p-2 rounded-lg ${darkMode ? "bg-[#2B124C] text-white hover:bg-[#3e1a6c]" : "bg-[#F0E7D5]/70 text-black hover:bg-[#854F65]"} transition-colors`}
              onClick={() => {
                if (month === 0) { setMonth(11); setYear(year - 1); }
                else setMonth(month - 1);
              }}
            >
              <FiArrowLeft />
            </button>

            <div className='flex flex-col items-center'>
              <div className="font-bold">{formattedDate}</div>
              <div className="text-gray-400 font-semibold tracking-widest">{formattedTime}</div>
            </div>

            <button
              className={`p-2 rounded-lg ${darkMode ? "bg-[#2B124C] text-white hover:bg-[#3e1a6c]" : "bg-[#F0E7D5]/70 text-black hover:bg-[#854F65]"} transition-colors`}
              onClick={() => {
                if (month === 11) { setMonth(0); setYear(year + 1); }
                else setMonth(month + 1);
              }}
            >
              <FiArrowRight />
            </button>
          </div>

          {/* Calendar + GroupedTopics */}
          <div className='w-full mt-4 flex flex-col gap-3'>
            <Calendar month={month} year={year} darkMode={darkMode} setSelectedDay={setSelectedDay} />
            <GroupedTopics darkMode={darkMode} date={isoDateString} />
          </div>
        <div className='relative top-64'>ADD SOMETHING HERE</div>

        </div>
      )}

    </div>
  );
};

export default RightSideProps;
