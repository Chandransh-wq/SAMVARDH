import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  FiCalendar, FiEdit, FiPlus, FiSearch, FiTrash 
} from 'react-icons/fi';
import { IoIosArrowDown } from "react-icons/io";
import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough, 
  FaListUl, FaListOl, FaLink, FaUndo, FaRedo, FaSave 
} from 'react-icons/fa';
import { BsGlobe2 } from 'react-icons/bs'
import Input from '../components/Input';
import Content from '../components/Content';
import CreateContentForm from '../components/CreateContentForm';
import { getComputedData, getRandomColor } from '../assets/functions';
import { deleteResource, updateContent } from '../sources/notebookServices';
import { toast } from 'sonner';
import { type Notebook, type Topic } from '../assets/types';

interface TopicProps {
  darkMode: boolean;
}

interface PageContent {
  _id: string;
  page: string;
  pageContent: string;
  tags: string[];
  createdAt: string;
  editedAt: string;
}

const TopicPage: React.FC<TopicProps> = ({ darkMode }) => {
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState<number>(-1);
  const [notebookData, setNotebook] = useState<Notebook[]>([]);
  const [topicContent, setTopicContent] = useState<PageContent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { notebooks: fetchedNotebooks } = await getComputedData();
      setNotebook(fetchedNotebooks);
    };
    fetchData();
  }, []);

  const { topic, subjectId, notebookId } = useMemo(() => {
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
        if (topic) break;
      }
      if (topic) break;
    }
    return { topic, subjectId, notebookId };
  }, [notebookData, id]);

  const extractCreatedContent = (payload: any): PageContent | null => {
    if (!payload) return null;
    return {
      _id: payload._id ?? payload.id ?? Math.random().toString(36).slice(2),
      page: payload.page ?? "Untitled",
      pageContent: payload.pageContent ?? "",
      tags: Array.isArray(payload.tags) ? payload.tags : [],
      createdAt: payload.createdAt ?? new Date().toISOString(),
      editedAt: payload.editedAt ?? new Date().toISOString(),
    };
  };

  useEffect(() => {
    const normalized = (topic?.content ?? []).map((c: any) => ({
      _id: c._id ?? c.id ?? Math.random().toString(36).slice(2),
      page: typeof c.page === "string" ? c.page : (c.page?.title ?? "Untitled"),
      pageContent: typeof c.pageContent === "string" ? c.pageContent : (c.content ?? ""),
      tags: Array.isArray(c.tags) ? c.tags : [],
      createdAt: c.createdAt ?? new Date().toISOString(),
      editedAt: c.editedAt ?? c.updatedAt ?? new Date().toISOString(),
    }));
    setTopicContent(normalized);
    setSelected(normalized.length > 0 ? 0 : -1);
  }, [topic]);

  useEffect(() => {
    if (selected >= 0 && selected < topicContent.length) {
      setContent(topicContent[selected].pageContent ?? "");
    } else {
      setContent("");
    }
  }, [selected, topicContent]);

  const option1: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric" };
  const option2: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", year: "numeric", day: "numeric" };
  const today = new Date();

  useEffect(() => {
    if (!isSaved) return;
    if (!topic) return;

    const notebookIds = notebookId;
    const subjectIds = subjectId;
    const topicId = topic._id ?? "";
    const contentId = topic?.content?.[selected]?._id;

    const newData = { 
      pageTitle: topicContent[selected]?.page ?? "Untitled",
      pageContent: content
    };
    updateContent(newData, notebookIds, subjectIds, topicId, contentId ?? "")
      .then(() => toast.success("Content updated successfully"))
      .catch(() => toast.error("Failed to update content"))
      .finally(() => setIsSaved(false));
  }, [isSaved]);

  const deletePage = async () => {
    try {
      const contentId = topic?.content?.[selected]?._id;
      if (!contentId) return;
      await deleteResource(notebookId, subjectId, topic?._id, contentId);
      setTopicContent(prev => prev.filter(c => c._id !== contentId));
      setSelected(prev => (prev > 0 ? prev - 1 : 0));
      toast.success("Page deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete page");
    }
  };

  // --------------------------
  // INLINE TOOLBAR
  // --------------------------
  const toolbarButtons = [
    { icon: <FaBold />, action: 'bold', label: 'Bold' },
    { icon: <FaItalic />, action: 'italic', label: 'Italic' },
    { icon: <FaUnderline />, action: 'underline', label: 'Underline' },
    { icon: <FaStrikethrough />, action: 'strikethrough', label: 'Strikethrough' },
    { icon: <FaListUl />, action: 'unordered-list', label: 'Unordered List' },
    { icon: <FaListOl />, action: 'ordered-list', label: 'Ordered List' },
    { icon: <FaLink />, action: 'link', label: 'Insert Link' },
    { icon: <FaUndo />, action: 'undo', label: 'Undo' },
    { icon: <FaRedo />, action: 'redo', label: 'Redo' },
    { icon: <BsGlobe2 />, action: 'get', label: 'Get' },
    { icon: <FaSave />, action: 'save', label: isSaved ? 'Saved' : 'Save' },
  ];

  const handleToolbarClick = (action: string) => {
    if (action === 'save') setIsSaved(true);
    // Here you can add bold/italic/etc logic if using a rich text editor
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${darkMode ? 'primary-dark' : 'primary-light'} flex justify-evenly h-[92vh] absolute md:top-[4.5rem] pt-5 top-0 left-0 w-screen pl-[7rem] gap-5 pr-5`}
    >
      {/* Create Form */}
      {showForm && (
        <div className='fixed left-[20.2rem] top-[12rem] z-50'>
          <CreateContentForm
            subjectId={subjectId}
            notebookId={notebookId}
            topicId={topic?._id ?? ""}
            setOpen={setShowForm}
            darkMode={darkMode}
            onContentCreated={(serverPayload) => {
              const created = extractCreatedContent(serverPayload);
              if (!created) return;
              setTopicContent(prev => [created, ...prev]);
              setSelected(0);
              setContent(created.pageContent ?? "");
              setShowForm(false);
            }}
          />
        </div>
      )}

      {/* Left Sidebar */}
      <div className={`w-1/4 text-lg ${darkMode ? "bg-zinc-950" : "bg-white"} rounded-3xl h-[99%] overflow-scroll my-scrollbar shadow-md p-6 text-left`}>
        <span className='text-xl tracking-wider' style={{ fontWeight: 500 }}>
          Topic: {topic?.title ?? "Topic not found"}
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
          {topicContent.map((page, idx) => (
            <div
              key={page._id}
              className={`p-5 border rounded-3xl ${darkMode ? "border-zinc-800 shadow-md shadow-white/10" : "border-zinc-400 shadow-md"} pt-4 pl-4 ${idx === selected ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => setSelected(idx)}
            >
              <div className='flex gap-4 items-center'>
                <span className='flex items-center gap-2 py-1'>
                  <FiCalendar />&nbsp;
                  {today.toLocaleDateString("en-UK", option2) !== new Date(page.createdAt).toLocaleDateString("en-UK", option2)
                    ? new Date(page.createdAt).toLocaleDateString("en-UK", option1)
                    : "Today"}
                </span>
                <div className='flex gap-2' style={{ fontSize: "16px" }}>
                  {page.tags?.[0] && (
                    <span className={`h-fit w-fit py-1 text-black px-6 rounded-full ${getRandomColor()}`}>
                      {page.tags[0]}
                    </span>
                  )}
                  {page.tags && page.tags.length > 1 && (
                    <span className={`h-fit w-fit py-1 px-2 border-[0.2px] ${darkMode ? "border-zinc-900" : "border-zinc-400"} rounded-full`}>
                      +{page.tags.length - 1}
                    </span>
                  )}
                </div>
                <div 
                  className='h-fit w-fit p-2 rounded-xl bg-red-100 ml-auto' 
                  onClick={deletePage}
                >
                  <FiTrash stroke='red' />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-lg font-bold tracking-wide mt-2'>{page.page}</span>
                {page.pageContent && (
                  <span className='w-[calc(100%-1rem)]'>
                    {page.pageContent.length > 100 
                      ? page.pageContent.slice(0, 100)+"........" 
                      : page.pageContent}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content Area */}
      <div className={`w-3/4 h-[99%] ${darkMode ? "bg-zinc-950" : "bg-white"} rounded-3xl shadow-md p-7 text-left pb-12`}>
        {selected >= 0 && selected < topicContent.length ? (
          <>
            <div className='h-1/5'>
              <div className='flex items-center justify-between'>
                <span className='tracking-wide' style={{ fontWeight: 500, fontSize: "1.9rem" }}>
                  {topicContent[selected].page}
                </span>
                <div className='flex items-center gap-10'>
                  <span className='flex items-center gap-2'>
                    <FiEdit /> Edited: {topicContent[selected].editedAt ? new Date(topicContent[selected].editedAt).toLocaleDateString("en-UK", option1) : "N/A"}
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
              {/* INLINE TOOLBAR */}
              <div
                className={`h-[4rem] px-3 flex items-center gap-2 shadow-md w-full rounded-3xl ${darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}
              >
                {toolbarButtons.map((btn) => (
                  <button
                    key={btn.action}
                    title={btn.label}
                    className={`p-2 rounded transition-colors ${darkMode ? 'hover:bg-zinc-700/50' : 'hover:bg-zinc-300/30'}`}
                    onClick={() => handleToolbarClick(btn.action)}
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>


            <div className={`h-5/6 rounded-2xl w-full ${darkMode ? "bg-zinc-900" : "bg-white"} shadow-md p-4 overflow-scroll my-scrollbar pb-0`}>
              <Content
                darkMode={darkMode}
                text={content}
                setContent={setContent}
                isSaved={isSaved}
              />
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center h-full text-xl'>
            No pages available. Create one to get started.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TopicPage;
