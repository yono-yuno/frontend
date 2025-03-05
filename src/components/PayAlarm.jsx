import React from "react";
import PayIcon from "../assets/PayIcon.png";

const PayAlarm = (props) => {
  return (
    <button onClick={props.onClick} className="mb-[15px]">
      <div className="flex flex-col w-width h-[98px] pt-[12px] pl-[11px] pr-[13px] rounded-15 shadow-md bg-white">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img src={PayIcon} className="w-[22px] h-[22px] pr-[6px]" />
            <p className="font-PDRegular text-12 text-[#999999] ">
              고민 상품 확인하기
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
            [
            {props.title.length > 27
              ? `${props.title.slice(0, 27)}...`
              : props.title}
            ]
          </p>
          <p className="pt-[3px] font-PDRegular text-16 text-black leading-tight">
            고민 중인 제품, 게이지가 채워졌으니 확인해주세요!
          </p>
        </div>
      </div>
    </button>
  );
};

export default PayAlarm;
