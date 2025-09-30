import React from 'react'
import SubjectCards from '../components/DashBoard/SubjectCards';
import Topiclist from '../components/DashBoard/Topiclist';
import NotebookList from '../components/DashBoard/NotebookList';
import OverviewCards from '../components/DashBoard/OverviewCards';
import RightSideProps from '../components/DashBoard/RightSide';
import Table from '../components/DashBoard/Table';

interface DashboardProps {
    darkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ darkMode }) => {



  return (
    <div className={`${darkMode ? 'primary-dark' : 'primary-light'} flex justify-evenly h-fit -z-10 absolute  pl-10 md:top-[4.5rem] top-0 left-0 md:w-[calc(100%-0.01rem)] w-screen`}>
      <div className='h-fit float-left flex items-left flex-col w-3/4'>
          {/* Main Body */}
          <div className=' overflow-hidden float-start h-full'>
          {/* Top */}
            <div className='flex h-64'>
              <div className='bg-teal-700 text-white w-3/4 flex-wrap text-lg font-semibold text-left gap-16 p-5 rounded-lg m-5 flex  justify-start items-start'>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Fast and Convenient</h2>
                  <p className="text-sm text-gray-200">
                  Discover a streamlined way to manage your subjects, topics, and notebooks. 
                  Stay organized and enhance your learning experience with our intuitive dashboard.
                  </p>
                </div>
                <button className="h-auto relative bottom-5 w-auto p-3 bg-white text-black rounded-md">Learn more</button>
              </div>

              <div className='flex'>
                <SubjectCards />
              </div>
            </div>
            {/* Middle */}
            <div className='m-5 text-left w-full flex mb-16 justify-between'>
              {/* Topics */ }
              <div className='w-1/2 h-[47rem]'>
                  <Topiclist darkMode={darkMode} />
              </div>
              {/* Overview */}
              <div className={`m-5 w-1/2 flex flex-col gap-6 border p-4 rounded-xl ${darkMode ? "border-zinc-700" : "border-zinc-300"} items-center`}>
                <div>
                  <OverviewCards darkMode={darkMode} />
                </div>
                <div className='w-[calc(100%-5rem)] flex flex-col gap-3 text-left'>
                  <div className='text-3xl font-bold w-[calc(100%-5rem)] overflow-hidden  translate-x-2'>Your Top Notebooks : </div>
                  <div className='w-full'>
                    <NotebookList darkMode={darkMode} />
                  </div>
                </div>
            </div>
            </div>
            {/* Bottom */}
            
          </div> 
          {/* Table */}
          <div className='h-1/4 float-end'>
            <Table /> {/* improve this */}
          </div>
      </div>
          {/* TimeLine */}
      
      <div className='w-1/5 float-right md:block pl-2 hidden border-l-2 border-blue-100 h-[170vh] mt-5 '>
        <RightSideProps darkMode={darkMode} />
      </div>
    </div>
  )
}

export default Dashboard;
