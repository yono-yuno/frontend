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
                저는 요노를 위한 비서, 유노예요!
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-[15px]">
            <img src={Yuno} className="w-[229px] h-[143px]" />
          </div>
        </yuno>
        <menu className="flex flex-col justify-center items-center mt-[61px]">
          <div className="flex justify-center items-center w-width h-[63px] rounded-15 bg-white">
            <div className="flex justify-center items-center">
              <img src={PayToss} className="w-[35px] h-[35px]" />
              <div>
                <p className="font-PDMedium text-[21px] text-black">0원</p>
                <p className="font-PDRegular">토스뱅크 통장</p>
              </div>
            </div>
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
          <div className="flex justify-center items-center w-width h-[220px] mt-[15px] mb-[25px] rounded-15 bg-white">
            통계
          </div>
        </menu>
      </main>
    </div>
  );
};
export default MainPage;
