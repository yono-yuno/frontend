import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const SORT_OPTIONS = ["최신순", "오래된순", "가격 높은순", "가격 낮은순"];

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between py-2 text-15 font-PDRegular text-gray-500 bg-transparent rounded-md"
      >
        {selected}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="absolute left-0  flex flex-col justify-center items-start w-24 text-15 font-PDRegular bg-white border-2 rounded-3xl shadow-lg">
          {SORT_OPTIONS.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="px-2 py-3 text-15 font-PDRegular cursor-pointer w-full border-b last:border-b-0"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
