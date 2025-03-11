import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "../constants/Paths";
import { api } from "../apis/api";
import { div } from "framer-motion/client";

const MainPage = () => {
  const { userId } = useParams();
  const { userName } = useParams();
  const carouselRef = useRef(null); //회전목마라는 뜻: 슬라이드 컨테이너를 참조하는 변수
  const [index, setIndex] = useState(0); //현재 보고 있는 슬라이드 번호(0 또는 1)
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);
  const [thisMonth, setThisMonth] = useState(0);
  const [thisDay, setThisDay] = useState(0);
  let yunoSay = "";

  const handleSetting = () => {
    navigate(SETTING_PAGE_PATH);
  };
  const handleAlarm = () => {
    navigate(ALARM_PAGE_PATH);
  };
  const handleShop = () => {
    navigate(SHOP_PAGE_PATH);
  };

  const yunoSayList = [
    `안녕하세요. ${userName}님! 좋은 하루 되세요. 😍`,
    `생각 중인 소비가 ${cartCount}개 있어요! 🧐`,
    "필요한 소비만, 행복한 지출만! 유노가 지켜보고 있어요! 😎👍",
    "저, 유노와 함께 소비를 고민해 봐요. 🤔",
    "꼭 필요한 소비인지 다시 생각해 보면 좋을 거예요! 💕",
    "오늘 하루는 어떠셨나요? 행복한 하루 되셨길 바라요. 😊",
    "피곤하시다면, 간단하게 커피 한 잔 정도는 괜찮아요! ☕",
    `유노가 ${userName}님의 요노 삶을 항상 응원하고 있어요! 👊`,
    "할인에 너무 현혹되시면 안돼요! 필요한 걸 먼저 생각해 보셔야 해요. 👀",
    "오늘 날씨가 괜찮다면, 소비 말고 산책도 정말 좋은 취미예요! 👣",
    "아무리 절약하시더라도, 밥은 정말 잘 챙겨드셔야 해요! 🍱",
  ];

  const GetRandomYunoSay = () => {
    const randomIndex = Math.floor(Math.random() * yunoSayList.length);
    yunoSay = yunoSayList[randomIndex];
  };

  //더 느리게 변경 예정
  GetRandomYunoSay();

  //이번주 일~토까지의 날짜 받아오기
  const getWeekRange = (date) => {
    const dayOfWeek = date.getDay(); //요일(0:일 ~ 6:토)
    const startDate = new Date(date); //원본 보존
    startDate.setDate(date.getDate() - dayOfWeek); //해당 주의 일요일로 변경

    //일요일부터 토요일까지의 날짜 생성
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      return d.getDate(); //일만 받아옴
    });
  };

  //계좌 잔액
  const getAccount = async () => {
    try {
      const res = await api.get(`/account?userId=${userId}`);
      if (res.data.isSuccess) {
        setBalance(res.data.accountInfo.balance);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //카트에 담긴 아이템 수
  const getCartCount = async () => {
    try {
      const res = await api.get(`/cart/all?userId=${userId}`);
      if (res.data.isSuccess) {
        setCartCount(res.data.cartList.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //차트 데이터
  const getChartdata = async () => {
    try {
      const res = await api.get(`/diary/statistic?userId=${userId}`);
      if (res.data.isSuccess) {
        setLineData(res.data.statistic.lineGraphData);
        setPieData(res.data.statistic.pieGraphData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const MonthComparison = () => {
    const Gap = lineData[thisDay - 1].prev - lineData[thisDay - 1].curr;

    switch (Gap) {
      case Gap == 0:
        return (
          <p className=" pt-[5px] font-PDMedium text-[12px] text-[#697583]">
            지난달과 <span className="text-[#74A174]">소비가 같아요</span>
          </p>
        );
      case Gap > 0:
        return (
          <p className=" pt-[5px] font-PDMedium text-[12px] text-[#697583]">
            지난달보다
            <span className="text-toss">{Gap}원 적게 사용</span>
          </p>
        );
      case Gap < 0:
        return (
          <p className=" pt-[5px] font-PDMedium text-[12px] text-[#697583]">
            지난달보다
            <span className="text-toss">{Math.abs(Gap)}원 많이 사용</span>
          </p>
        );
    }
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
    }, 6000); // 6초마다 변경
    return () => clearInterval(interval); //컴포넌트가 사라질 때 인터벌 정리
  }, []);

  useEffect(() => {
    const today = new Date(); //현재 날짜
    setThisWeek(getWeekRange(today));
    setThisMonth(today.getMonth() + 1);
    setThisDay(today.getDate()); //일
    console.log(thisMonth);

    getAccount();
    getCartCount();
    getChartdata();
  }, []);

  return (
    <div></div>
    // <div className="bg-background">
    //   <header className="flex justify-between pl-[25px] pr-[22px] h-[58px] items-end ">
    //     <img src={Logo} className="w-[157px] h-[27px] mb-[3px]" />
    //     <div>
    //       <button onClick={handleAlarm}>
    //         <img src={Alarm} className="w-[34px] h-[34px]" />
    //         {/* <img src={AlarmOn} className="w-[34px] h-[35px] " /> */}
    //       </button>
    //       <button onClick={handleSetting}>
    //         <img src={Setting} className="w-[34px] h-[34px] ml-[13px]" />
    //       </button>
    //     </div>
    //   </header>
    //   <main>
    //     <div>
    //       <div className="flex justify-center mt-[30px]">
    //         <img src={MainSpeechBubble} className="w-[273px] h-[101px]" />
    //         {/* absolute는 요소의 위치 조정, flex는 내부 요소 정렬 -> 둘이 같이 사용 가능 */}
    //         <div className="absolute w-[271px] h-[72px] flex items-center">
    //           {/* 대략 48자 작성 가능 */}
    //           <p className="ml-[20px] mr-[20px] mt-[9px] mb-[9px] font-PDMedium text-16 text-black">
    //             {yunoSay}
    //           </p>
    //         </div>
    //       </div>
    //       <div className="flex justify-center mt-[3px]">
    //         <img src={Yuno} className="w-[149px] h-[143px]" />
    //       </div>
    //     </div>
    //     <menu className="flex flex-col justify-center items-center mt-[27px]">
    //       <div className="flex justify-between items-center pr-[21px] pl-[21px] w-width h-[63px] rounded-15 bg-white">
    //         <div className="flex items-center">
    //           <img src={PayToss} className="w-[35px] h-[35px] mr-[13px]" />
    //           <div>
    //             <p className="mb-[3px] font-PDMedium text-[21px] text-black leading-none">
    //               0원
    //             </p>
    //             <p className="font-PDRegular text-[13px] text-[#80858E] leading-none">
    //               토스뱅크 통장
    //             </p>
    //           </div>
    //         </div>
    //         <button className="flex justify-center items-center w-[46px] h-[27px] rounded-[10px] bg-background font-PDRegular text-[13px] text-[#80858E]">
    //           송금
    //         </button>
    //       </div>
    //       <div className="flex justify-between w-width h-[95px] mt-[15px]">
    //         <button>
    //           <img src={PayRecordB} className="w-[117px] h-[95px]" />
    //         </button>
    //         <button>
    //           <img src={ThinkingB} className="w-[117px] h-[95px]" />
    //         </button>
    //         <button onClick={handleShop}>
    //           <img src={ShoppingB} className="w-[117px] h-[95px]" />
    //         </button>
    //       </div>
    //       <div
    //         className="flex  w-width overflow-x-auto scroll-smooth"
    //         ref={carouselRef}
    //       >
    //         <div className="flex flex-col justify-center items-center p-[30px] w-width h-[220px] mt-[15px] mb-[24px] rounded-15 bg-white">
    //           <div className="flex justify-start w-[310px]">
    //             <p className="font-PDMedium text-16 text-black">
    //               {thisMonth}월
    //             </p>
    //           </div>
    //           <div className="flex flex-row justify-between w-[350px]">
    //             <div className="flex flex-col justify-center pl-[20px]">
    //               <p className="font-PDBold text-20 text-black">
    //                 {lineData[thisDay - 1].curr}원
    //               </p>
    //               <MonthComparison />
    //             </div>
    //             <div className="w-[140px] h-[70px]">
    //               <LineChart data={lineData} />
    //             </div>
    //           </div>
    //           <div className="flex flex-row mt-[20px] leading-tight">
    //             <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
    //               <p>일</p>
    //               <p
    //                 className={`text-[16px] mt-[10px] ${
    //                   lineData[thisWeek[0] - 1].weekData != 0
    //                     ? "text-[#697583]"
    //                     : "text-button"
    //                 } `}
    //               >
    //                 {thisWeek[0]}
    //               </p>
    //               <p
    //                 className={`text-[9px] ${
    //                   lineData[thisWeek[0] - 1].weekData > 100000
    //                     ? "text-[#FC6767]"
    //                     : "text-[#697583]"
    //                 }`}
    //               >
    //                 {lineData[thisWeek[0] - 1].weekData != 0
    //                   ? lineData[thisWeek[0] - 1].weekData.toLocaleString()
    //                   : "⠀"}
    //               </p>
    //             </div>
    //             <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
    //               <p>월</p>
    //               <p
    //                 className={`text-[16px] mt-[10px] ${
    //                   lineData[thisWeek[1] - 1].weekData != 0
    //                     ? "text-[#697583]"
    //                     : "text-button"
    //                 }`}
    //               >
    //                 {thisWeek[1]}
    //               </p>
    //               <p
    //                 className={`text-[9px] ${
    //                   lineData[thisWeek[1] - 1].weekData > 100000
    //                     ? "text-[#FC6767]"
    //                     : "text-[#697583]"
    //                 }`}
    //               >
    //                 {lineData[thisWeek[1] - 1].weekData != 0
    //                   ? lineData[thisWeek[1] - 1].weekData.toLocaleString()
    //                   : "⠀"}
    //               </p>
    //             </div>
    //             <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
    //               <p>화</p>
    //               <p
    //                 className={`text-[16px] mt-[10px] ${
    //                   lineData[thisWeek[2] - 1].weekData != 0
    //                     ? "text-[#697583]"
    //                     : "text-button"
    //                 }`}
    //               >
    //                 {thisWeek[2]}
    //               </p>
    //               <p
    //                 className={`text-[9px] ${
    //                   lineData[thisWeek[2] - 1].weekData > 100000
    //                     ? "text-[#FC6767]"
    //                     : "text-[#697583]"
    //                 }`}
    //               >
    //                 {lineData[thisWeek[2] - 1].weekData != 0
    //                   ? lineData[thisWeek[2] - 1].weekData.toLocaleString()
    //                   : "⠀"}
    //               </p>
    //             </div>
    //             <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
    //               <p>수</p>
    //               <p
    //                 className={`text-[16px] mt-[10px] ${
    //                   lineData[thisWeek[3] - 1].weekData != 0
    //                     ? "text-[#697583]"
    //                     : "text-button"
    //                 }`}
    //               >
    //                 {thisWeek[3]}
    //               </p>
    //               <p
    //                 className={`text-[9px] ${
    //                   lineData[thisWeek[3] - 1].weekData > 100000
    //                     ? "text-[#FC6767]"
    //                     : "text-[#697583]"
    //                 }`}
    //               >
    //                 {lineData[thisWeek[3] - 1].weekData != 0
    //                   ? lineData[thisWeek[3] - 1].weekData.toLocaleString()
    //                   : "⠀"}
    //               </p>
    //             </div>
    //             <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
    //               <p>목</p>
    //               <p
    //                 className={`text-[16px] mt-[10px] ${
    //                   lineData[thisWeek[4] - 1].weekData != 0
    //                     ? "text-[#697583]"
    //                     : "text-button"
    //                 }`}
    //               >
    //                 {thisWeek[4]}
    //               </p>
    //               <p
    //                 className={`text-[9px] ${
    //                   lineData[thisWeek[4] - 1].weekData > 100000
    //                     ? "text-[#FC6767]"
    //                     : "text-[#697583]"
    //                 }`}
    //               >
    //                 {lineData[thisWeek[4] - 1].weekData != 0
    //                   ? lineData[thisWeek[4] - 1].weekData.toLocaleString()
    //                   : "⠀"}
    //               </p>
    //             </div>
    //             <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
    //               <p>금</p>
    //               <p
    //                 className={`text-[16px] mt-[10px] ${
    //                   lineData[thisWeek[5] - 1].weekData != 0
    //                     ? "text-[#697583]"
    //                     : "text-button"
    //                 }`}
    //               >
    //                 {thisWeek[5]}
    //               </p>
    //               <p
    //                 className={`text-[9px] ${
    //                   lineData[thisWeek[5] - 1].weekData > 100000
    //                     ? "text-[#FC6767]"
    //                     : "text-[#697583]"
    //                 }`}
    //               >
    //                 {lineData[thisWeek[5] - 1].weekData != 0
    //                   ? lineData[thisWeek[5] - 1].weekData.toLocaleString()
    //                   : "⠀"}
    //               </p>
    //             </div>
    //             <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
    //               <p>토</p>
    //               <p
    //                 className={`text-[16px] mt-[10px] ${
    //                   lineData[thisWeek[6] - 1].weekData != 0
    //                     ? "text-[#697583]"
    //                     : "text-button"
    //                 }`}
    //               >
    //                 {thisWeek[6]}
    //               </p>
    //               <p
    //                 className={`text-[9px] ${
    //                   lineData[thisWeek[6] - 1].weekData > 100000
    //                     ? "text-[#FC6767]"
    //                     : "text-[#697583]"
    //                 }`}
    //               >
    //                 {lineData[thisWeek[6] - 1].weekData != 0
    //                   ? lineData[thisWeek[6] - 1].weekData.toLocaleString()
    //                   : "⠀"}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex flex-col justify-center items-center p-[30px] w-width h-[220px] mt-[15px] mb-[24px] rounded-15 bg-white">
    //           <div className="flex justify-start w-[310px]">
    //             <p className="font-PDMedium text-16 text-black">
    //               {thisMonth}월
    //             </p>
    //           </div>
    //           <div className="flex flex-row justify-between w-[350px]">
    //             <div className="flex justify-center pl-[20px] font-PDSemibold text-20">
    //               <span className="text-black pr-[4px]">최대 소비</span>
    //               <span className="text-[#93C9FF]">출산 · 육아</span>
    //             </div>
    //           </div>
    //           <div className="flex justify-between w-[314px] h-[120px]">
    //             <div className="flex flex-col items-start text-16 text-[#697583]">
    //               <div>
    //                 <span className="mr-[13px] font-PDMedium text-[#93C9FF]">
    //                   30%
    //                 </span>
    //                 <span className="font-PDRegular ">출산 · 육아</span>
    //               </div>
    //               <div>
    //                 <span className="mr-[13px] font-PDMedium text-[#DB88E7]">
    //                   20%
    //                 </span>
    //                 <span className="font-PDRegular ">인테리어</span>
    //               </div>
    //               <div>
    //                 <span className="mr-[13px] font-PDMedium text-[#EF4452]">
    //                   18%
    //                 </span>
    //                 <span className="font-PDRegular">식품</span>
    //               </div>
    //               <div>
    //                 <span className="mr-[13px] font-PDMedium text-[#4E7698]">
    //                   14%
    //                 </span>
    //                 <span className="font-PDRegular">패션잡화</span>
    //               </div>
    //               <div>
    //                 <span className="mr-[13px] font-PDMedium text-[#D9D9D9]">
    //                   18%
    //                 </span>
    //                 <span className="font-PDRegular">그 외</span>
    //               </div>
    //             </div>
    //             <PieChart data={pieData} />
    //           </div>
    //         </div>
    //       </div>
    //     </menu>
    //   </main>
    // </div>
  );
};

export default MainPage;
