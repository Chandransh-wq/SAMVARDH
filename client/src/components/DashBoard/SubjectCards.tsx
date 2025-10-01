import { useState, useEffect } from "react";
import { getInitials, getComputedData } from "../../assets/functions";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const SubjectCards = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSubjects = async () => {
      const { subjects } = await getComputedData(); // fetch live subjects
      setSubjects(subjects);
    };
    fetchSubjects();
  }, []);

  if (!subjects.length) return null; // or a loader

  const prevIndex = (currentIndex - 1 + subjects.length) % subjects.length;
  const nextIndex = (currentIndex + 1) % subjects.length;

  const handlePrev = () => setCurrentIndex(prevIndex);
  const handleNext = () => setCurrentIndex(nextIndex);

  const visibleItems = subjects.length == 1 ? [
    currentIndex
  ] : subjects.length == 2 ? [
    prevIndex, 
    currentIndex, 
  ] : [
    prevIndex,
    currentIndex,
    nextIndex
  ];

  return (
    <div className="relative flex items-center justify-center gap-4 w-fit overflow-hidden">
      {/* Left button */}
      <button
        onClick={handlePrev}
        className="absolute left-0 z-10 bg-gray-700 hover:bg-gray-600 mr-5 text-white rounded-full p-3"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <div className="flex">
        {visibleItems.map((idx: number) => {
          const data = subjects[idx];
          return (
            <AnimatePresence key={idx+1}>
              <motion.div
                key={idx}
                style={{ backgroundColor: data.color }}
                className={`p-4 rounded-md text-white w-48 h-[13rem] flex items-center justify-center text-lg font-semibold ${idx === currentIndex ? "scale-100" : "scale-75 opacity-70"} flex flex-col gap-2 text-left`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl font-bold mb-2">{data.title}</span>
                <div className="text-left flex flex-wrap gap-2 text-xl">
                  {data.topics.map((topic: { title: string }, idx: number) => (
                    <div key={idx} className="text-sm h-fit w-fit p-2 px-3 bg-white text-black rounded-full flex items-center justify-center">
                      {getInitials(topic.title)}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>

      {/* Right button */}
      <button
        onClick={handleNext}
        className="absolute right-0 z-10 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-3"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SubjectCards;
