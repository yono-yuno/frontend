import React from "react";
import ReviewIcon from "../assets/ReviewIcon.png";

const ReviewAlarm = (props) => {
  return (
    <button onClick={props.onClick} className="mb-[15px]">
      <div className="flex flex-col w-width h-[98px] pt-[12px] pl-[11px] pr-[13px] rounded-15 shadow-md bg-white">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img src={ReviewIcon} className="w-[22px] h-[22px] pr-[6px]" />
            <p className="font-PDRegular text-12 text-[#999999] ">
              리뷰 작성하기
            </p>
          </div>
          <div className="flex items-center">
            <p className="font-PDRegular text-12 text-[#999999]">
              {props.time}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start pl-[22px] pt-[6px]">
          <p className="font-PDMedium text-16 text-black leading-tight">
            [{props.title}]
          </p>
          <p className="pt-[3px] font-PDRegular text-16 text-black leading-tight">
            구매하신 이 제품, 어떠셨나요? 후기를 남겨주세요!
          </p>
        </div>
      </div>
    </button>
  );
};

export default ReviewAlarm;
