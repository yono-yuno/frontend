import React from "react";
import BackButton from "../assets/BackButton.png";

const Header = (props) => {
  return (
    <div className="relative flex justify-center items-end w-Hwidth h-Hheight">
      <button onClick={props.onClick} className="absolute left-[15px]">
        <img src={BackButton} className="w-[12.5px] h-[22.5px]" />
      </button>
      {/* leading-tight 필수: 글씨의 위아래 공백을 줄여줌 */}
      <p className="p-0 leading-tight font-PDSemibold text-20 text-black">
        {props.text}
      </p>
    </div>
  );
};

export default Header;
