import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiCalendar, FiClock, FiDownload, FiPlus, FiTrash } from 'react-icons/fi';
import { MdInfo } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getComputedData, hexToRgba } from '../assets/functions';
import { basic } from '../assets/Illustraitions/basics';
import type { Notebook } from '../assets/types';
import CreateNotebookForm from '../components/CreateNotebookForm';
import { toast } from 'sonner';
import { deleteResource } from '../sources/notebookServices';

interface NotebookProps {
  darkMode: boolean;
}

const Notebook: React.FC<NotebookProps> = ({ darkMode }) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [notebookData, setNotebook] = useState<Notebook[]>([]);
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { notebooks: fetchedNotebooks } = await getComputedData();
      setNotebook(fetchedNotebooks);
    };
    fetchData();
  }, []);

  if (!notebookData.length) return <div>Loading notebooks...</div>;

  const selectedNotebook = notebookData[selected];

const deleteNotebook = async (notebookId?: string) => {
  if (!notebookId) return;

  try {
    // TODO: call backend API if needed
    await deleteResource(notebookId);

    setNotebook(prev => prev.filter(nb => nb._id !== notebookId));

    // Adjust selected index if needed
    setSelected(prev => Math.max(prev - 1, 0));

    toast.success("Notebook deleted successfully");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete notebook");
  }
};


  return (
    <div
      className={`${
        darkMode ? 'primary-dark' : 'primary-light'
      } flex justify-evenly h-[92vh] -z-10 md:w-[calc(100%)] absolute md:top-[4.5rem] pt-5 top-0 left-0 w-screen`}
    >
      {showForm &&
        <div className='fixed left-[20.2rem] top-[12rem] z-50'>
          <CreateNotebookForm 
            setOpen={setShowForm}
            darkMode={darkMode} 
          />
        </div>
      }
      {/* MAIN WRAPPER */}
      <div className="w-[calc(100%-7rem)] relative left-9 flex gap-5">
        {/* LEFT SIDE — Notebook Cards */}
        <div
          className={`w-1/2 h-[calc(100%-0.5rem)] overflow-auto my-scrollbar ${
            darkMode ? 'bg-zinc-800' : 'primary-light'
          }`}
        >
          <div className='text-left pl-5 my-4 flex justify-between pr-5 items-center'>
            <span className='text-4xl font-bold'>Your Notebooks</span>
            <div className='bg-orange-600 text-white p-3 rounded-full shadow-md px-6'>
              <button className='flex gap-4 items-center' onClick={()=>setShowForm(true)}>
                <FiPlus />Create
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {notebookData.map((notebook, idx) => {
              const titleKey = Object.keys(basic).find(key => notebook.title.includes(key)) || "Other";
            
              return (
                <div key={notebook._id} className="w-full h-[14rem] rounded-[3.5rem] p-6 flex text-left" 
                     style={{ backgroundColor: darkMode ? notebook.color : hexToRgba(notebook.color ?? '', 0.3) }}
                     onClick={() => setSelected(idx)}>
                    
                  <div className="w-1/4 text-[10rem] font-thin">
                    <div dangerouslySetInnerHTML={{ __html: basic[titleKey as keyof typeof basic] }} />
                  </div>
              
                  <div className="w-1/2 flex flex-col">
                    <span className="text-[1.7rem] font-semibold">{notebook.title}</span>
                    <span>{notebook.description}</span>
                  </div>
              
                  <div className="flex flex-col items-center text-black">
                    <svg width="1" className="relative left-15" height="120%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="1" y1="0" x2="1" y2="100" stroke="black" strokeWidth="2" />
                    </svg>
                    <svg width="1" className="relative left-15" height="120%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="1" y1="0" x2="1" y2="100" stroke="black" strokeWidth="2" />
                    </svg>
                    <button
                      className="h-fit w-fit p-3 bg-white rounded-full relative left-15 -top-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(idx);
                        navigate(`/notebook/${notebook._id}`);
                      }}
                    >
                      <FiArrowRight size={20} />
                    </button>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* RIGHT SIDE — Notebook Details */}
        <div
          className={`w-1/2 h-[calc(100%-0.5rem)] shadow rounded-[3rem] ${
            darkMode ? 'bg-zinc-900' : 'bg-white'
          } text-left p-6`}
        >
          {/* Notebook Preview Image */}
          <div
            dangerouslySetInnerHTML={{ __html: basic.banner }}
            className="h-[10rem] w-[15rem] relative left-[30rem]"
          />

          {/* Notebook Header (Title + Date + Arrow) */}
          <div className="flex items-center justify-between">
            <div>
              {/* Title */}
              <span className="text-3xl font-normal tracking-wide mb-5">
                {selectedNotebook.title}
              </span>

              {/* Date & Weekday */}
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-md mr-5">
                  <FiCalendar color="#3f3f46" size={20} />
                  &nbsp;&nbsp;
                  <div className="text-md font-normal text-zinc-400">
                    {selectedNotebook.createdAt
                      ? new Date(selectedNotebook.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <FiClock color="#3f3f46" size={20} />
                    <span className="text-md font-normal text-zinc-400">
                      {selectedNotebook.createdAt
                        ? new Date(selectedNotebook.createdAt).toLocaleDateString('en-GB', {
                            weekday: 'short',
                          })
                        : 'N/A'}
                    </span>
                  </div>
                </span>
              </div>
            </div>

            {/* Arrow Button (Top Right) */}
            <div className="relative -left-4">
              <button className="h-fit w-fit p-3 bg-zinc-100 rounded-full border-lg border-zinc-900" onClick={() => navigate(`/notebook/${selectedNotebook._id}`)}>
                <FiArrowRight />
              </button>
            </div>
          </div>

          {/* Favourite Info Banner */}
          <div
            className={`flex gap-4 w-full rounded-md p-3 ${
              selectedNotebook.favorite ? 'text-green-700 bg-green-100' : 'text-orange-700 bg-red-100'
            } items-center justify-center text-md mt-4 mb-4`}
          >
            <MdInfo size={29} />
            <span
              className={`${
                selectedNotebook.favorite ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {selectedNotebook.favorite
                ? 'This notebook is marked favourite'
                : 'This notebook is not marked favourite'}
            </span>
          </div>

          {/* Description + Subjects Section */}
          <div className="max-h-[20rem] overflow-scroll my-scrollbar border p-5 rounded-xl border-zinc-300 text-md tracking-wider flex flex-col gap-2">
            {(selectedNotebook.subjects?.length ?? 0) > 2 ? (
              <>
                <span>Description</span>
                <span>Subjects</span>
              </>
            ) : (
              <span className="text-lg font-semibold text-orange-400">Description</span>
            )}

            {/* Description Text */}
            <span>
              {selectedNotebook.description}
              <span
                className="text-orange-400 font-semibold tracking-normal cursor-pointer w-fit"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </span>
            </span>

            {/* Subjects Table (Visible when expanded) */}
            {expanded && selectedNotebook.subjects?.length ? (
              <table className="mt-5 bg-zinc-100 p-4 rounded-xl ">
                <thead>
                  <tr>
                    <td className="p-2">Subject</td>
                    <td className="p-2">Importance</td>
                    <td className="p-2">Topics</td>
                    <td className="p-2">Tags</td>
                  </tr>
                </thead>
                <tbody className="rounded-lg">
                  {selectedNotebook.subjects.map((subject, idx) => (
                    <tr key={subject.color ?? idx} className="p-4 h-fit bg-zinc-50 mb-2">
                      <td className="p-4 flex gap-4">
                        <div
                          className="h-5 w-5 rounded-full"
                          style={{ backgroundColor: hexToRgba(subject.color, 0.7) }}
                        ></div>
                        {subject.title}
                      </td>
                      <td className="p-4">{subject.importance}</td>
                      <td className="p-2">
                        {subject.topics?.map((topic, i) => (
                          <div key={topic._id ?? i}>{topic.title}</div>
                        ))}
                      </td>
                      <td className="p-2">
                        {subject.tags?.map((tag, i) => (
                          <div key={i}>{tag}</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>

          {/* Download Section */}
          <div className="mt-5">
            <div className="border border-zinc-200 p-4 rounded-lg flex items-center justify-between">
              <span>Download all Resources as PDF</span>
              <span className="flex items-center gap-4 text-orange-400 font-semibold">
                {'235MB'}
                <FiDownload size={24} />
              </span>
            </div>
            
            {/* DELETE PART */}
            <div 
              className='h-fit w-full p-3 rouned-xl bg-red-100 mt-3 flex items-center rounded-xl justify-between px-8 text-red-900'
              onClick={() => deleteNotebook(selectedNotebook._id)}
            >
              Delete this notebook&nbsp;&nbsp;&nbsp;<FiTrash stroke='red' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notebook;
