import React from "react";
import Logo from "../assets/Logo.png";
import Setting from "../assets/Setting.png";
import Alarm from "../assets/Alarm.png";
//import AlarmOn from "../assets/Alarm_on.png";
import MainSpeechBubble from "../assets/MainSpeechBubble.png";
import Yuno from "../assets/Yuno.png";
import PayRecordB from "../assets/PayRecordB.png";
import ShoppingB from "../assets/ShoppingB.png";
import ThinkingB from "../assets/ThinkingB.png";
import PayToss from "../assets/Paytoss.png";
import LineChart from "../components/LineChart";

const MainPage = () => {
  return (
    <div className="bg-background">
      <header className="flex justify-between pl-[25px] pr-[22px] h-[58px] items-end ">
        <img src={Logo} className="w-[157px] h-[27px] mb-[3px]" />
        <div>
          <button>
            <img src={Alarm} className="w-[34px] h-[34px]" />
            {/* <img src={AlarmOn} className="w-[34px] h-[35px] " /> */}
          </button>
          <button>
            <img src={Setting} className="w-[34px] h-[34px] ml-[13px]" />
          </button>
        </div>
      </header>
      <main>
        <yuno>
          <div className="flex justify-center mt-[40px]">
            <img src={MainSpeechBubble} className="w-[273px] h-[101px]" />
            {/* absolute는 요소의 위치 조정, flex는 내부 요소 정렬 -> 둘이 같이 사용 가능 */}
            <div className="absolute w-[271px] h-[72px] flex items-center">
              {/* 대략 48자 작성 가능 */}
              <p className="ml-[20px] mr-[20px] mt-[9px] mb-[9px] font-PDMedium text-16 text-black">
                저는 요노족을 위한 비서, 유노예요!
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-[3px]">
            <img src={Yuno} className="w-[229px] h-[143px]" />
          </div>
        </yuno>
        <menu className="flex flex-col justify-center items-center mt-[27px]">
          <div className="flex justify-between items-center pr-[21px] pl-[21px] w-width h-[63px] rounded-15 bg-white">
            <div className="flex items-center">
              <img src={PayToss} className="w-[35px] h-[35px] mr-[13px]" />
              <div>
                <p className="font-PDMedium text-[21px] text-black leading-none">
                  0원
                </p>
                <p className="font-PDRegular text-[13px] text-[#80858E] leading-none">
                  토스뱅크 통장
                </p>
              </div>
            </div>
            <button className="flex justify-center items-center w-[46px] h-[27px] rounded-[10px] bg-background font-PDRegular text-[13px] text-[#80858E]">
              송금
            </button>
          </div>
          <div className="flex justify-between w-width h-[95px] mt-[15px]">
            <button>
              <img src={PayRecordB} className="w-[117px] h-[95px]" />
            </button>
            <button>
              <img src={ThinkingB} className="w-[117px] h-[95px]" />
            </button>
            <button>
              <img src={ShoppingB} className="w-[117px] h-[95px]" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center p-[30px] w-width h-[220px] mt-[15px] mb-[14px] rounded-15 bg-white">
            <div className="flex justify-start w-[310px]">
              <p className="font-PDMedium text-16 text-black">2월</p>
            </div>
            <div className="flex flex-row justify-between w-[350px]">
              <div className="flex flex-col justify-center pl-[20px]">
                <p className="font-PDBold text-20 text-black">1,520,731원</p>
                <p className=" pt-[5px] font-PDMedium text-[12px] text-[#697583]">
                  저번 달 같은 날보다 10,000원 많이 사용
                </p>
              </div>
              <div className="w-[140px] h-[70px]">
                <LineChart />
              </div>
            </div>
            <div className="flex flex-row mt-[20px] leading-tight">
              <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                <p>일</p>
                <p className="text-[16px] mt-[10px] text-[#697583]">16</p>
                <p className="text-[10px] text-[#FC6767]">-32,000</p>
              </div>
              <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                <p>월</p>
                <p className="text-[16px] mt-[10px] text-[#697583]">17</p>
                <p className="text-[10px] text-[#FC6767]">-10,000</p>
              </div>
              <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                <p>화</p>
                <p className="text-[16px] mt-[10px] text-[#697583]">18</p>
                <p className="text-[10px] text-[#FC6767]">-14,000</p>
              </div>
              <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                <p>수</p>
                <p className="text-[16px] mt-[10px]">19</p>
                <p className="text-[10px]">0</p>
              </div>
              <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                <p>목</p>
                <p className="text-[16px] mt-[10px] text-[#697583]">20</p>
                <p className="text-[10px] text-[#FC6767]">-159,800</p>
              </div>
              <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                <p>금</p>
                <p className="text-[16px] mt-[10px] text-[#697583]">21</p>
                <p className="text-[10px] text-[#FC6767]">-615,300</p>
              </div>
              <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                <p>토</p>
                <p className="text-[16px] mt-[10px] ">22</p>
                <p className="text-[10px]">0</p>
              </div>
            </div>
          </div>
        </menu>
      </main>
    </div>
  );
};

export default MainPage;
