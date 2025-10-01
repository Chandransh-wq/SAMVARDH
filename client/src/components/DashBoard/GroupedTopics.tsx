import React, { useEffect, useState } from 'react';
import { getInitials, TopicArray } from '../../assets/functions';
import type { Topic } from '../../assets/types';

interface GroupedTopicsProps {
  darkMode?: boolean;
  date: string; // YYYY-MM-DD
}

const GroupedTopics: React.FC<GroupedTopicsProps> = ({ darkMode, date }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      const data = await TopicArray(date);
      setTopics(data);
      setLoading(false);
    };
    fetchTopics();
  }, [date]);

  if (loading) return <div>Loading topics...</div>;

  return (
    <div className={`${darkMode ? 'bg-[#190019]' : 'bg-zinc-50'} p-4 rounded-lg shadow-md w-full`}>
      {topics.length > 0 ? (
        <div className="flex flex-col gap-6">
          {topics.map((topic, idx) => (
            <div key={topic._id} className="flex gap-4 relative">
              {/* ICON WITH LINE */}
              <div className="relative flex flex-col items-center">
                <div
                  className="h-[3em] w-[3em] flex items-center justify-center text-white rounded-full z-10"
                  style={{ backgroundColor: topic.color || '#854F6C' }}
                >
                  {getInitials(topic.title)}
                </div>
                {idx !== topics.length - 1 && (
                  <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px]"
                    style={{
                      height: 'calc(100% + 1.5em)',
                      backgroundColor: darkMode ? '#fff' : '#888'
                    }}
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="flex flex-col gap-2 text-left">
                <div className="font-semibold">{topic.title}</div>
                <div className={`text-sm ${darkMode ? 'text-zinc-200' : 'text-zinc-400'}`}>
                  {topic.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Topics due</div>
      )}
    </div>
  );
};

export default GroupedTopics;
