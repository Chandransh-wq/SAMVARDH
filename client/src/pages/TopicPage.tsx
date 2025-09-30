import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { notebookData } from '../assets/demodata';
import { FiCalendar, FiEdit, FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from "react-icons/io";
import Input from '../components/Input';
import { getRandomColor } from '../assets/functions';
import ToolBar from '../components/ToolBar';
import Content from '../components/Content';

interface TopicProps {
  darkMode: boolean;
}

const TopicPage: React.FC<TopicProps> = ({ darkMode }) => {
  const { id } = useParams();

  const [selected, setSelected] = useState(0)

  const topic = notebookData
    .flatMap(nb => nb.subjects)
    .flatMap(sub => sub.topics)
    .find(t => t.id === id);

  const option1: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
  }
  const option2: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric",
  }

  const today = new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${darkMode ? 'primary-dark' : 'primary-light'} flex justify-evenly h-[92vh] md:w-[calc(100%rem)] absolute md:top-[4.5rem] pt-5 top-0 left-0 w-screen pl-[7rem] gap-5 pr-5`}
    >
      {/* Left Side */}
      <div className={`w-1/4 text-lg ${darkMode ? "bg-zinc-950" : "bg-white"} rounded-3xl h-[99%] shadow-md p-6 text-left`}>
        <span className='text-xl tracking-wider' style={{ fontWeight: "500" }}>{topic ? topic.title : "Topic not found"}</span>
        <div className='flex items-center gap-4 border p-2 rounded-full px-4 pr-10 mt-5'>
          <FiSearch />
          <Input type='text' placeholder='Search Your Pages' className='outline-none w-full' />
        </div>
        <div className='my-4'>
          <span className='mb-4 text-lg tracking-wide' style={{ fontWeight: 500 }}>Contents :</span> 
        </div>
        <div className='flex flex-col gap-6'>
          {topic?.content.map((content, idx)=>(
            <div key={idx} className={`p-5 border rounded-3xl ${darkMode ? "border-zinc-800 shadow-md shadow-white/10" : "border-zinc-400 shadow-md"} pt-4 pl-4`}>
              <div className='flex gap-4 items-center'>
                <span className='flex items-center gap-2 py-1'><FiCalendar />&nbsp;
                  {today.toLocaleDateString("eng-UK", option2) != new Date(content.createdAt).toLocaleDateString("eng-UK", option2) ? 
                    new Date(content.createdAt).toLocaleDateString("eng-Uk", option1)
                    : "Today"
                  }
                </span>
                <div className='flex gap-2 ' style={{ fontSize: "16px" }}>
                  <span className={`h-fit w-fit py-1 text-black px-6 rounded-full ${getRandomColor()}`}>
                    {content.tags[0]}
                  </span>
                  <span className={`h-fit w-fit py-1 px-2 border-[0.2px] ${darkMode ? "border-zinc-900" : "border-zinc-400"} rounded-full`}>
                    +{content.tags.length - 1}
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <span className=' text-lg font-bold tracking-wide mt-2'>
                  {content.page}
                </span>
                <span className='w-[calc(100%-1rem)]'>
                  {content.pageContent.length > 100
                    ? (<Content
                        darkMode={darkMode}
                        text={
                          content.pageContent
                            // 1. Remove markdown headings (lines starting with #, ##, ### etc.)
                            .replace(/^#{1,6}\s.*$/gm, "")
                            // 2. Remove all special characters except letters, numbers, spaces
                            .replace(/[^a-zA-Z0-9 ]/g, "")
                            // 3. Collapse multiple spaces
                            .replace(/\s+/g, " ")
                            // 4. Take only preview length
                            .substring(0, 100) + "..."
                        }
                      />
                      )
                    : <Content darkMode={darkMode} text={content.pageContent} />}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right Side */}
      <div className={`w-3/4 h-[99%] ${darkMode ? "bg-zinc-950" : "bg-white"} rounded-3xl shadow-md p-7 text-left pb-12`}>
        <div className='h-1/5'>
        {/* header */}
        <div>
          <div className='flex items-center justify-between'>
            <span className='tracking-wide' style={{ fontWeight: "500", fontSize: "1.9rem" }}>
              {topic?.content[selected].page}
            </span>
            <div className='flex items-center gap-10'>
              <span className='flex items-center gap-2'>
                <FiEdit />Edited : {new Date(topic?.content[selected] ? topic?.content[selected].editedAt : "").toLocaleDateString("eng-UK", option1)}
              </span>
              <div className='flex gap-3'>
                <div className={`w-fit h-fit p-2 ${darkMode ? "bg-zinc-800" : "bg-zinc-100"} rounded-full shadow-md`}>
                  <FiSearch />
                </div>
                <div className={`w-fit h-fit p-2 ${darkMode ? "bg-zinc-800" : "bg-zinc-100"} rounded-full shadow-md`}> 
                  <IoIosArrowDown />
                </div>
              </div>
            </div>
          </div>
          <span className='flex items-center gap-2'>
              <FiCalendar />Created At : {topic?.content[selected] ? new Date(topic?.content[selected].createdAt).toLocaleDateString("eng-UK", option1) : ""}
          </span>
        </div>
        {/* ToolBar */}
        <div>
          <ToolBar darkMode={darkMode} />
        </div>
        </div>
        {/* Body */}
        <div className={`h-5/6 rounded-2xl w-full ${darkMode ? "bg-zinc-900" : "bg-zinc-50"} shadow-md p-7 overflow-scroll my-scrollbar`}>
          {topic?.content[selected] ? 
            <Content darkMode={darkMode} text={topic.content[selected].pageContent} />
          : <div>No Content is present for the page selected</div>
          }
        </div>
      </div>
    </motion.div>
  );
};

export default TopicPage;
