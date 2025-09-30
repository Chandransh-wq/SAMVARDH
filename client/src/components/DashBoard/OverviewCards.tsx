import React from 'react'
import { notebookLength, subjectLength, topicLength } from '../../assets/functions'
import { FaBook, FaBookOpen, FaFileAlt } from 'react-icons/fa'

interface OverviewCardsProps {
    darkMode?: boolean;
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ darkMode }) => {
    const array = [
        {id: 1, title: 'Topics',icons: <FaFileAlt /> , value: topicLength, bgColor: 'bg-red-400'},
        {id: 2, title: 'Subjects',icons: <FaBook /> , value: subjectLength, bgColor: 'bg-blue-400'},
        {id: 3, title: 'Notebooks',icons: <FaBookOpen /> , value: notebookLength, bgColor: 'bg-green-600'},
    ]
  return (
    <div className='flex flex-col gap-4 mt-4 ml-9 text-left'>
        <span className='text-2xl font-bold'>An Overview: </span>
        <div className='flex flex-wrap gap-4'>
            {array.map(item => (
                <span key={item.id} className={`text-2xl text-white ${darkMode ? 'shadow-bottom-dark' : 'shadow-bottom-light'} font-semibold ${item.bgColor} p-5 rounded-xl text-left flex items-center gap-4 w-[16rem]`}>
                    {item.icons}
                    <div className='border-l-1 pl-3'>
                        {item.title}
                        <br />
                        {item.value}
                    </div>
                </span>
            ))}
        </div>
    </div>
  )
}

export default OverviewCards