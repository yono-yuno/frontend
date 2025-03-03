import React from "react";
import "../styles/style.css";
import "../styles/index.css";
import YunoFlower from "../assets/YunoFlower.png";
const WelcomPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      {/* 유노 캐릭터 이미지 */}
      <yuno>
        <div className="flex mt-[84px]">
          <img src={YunoFlower} className="w-[323px] h-[275px] " />
        </div>
      </yuno>
      {/* 텍스트 영역 */}
      <div className="mt-[54px] text-center text-20 leading-tight font-PDMedium ">
        <p className="text-black">
          반가워요. <name className="text-toss">홍길동</name>님!
        </p>
        <p className="text-black">
          저는 <span className="text-toss">요노 생활</span>을 도와드릴 비서,
          <span className="text-toss"> 유노</span>예요.
        </p>
        <p className="mt-[30px] text-black">
          지금부터 <span className="text-toss">기초 설정</span>을 시작해볼까요?
        </p>
      </div>
      <button
        className="mt-[176px] w-[351px] h-[59px] rounded-15 bg-toss"
        onClick={() => console.log("시작하기 버튼 클릭됨")}
      >
        <p className="font-PDMedium text-20 text-white">시작하기</p>
      </button>
    </div>
  );
};

export default WelcomPage;
