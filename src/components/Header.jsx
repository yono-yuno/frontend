import React from "react";
import BackButton from "../assets/BackButton.png";

const Header = (props) => {
  return (
    <div className="flex justify-between items-end w-Hwidth h-Hheight">
      <button className="ml-BackButtonMargin">
        <img src={BackButton} className="w-[12.5px] h-[22.5px]" />
      </button>
      {/* leading-tight 필수: 글씨의 위아래 공백을 줄여줌 */}
      <p className="p-0 leading-tight mr-HNameMargin font-PDSemibold text-20 text-black">
        {props.text}
      </p>
    </div>
  );
};

export default Header;
