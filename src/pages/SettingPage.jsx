import React from "react";
import Header from "../components/Header";
import Profile from "../assets/Profile.png";
import SettingDropUp from "../assets/SettingDropUp.png";

const SettingPage = () => {
  return (
    <div className="w-[393px] h-[795px] bg-background">
      <Header text={"설정"} />
      <div className="flex flex-col items-center mt-[20px]">
        <div className="flex flex-row items-center w-width h-[125px] p-[30px] mb-[15px] rounded-t-[20px] bg-white">
          <img src={Profile} className="w-[65px] h-[65px] mr-[9px]" />
          <p className="font-PDRegular text-15 leading-tight">홍길동</p>
        </div>
        <button className="flex justify-between items-center w-width h-[67px] bg-white">
          <p className=" ml-[24px] font-PDRegular text-16 text-black">
            상한액 설정하기
          </p>
          <img src={SettingDropUp} className="w-[10px] h-[19px] mr-[24px]" />
        </button>
        <button className="flex justify-between items-center w-width h-[67px] bg-white">
          <p className="ml-[24px] font-PDRegular text-16 text-black">
            알림 간격 설정하기
          </p>
          <img src={SettingDropUp} className="w-[10px] h-[19px] mr-[24px]" />
        </button>
        <button className="flex justify-start items-center w-width h-[67px] bg-white">
          <p className="ml-[24px] font-PDRegular text-16 text-red">로그아웃</p>
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
