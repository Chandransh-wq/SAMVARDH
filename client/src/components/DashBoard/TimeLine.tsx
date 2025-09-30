import React from 'react';
import { ActivityData } from '../../assets/demodata';
import { getIcon } from '../../assets/functions';

interface TimeLineProps {
  darkMode?: boolean;
}

const Timeline: React.FC<TimeLineProps> = ({ darkMode }) => {
  return (
    <div className="h-[150vh] overflow-y-scroll my-scrollbar flex flex-col gap-6 relative">
      {ActivityData.map((activity, idx) => {
        // Convert ISO string to Date
        const activityTime = new Date(activity.doneAt);
        // Format to show only hour and minute
        const formattedTime = activityTime.toLocaleTimeString('en-UK', {
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <div key={idx} className="flex items-start gap-4 relative text-left w-full">
            {/* Icon + line container */}
            <div className="relative flex flex-col items-center">
              {/* Icon */}
              <div
                className="h-12 w-12 flex items-center justify-center rounded-full text-white z-10"
                style={{ backgroundColor: activity.color }}
              >
                {getIcon(activity.title)}
              </div>

              {/* Vertical connecting line */}
              {idx !== ActivityData.length - 1 && (
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 w-[2px]"
                  style={{
                    height: '100%',
                    backgroundColor: darkMode ? '#fff' : '#888',
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col w-full">
                <div className="font-semibold flex justify-between items-center">
                    <div>
                        {activity.title}
                    </div>
                    <div className='text-sm text-zinc-400 font-normal'>
                        {formattedTime}
                    </div>
                </div>
              <div className={`text-sm ${darkMode ? 'text-zinc-200' : 'text-zinc-400'}`}>
                {activity.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
