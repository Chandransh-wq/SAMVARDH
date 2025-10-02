import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { FiCalendar, FiEdit, FiPlus, FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from "react-icons/io";
import Input from '../components/Input';
import { getComputedData, getRandomColor } from '../assets/functions';
import ToolBar from '../components/ToolBar';
import Content from '../components/Content';
import { type Notebook, type Topic } from '../assets/types';
import CreateContentForm from '../components/CreateContentForm';

interface TopicProps {
  darkMode: boolean;
}

interface PageContent {
  page: string;
  pageContent: string;
  tags: string[];
  createdAt: string;
  editedAt: string;
}

const TopicPage: React.FC<TopicProps> = ({ darkMode }) => {
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState(0);
  const [notebookData, setNotebook] = useState<Notebook[]>([]);
  const [topicContent, setTopicContent] = useState<PageContent[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { notebooks: fetchedNotebooks } = await getComputedData();
      setNotebook(fetchedNotebooks);
    };
    fetchData();
  }, []);

  let topic: Topic | undefined;
  let subjectId = "";
  let notebookId = "";

  for (const nb of notebookData) {
    for (const sub of nb.subjects ?? []) {
      for (const t of sub.topics ?? []) {
        if (t._id === id) {
          topic = t;
          subjectId = sub._id ?? "";
          notebookId = nb._id ?? "";
          break;
        }
      }
    }
  }

  // Normalize initial topic content
  useEffect(() => {
    const normalized = (topic?.content ?? []).map(c => ({
      page: typeof c.page === "string" ? c.page : (c.page),
      pageContent: typeof c.pageContent === "string" ? c.pageContent : "",
      tags: Array.isArray(c.tags) ? c.tags : [],
      createdAt: c.createdAt ?? new Date().toISOString(),
      editedAt: c.editedAt ?? new Date().toISOString(),
    }));
    setTopicContent(normalized);
    setSelected(0);
  }, [topic]);

  const option1: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric" };
  const option2: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", year: "numeric", day: "numeric" };
  const today = new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${darkMode ? 'primary-dark' : 'primary-light'} flex justify-evenly h-[92vh] absolute md:top-[4.5rem] pt-5 top-0 left-0 w-screen pl-[7rem] gap-5 pr-5`}
    >
      {showForm && (
        <div className='fixed left-[20.2rem] top-[12rem] z-50'>
          <CreateContentForm
            subjectId={subjectId}
            notebookId={notebookId}
            topicId={topic?._id ?? ""}
            setOpen={setShowForm}
            darkMode={darkMode}
            onContentCreated={(newContent) => {
              const safeContent: PageContent = {
                page: typeof newContent.page === "string" ? newContent.page : (newContent.page?.title ?? "Untitled"),
                pageContent: typeof newContent.pageContent === "string" ? newContent.pageContent : "",
                tags: Array.isArray(newContent.tags) ? newContent.tags : [],
                createdAt: newContent.createdAt ?? new Date().toISOString(),
                editedAt: newContent.editedAt ?? new Date().toISOString(),
              };
              setTopicContent(prev => [safeContent, ...prev]);
              setSelected(0);
            }}
          />
        </div>
      )}

      {/* Left Side */}
      <div className={`w-1/4 text-lg ${darkMode ? "bg-zinc-950" : "bg-white"} rounded-3xl h-[99%] overflow-scroll my-scrollbar shadow-md p-6 text-left`}>
        <span className='text-xl tracking-wider' style={{ fontWeight: 500 }}>
          {topic?.title ?? "Topic not found"}
        </span>
        <div className='flex items-center gap-4 border p-2 rounded-full px-4 pr-10 mt-5'>
          <FiSearch />
          <Input type='text' placeholder='Search Your Pages' className='outline-none w-full' />
        </div>
        <div className='my-4 flex items-center justify-between'>
          <span className='w-fit text-lg tracking-wide' style={{ fontWeight: 500 }}>Contents :</span>
          <button
            className='flex items-center gap-2 h-fit w-fit bg-orange-500 p-1 text-white px-4 rounded-full'
            onClick={() => setShowForm(true)}
          >
            <FiPlus /> <span className='h-fit w-fit'>Create</span>
          </button>
        </div>
        <div className='flex flex-col gap-6'>
          {topicContent.map((content, idx) => (
            <div
              key={idx}
              className={`p-5 border rounded-3xl ${darkMode ? "border-zinc-800 shadow-md shadow-white/10" : "border-zinc-400 shadow-md"} pt-4 pl-4 ${idx === selected ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => setSelected(idx)}
            >
              <div className='flex gap-4 items-center'>
                <span className='flex items-center gap-2 py-1'>
                  <FiCalendar />&nbsp;
                  {today.toLocaleDateString("en-UK", option2) !== new Date(content.createdAt).toLocaleDateString("en-UK", option2)
                    ? new Date(content.createdAt).toLocaleDateString("en-UK", option1)
                    : "Today"}
                </span>
                <div className='flex gap-2' style={{ fontSize: "16px" }}>
                  {content.tags?.[0] && (
                    <span className={`h-fit w-fit py-1 text-black px-6 rounded-full ${getRandomColor()}`}>
                      {content.tags[0]}
                    </span>
                  )}
                  {content.tags && content.tags.length > 1 && (
                    <span className={`h-fit w-fit py-1 px-2 border-[0.2px] ${darkMode ? "border-zinc-900" : "border-zinc-400"} rounded-full`}>
                      +{content.tags.length - 1}
                    </span>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-lg font-bold tracking-wide mt-2'>{content.page}</span>
                {content.pageContent && (
                  <span className='w-[calc(100%-1rem)]'>
                    <Content
                      darkMode={darkMode}
                      text={content.pageContent.length > 100
                        ? content.pageContent.replace(/^#{1,6}\s.*$/gm, "")
                          .replace(/[^a-zA-Z0-9 ]/g, "")
                          .replace(/\s+/g, " ")
                          .substring(0, 100) + "..."
                        : content.pageContent
                      }
                    />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className={`w-3/4 h-[99%] ${darkMode ? "bg-zinc-950" : "bg-white"} rounded-3xl shadow-md p-7 text-left pb-12`}>
        <div className='h-1/5'>
          <div className='flex items-center justify-between'>
            <span className='tracking-wide' style={{ fontWeight: 500, fontSize: "1.9rem" }}>
              {topicContent[selected]?.page ?? ""}
            </span>
            <div className='flex items-center gap-10'>
              <span className='flex items-center gap-2'>
                <FiEdit /> Edited: {topicContent[selected]?.editedAt ? new Date(topicContent[selected].editedAt).toLocaleDateString("en-UK", option1) : "N/A"}
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
            <FiCalendar /> Created At: {topicContent[selected]?.createdAt ? new Date(topicContent[selected].createdAt).toLocaleDateString("en-UK", option1) : ""}
          </span>
          <ToolBar darkMode={darkMode} />
        </div>

        <div className={`h-5/6 rounded-2xl w-full ${darkMode ? "bg-zinc-900" : "bg-zinc-50"} shadow-md p-7 overflow-scroll my-scrollbar`}>
          {topicContent[selected]?.pageContent
            ? <Content darkMode={darkMode} text={topicContent[selected].pageContent} />
            : <div>No Content is present for the page selected</div>}
        </div>
      </div>
    </motion.div>
  );
};

export default TopicPage;
