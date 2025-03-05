import React from "react";

const Category = (props) => {
  return (
    <div className="flex flex-col items-center mr-2">
      <button
        onClick={props.onClick}
        className={`flex justify-center items-center border-[1px] w-[50px] h-[50px] px-2 rounded-lg ${
          props.isSelected
            ? "border-toss bg-blue-100"
            : "border-gray-200 bg-gray-200"
        }`}
      >
        <img
          src={props.img}
          alt={props.text}
          className={`${
            props.text === "전체" ? "w-[25px] h-[25px]" : "w-[30px] h-[30px]"
          }`}
        />
      </button>
      <p
        className={`pt-1 text-xs font-PDRegular ${
          props.isSelected ? "text-toss" : "text-gray-800"
        }`}
      >
        {props.text}
      </p>
    </div>
  );
};

export default Category;
