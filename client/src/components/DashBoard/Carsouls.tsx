import React from 'react'

interface CarsoulProps {
    darkMode: boolean;
    name: string;
    number: number;
    selected: number;
    setSelected: (number: number) => void;
}

const Carsouls: React.FC<CarsoulProps> = ({ darkMode, name, number, selected, setSelected }) => {
  return (
    <div className='flex flex-row m-2 cursor-pointer' onClick={() => setSelected(number)}>
      <div 
        className={`flex flex-row gap-3 items-center p-2 text-md font-semibold shadow-md transition-all duration-200 rounded-lg px-6
            ${darkMode ? "text-white" : "text-black"} 
            ${selected == number ? 
            (darkMode ? "bg-[#2B124C]" : "bg-[#854F65]") : 
            (darkMode ? "bg-[#050005]" : "bg-[#F0E7D5]/70")}`}
        >
        {(selected == number) ? <span className="text-zinc-50">{name}</span> : <span className={`${darkMode ? "text-zinc-300" : "text-zinc-500"}`}>{name}</span>}
      </div>
    </div>
  )
}

export default Carsouls