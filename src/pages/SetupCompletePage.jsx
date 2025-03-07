import React from "react";
import "../styles/style.css";
import "../styles/index.css";
import YunoHeart from "../assets/YunoHeart.png";
import YunoLogo from "../assets/YunoLogo.png";
import { useNavigate } from "react-router-dom";
import { MAIN_PAGE_PATH } from "../constants/Paths";

const SetupCompletePage = () => {
  const navigate = useNavigate();
  const handleMoveToMainPage = () => {
    navigate(MAIN_PAGE_PATH);
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      {/* 유노 캐릭터 이미지 */}
      <div className="flex mt-[88px] mr-[16px]">
        <img src={YunoHeart} className="w-[296px] h-[274px]" />
      </div>
      {/* 텍스트 영역 */}
      <div className="mt-[23px] text-center text-20 leading-tight font-PDMedium">
        <p className="text-toss">
          초기 설정이 완료
          <span className="text-black">되었어요!</span>
        </p>
        <p className="text-black">
          이제 유노와 함께 <span className="text-toss">요노 생활</span>을
          시작해볼까요?
        </p>
      </div>
      <button
        onClick={handleMoveToMainPage}
        className="flex items-center justify-center mt-[257px] w-buttonWidth h-buttonHeight rounded-15 bg-toss"
      >
        <img src={YunoLogo} className="w-[23px] h-[27px]" />
        <p className="pl-[6px] font-PDMedium text-20 text-white">확인</p>
      </button>
    </div>
  );
};

export default SetupCompletePage;
