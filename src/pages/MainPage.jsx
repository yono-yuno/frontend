import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Setting from "../assets/Setting.png";
import Alarm from "../assets/Alarm.png";
//import AlarmOn from "../assets/Alarm_on.png";
import MainSpeechBubble from "../assets/MainSpeechBubble.png";
import Yuno from "../assets/Yuno.gif";
import PayRecordB from "../assets/PayRecordB.png";
import ShoppingB from "../assets/ShoppingB.png";
import ThinkingB from "../assets/ThinkingB.png";
import PayToss from "../assets/Paytoss.png";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import {
  SETTING_PAGE_PATH,
  ALARM_PAGE_PATH,
  SHOP_PAGE_PATH,
  THINKPAY_PAGE_PATH,
  PAYRECORD_PAGE_PATH,
} from "../constants/Paths";

const MainPage = () => {
  const carouselRef = useRef(null); //회전목마라는 뜻: 슬라이드 컨테이너를 참조하는 변수
  const [index, setIndex] = useState(0); //현재 보고 있는 슬라이드 번호(0 또는 1)
  const navigate = useNavigate();

  const handleSetting = () => {
    navigate(SETTING_PAGE_PATH);
  };
  const handleAlarm = () => {
    navigate(ALARM_PAGE_PATH);
  };
  const handleShop = () => {
    navigate(SHOP_PAGE_PATH);
  };
  const handleThinkPay = () => {
    navigate(THINKPAY_PAGE_PATH);
  };
  const handlePayRecord = () => {
    navigate(PAYRECORD_PAGE_PATH);
  };

  useEffect(() => {
    const slideWidth = carouselRef.current?.clientWidth; // 슬라이드 하나의 너비
    const interval = setInterval(() => {
      setIndex((prev) => {
        const newIndex = prev === 0 ? 1 : 0; // 0이면 1로, 1이면 0으로 바꾸기
        carouselRef.current.scrollTo({
          left: newIndex * slideWidth, //새로운 위치로 스크롤 이동
          behavior: "smooth", //부드럽게 이동
        });
        return newIndex; //상태 업데이트
      });
    }, 6000); // 7초마다 변경

    return () => clearInterval(interval); //컴포넌트가 사라질 때 인터벌 정리
  }, []);

  return (
    <div className="bg-background">
      <header className="flex justify-between pl-[25px] pr-[22px] h-[58px] items-end ">
        <img src={Logo} className="w-[157px] h-[27px] mb-[3px]" />
        <div>
          <button onClick={handleAlarm}>
            <img src={Alarm} className="w-[34px] h-[34px]" />
            {/* <img src={AlarmOn} className="w-[34px] h-[35px] " /> */}
          </button>
          <button onClick={handleSetting}>
            <img src={Setting} className="w-[34px] h-[34px] ml-[13px]" />
          </button>
        </div>
      </header>
      <main>
        <div>
          <div className="flex justify-center mt-[30px]">
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
            <img src={Yuno} className="w-[149px] h-[143px]" />
          </div>
        </div>
        <menu className="flex flex-col justify-center items-center mt-[27px]">
          <div className="flex justify-between items-center pr-[21px] pl-[21px] w-width h-[63px] rounded-15 bg-white">
            <div className="flex items-center">
              <img src={PayToss} className="w-[35px] h-[35px] mr-[13px]" />
              <div>
                <p className="mb-[3px] font-PDMedium text-[21px] text-black leading-none">
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
            <button onClick={handlePayRecord}>
              <img src={PayRecordB} className="w-[117px] h-[95px]" />
            </button>
            <button onClick={handleThinkPay}>
              <img src={ThinkingB} className="w-[117px] h-[95px]" />
            </button>
            <button onClick={handleShop}>
              <img src={ShoppingB} className="w-[117px] h-[95px]" />
            </button>
          </div>
          <div
            className="flex  w-width overflow-x-auto scroll-smooth"
            ref={carouselRef}
          >
            <div className="flex flex-col justify-center items-center p-[30px] w-width h-[220px] mt-[15px] mb-[24px] rounded-15 bg-white">
              <div className="flex justify-start w-[310px]">
                <p className="font-PDMedium text-16 text-black">2월</p>
              </div>
              <div className="flex flex-row justify-between w-[350px]">
                <div className="flex flex-col justify-center pl-[20px]">
                  <p className="font-PDBold text-20 text-black">1,520,731원</p>
                  <p className=" pt-[5px] font-PDMedium text-[12px] text-[#697583]">
                    저번 달 같은 날보다{" "}
                    <span className="text-[#FC6767]">10,000원 많이 사용</span>
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
            <div className="flex flex-col justify-center items-center p-[30px] w-width h-[220px] mt-[15px] mb-[24px] rounded-15 bg-white">
              <div className="flex justify-start w-[310px]">
                <p className="font-PDMedium text-16 text-black">2월</p>
              </div>
              <div className="flex flex-row justify-between w-[350px]">
                <div className="flex justify-center pl-[20px] font-PDSemibold text-20">
                  <span className="text-black pr-[4px]">최대 소비</span>
                  <span className="text-[#93C9FF]">출산 · 육아</span>
                </div>
              </div>
              <div className="flex justify-between w-[314px] h-[120px]">
                <div className="flex flex-col items-start text-16 text-[#697583]">
                  <div>
                    <span className="mr-[13px] font-PDMedium text-[#93C9FF]">
                      30%
                    </span>
                    <span className="font-PDRegular ">출산 · 육아</span>
                  </div>
                  <div>
                    <span className="mr-[13px] font-PDMedium text-[#DB88E7]">
                      20%
                    </span>
                    <span className="font-PDRegular ">인테리어</span>
                  </div>
                  <div>
                    <span className="mr-[13px] font-PDMedium text-[#EF4452]">
                      18%
                    </span>
                    <span className="font-PDRegular">식품</span>
                  </div>
                  <div>
                    <span className="mr-[13px] font-PDMedium text-[#4E7698]">
                      14%
                    </span>
                    <span className="font-PDRegular">패션잡화</span>
                  </div>
                  <div>
                    <span className="mr-[13px] font-PDMedium text-[#D9D9D9]">
                      18%
                    </span>
                    <span className="font-PDRegular">그 외</span>
                  </div>
                </div>
                <PieChart />
              </div>
            </div>
          </div>
        </menu>
      </main>
    </div>
  );
};

export default MainPage;
