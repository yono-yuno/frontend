import React, { useState } from "react";
import GoodPayYuno from "../assets/GoodPayYuno.png";
import GreenCheck from "../assets/GreenCheck.png";
import { MAIN_PAGE_PATH } from "../constants/Paths";
import { useNavigate } from "react-router-dom";

const PaidPage = () => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const handleFinishButton = () => {
    navigate(MAIN_PAGE_PATH);
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-background">
      <div className="flex flex-col items-center mt-[36px] font-PDMedium text-20 text-black leading-tight">
        <img src={GoodPayYuno} className="w-[372px] h-[273px]" />
        <p>긴 시간 고민하셨으니,</p>
        <p>좋은 소비였을 거예요!</p>
        <p className="mt-[9px] text-24 text-toss">결제가 완료되었어요.</p>
      </div>
      <div
        className={`pl-[16px] pt-[13px] flex flex-col items-start mt-[14px] w-width h-[112px] rounded-15 ${
          isFocused ? "bg-extraButton ring-[2px] ring-toss" : "bg-white"
        }`}
      >
        <p
          className={`leading-tight font-PDSemibold text-15 ${
            isFocused ? "text-toss" : "text-[#7C838D]"
          } `}
        >
          소비 일기
        </p>
        <textarea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="소비에 대한 이유를 간단하게 작성해주세요."
          className="w-[338px] h-[72px] resize-none bg-transparent border-none outline-none font-PDRegular text-15 placeholder:text-[#B2B8C0] text-black focus:text-toss"
        ></textarea>
      </div>
      <button
        onClick={handleFinishButton}
        className="flex justify-center items-center mt-[169px] w-buttonWidth h-buttonHeight gap-[6px] rounded-15 bg-toss "
      >
        <img src={GreenCheck} className="w-[27.23px] h-[27.23px]" />
        <p className="font-PDMedium text-20 text-white">완료</p>
      </button>
    </div>
  );
};

export default PaidPage;
