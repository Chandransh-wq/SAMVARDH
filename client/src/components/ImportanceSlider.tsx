import * as React from "react";
import * as Slider from "@radix-ui/react-slider";

interface ImportanceSliderProps {
  value: number;
  setValue: (value: number) => void;
  darkMode: boolean
}

const ImportanceSlider: React.FC<ImportanceSliderProps> = ({ value, setValue, darkMode }) => {
  const marks = [1, 2, 3, 4, 5];

  return (
    <div className="w-full px-2 flex flex-col gap-2 text-left items-left">
      <span className="text-black font-semibold mb-2 text-left">Assign an importance level :</span>

      <Slider.Root
        className="relative flex h-5 w-full touch-none select-none items-center"
        value={[value]}
        max={5}
        min={1}
        step={1}
        onValueChange={(v) => setValue(v[0])}
      >
        <Slider.Track className="relative h-2 grow rounded-full bg-gray-300">
          <Slider.Range className="absolute h-full rounded-full bg-orange-500" />
        </Slider.Track>
<Slider.Thumb
  className={`w-5 h-5 rounded-full shadow-md z-10 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
    darkMode ? "bg-orange-500" : "bg-white"
  }`}
  aria-label="Importance"
/>

      </Slider.Root>

      {/* Marks */}
      <div className="relative w-full h-4 mt-2">
        {marks.map((mark) => (
          <span
            key={mark}
            style={{ left: `${((mark - 1) / (marks.length - 1)) * 100}%` }}
            className={`absolute -translate-x-1/2 text-sm font-bold ${
              value >= mark ? "text-orange-500" : "text-gray-400"
            }`}
          >
            {mark}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImportanceSlider;
