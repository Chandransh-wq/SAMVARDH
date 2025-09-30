import { Topic } from "../../assets/functions"

interface TopiclistProps {
    darkMode?: boolean;
}

const Topiclist: React.FC<TopiclistProps> = ({ darkMode }) => {
  return (
    <div className={`my-scrollbar p-5 border ${darkMode ? 'border-zinc-700' : 'border-gray-300'} rounded-lg h-full w-full`}>
        <div className="text-4xl font-semibold">Topic List</div>
        <div className="flex flex-col pb-16 mt-4 h-[calc(100%-5rem)] overflow-y-auto my-scrollbar">
            {Topic.map((topic, index) => (
                <div key={index} className={`border ${darkMode ? 'border-zinc-700 secondary-dark' : 'border-gray-300 primary-light'} p-4 m-2 rounded-lg hover:scale-105 transition-transform cursor-pointer text-left w-[calc(100%-1.5rem)] h-32 `}>
                    <div className="text-xl font-bold">{topic.title}</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{topic.description}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Topiclist