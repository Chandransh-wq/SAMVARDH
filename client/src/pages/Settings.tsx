import React from 'react'

interface SettingProp { 
    darkMode: boolean
}

const Settings: React.FC<SettingProp> = ({ darkMode }) => {
  return (
    <div
    className={`${
        darkMode ? 'primary-dark' : 'primary-light'
      } flex justify-evenly h-[92vh] -z-10 md:w-[calc(100%)] absolute md:top-[4.5rem] pt-5 top-0 left-0 w-screen`}
      >
        Settings
    </div>
  )
}

export default Settings