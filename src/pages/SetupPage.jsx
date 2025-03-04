import React, { useState } from "react";
import "../styles/style.css";
import "../styles/index.css";
import YunoWarning from "../assets/YunoWarning.png";
import GuideBook from "../assets/GuideBook.png";
import { useNavigate } from "react-router-dom";
import { SETUPCOMPLETE_PAGE_PATH } from "../constants/Paths";

const SetupPage = () => {
  const navigate = useNavigate();
  const handleMoveToSetupCompletePage = () => {
    navigate(SETUPCOMPLETE_PAGE_PATH);
  };
  const [amount, setAmount] = useState(" ");
  // const [days, setDays] = useState("01");
  // const [hours, setHours] = useState("01");
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      {/* 유노 캐릭터 이미지 */}
      <div className="flex mt-[133px]">
        <img src={YunoWarning} className=" w-[229px] h-[143px]" />
      </div>
      {/* 안내 문구 */}
      <div className="flex mt-[18px] font-PDMedium leading-tight text-center text-20">
        <img src={GuideBook} className="w-[18px] h-[18px]" />
        <p className="text-toss pl-[4px]">
          결제할 때 적용될 옵션
          <span className="text-black">이니,</span>
        </p>
      </div>
      <div className="flex font-PDMedium leading-tight text-center text-20">
        <p className=" text-black">신중하게 선택해주세요!</p>
      </div>
      {/* 상한액 설정 */}
      <div className="mt-[34px] mr-[17px] w-[311px] h-[66px]">
        <label className=" font-PDMedium leading-tight text-16 text-toss">
          상한액
        </label>
        <div className="flex items-center mt-[1px]">
          <div className="flex items-center w-[288px] h-[46px] rounded-15 border-2 border-[#ECEEEF] bg-background">
            <input
              className="pl-[13px] leading-tight font-PDRegular text-placeholder text-20 bg-background"
              type="number"
              placeholder="금액을 입력해주세요"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <span className="text-black pl-[5px] font-PDMedium text-20">원</span>
        </div>
      </div>
      {/* 고민 시간 설정 */}
      <div className="mt-[27px] w-[328px] h-[66px]">
        <label className="font-PDMedium leading-tight text-16 text-toss">
          전체 고민 시간
        </label>
        <div className="flex items-center mt-[1px]">
          <div className="flex items-center w-[122px] h-[46px] rounded-15 border-2 border-[#ECEEEF] bg-background">
            {/* 일 선택 */}
            <p className="pl-[13px] font-PDMedium text-24 bg-background">01</p>
          </div>
          <span className="text-black pl-[5px] font-PDMedium text-20">일</span>
          <div className="flex ml-[21px] items-center w-[122px] h-[46px] rounded-15 border-2 border-[#ECEEEF] bg-background">
            {/* 시간 선택 */}
            <p className="pl-[13px] font-PDMedium text-24 bg-background">01</p>
          </div>
          <span className="text-black pl-[5px] font-PDMedium text-20">
            시간
          </span>
        </div>
      </div>
      {/* 완료 버튼 */}
      <button
        className="mt-[155px] w-[351px] h-[59px] rounded-15 bg-toss"
        onClick={handleMoveToSetupCompletePage}
      >
        <p className="font-PDMedium text-20 text-white">완료하기</p>
      </button>
    </div>
  );
};

export default SetupPage;
