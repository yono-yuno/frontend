import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Setting from "../assets/Setting.png";
import Alarm from "../assets/Alarm.png";
import AlarmOn from "../assets/Alarm_on.png";
import MainSpeechBubble from "../assets/MainSpeechBubble.png";
import Yuno from "../assets/Yuno.gif";
import YunoP from "../assets/CutYunoHeart.png";
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
import { api } from "../apis/api";

const MainPage = () => {
  const { userId, userName } = useParams();
  const carouselRef = useRef(null); //회전목마라는 뜻: 슬라이드 컨테이너를 참조하는 변수
  const [index, setIndex] = useState(0); //현재 보고 있는 슬라이드 번호(0 또는 1)
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);
  const [thisMonth, setThisMonth] = useState(new Date().getMonth() + 1);
  const [thisDay, setThisDay] = useState(new Date().getDate());
  const [yunoSay, setYunoSay] = useState("");
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [color, setColor] = useState([]);
  const [payTotalSum, setPayTotalSum] = useState(0);
  const [alarmStatus, setAlarmStatus] = useState(false);

  const colorChart = {
    식품: "#EF4452",
    패션잡화: "#4E7698",
    전자제품: "#C0C7D1",
    생활: "#FF814F",
    뷰티: "#F68992",
    의류: "#4592FB",
    "여행 · 취미": "#8FE0B9",
    스포츠: "#FFC84D",
    도서: "#23B169",
    "출산 · 육아": "#93C9FF",
    인테리어: "#DB88E7",
    "그 외": "#D9D9D9",
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

  const handleSetting = () => {
    navigate(
      SETTING_PAGE_PATH.replace(":userId", userId).replace(
        ":userName",
        userName
      )
    );
  };
  const handleAlarm = () => {
    navigate(
      ALARM_PAGE_PATH.replace(":userId", userId).replace(":userName", userName)
    );
  };
  const handleShop = () => {
    navigate(SHOP_PAGE_PATH);
  };
  const handleThinkPay = () => {
    navigate(THINKPAY_PAGE_PATH);
  };
  const handlePayRecord = () => {
    navigate(PAYRECORD_PAGE_PATH.replace(":userId", userId));
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * yunoSayList.length);
    setYunoSay(yunoSayList[randomIndex]);
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 🔹 로딩 시작

      try {
        const [accountRes, cartRes, chartRes, alarmRes] = await Promise.all([
          api.get(`/account?userId=${userId}`),
          api.get(`/cart/all?userId=${userId}`),
          api.get(`/diary/statistic?userId=${userId}`),
          api.get(`/alarm?userId=${userId}`),
        ]);

        if (accountRes.data.isSuccess) {
          setBalance(accountRes.data.accountInfo.balance);
        }

        if (cartRes.data.isSuccess) {
          setCartCount(cartRes.data.cartList.length);
        }

        if (chartRes.data.isSuccess) {
          setLineData(chartRes.data.statistic.lineGraphData);
          setPieData(chartRes.data.statistic.pieGraphData);
        }
        if (alarmRes.data.isSuccess) {
          if (alarmRes.data.alarmList.length != 0) setAlarmStatus(true);
        }
      } catch (error) {
        console.error("❌ API 요청 실패:", error);
      } finally {
        setLoading(false); // 🔹 모든 요청이 끝난 후 로딩 해제
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pieData && pieData.length > 0) {
      setLabels(pieData.map((item) => item.category));
      setData(pieData.map((item) => item.total));
      setPayTotalSum(pieData.reduce((sum, data) => sum + data.total, 0));
    }
  }, [pieData]);

  useEffect(() => {
    if (labels.length > 0) {
      setColor(labels.map((label) => colorChart[label]));
    }
  }, [labels]);

  const MonthComparison = () => {
    if (!lineData[thisDay - 1]) return null; // 안전 체크
    const Gap = lineData[thisDay - 1].prev - lineData[thisDay - 1].curr;

    if (Gap === 0) {
      return (
        <p className="pt-[5px] font-PDMedium text-[12px] text-[#697583]">
          지난달과 <span className="text-[#74A174]">소비가 같아요</span>
        </p>
      );
    } else if (Gap > 0) {
      return (
        <p className="pt-[5px] font-PDMedium text-[12px] text-[#697583]">
          지난달보다{" "}
          <span className="text-toss">{Gap.toLocaleString()}원 적게 사용</span>
        </p>
      );
    } else {
      return (
        <p className="pt-[5px] font-PDMedium text-[12px] text-[#697583]">
          지난달보다{" "}
          <span className="text-[#FC6767]">
            {Math.abs(Gap).toLocaleString()}원 많이 사용
          </span>
        </p>
      );
    }
  };

  useEffect(() => {
    if (!carouselRef.current) return;
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
    setThisWeek(getWeekRange(new Date()));
    // console.log(balance);
    // console.log(cartCount);
    // console.log(lineData);
  }, []);

  return (
    <div className="bg-background">
      <header className="flex justify-between pl-[25px] pr-[22px] h-[58px] items-end ">
        <img src={Logo} className="w-[157px] h-[27px] mb-[3px]" />
        <div>
          <button onClick={handleAlarm}>
            {loading ? (
              ""
            ) : alarmStatus ? (
              <img src={AlarmOn} className="w-[34px] h-[35px] " />
            ) : (
              <img src={Alarm} className="w-[34px] h-[34px]" />
            )}
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
                {yunoSay}
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
                  {loading ? 0 : balance}원
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
            className="flex w-width overflow-x-auto scroll-smooth"
            ref={carouselRef}
          >
            <div className="flex flex-col justify-center items-center p-[30px] w-width h-[220px] mt-[15px] mb-[24px] rounded-15 bg-white">
              <div className="flex justify-start w-[310px]">
                <p className="font-PDMedium text-16 text-black">
                  {thisMonth}월
                </p>
              </div>
              <div className="flex flex-row justify-between w-[350px]">
                <div className="flex flex-col justify-center pl-[20px]">
                  <p className="font-PDBold text-20 text-black">
                    {loading ? 0 : lineData[thisDay - 1].curr.toLocaleString()}
                    원
                  </p>
                  <MonthComparison />
                </div>
                <div className="w-[140px] h-[70px]">
                  {loading ? (
                    ""
                  ) : (
                    <LineChart data={lineData} thisDay={thisDay} />
                  )}
                </div>
              </div>
              <div className="flex flex-row mt-[20px] leading-tight">
                <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                  <p>일</p>
                  <p
                    className={`text-[16px] mt-[10px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[0] - 1].weekData != 0
                        ? "text-[#697583]"
                        : "text-button"
                    } `}
                  >
                    {thisWeek[0]}
                  </p>
                  <p
                    className={`text-[9px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[0] - 1].weekData > 100000
                        ? "text-[#FC6767]"
                        : "text-[#697583]"
                    }`}
                  >
                    {loading
                      ? 0
                      : lineData[thisWeek[0] - 1].weekData != 0
                      ? lineData[thisWeek[0] - 1].weekData.toLocaleString()
                      : "⠀"}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                  <p>월</p>
                  <p
                    className={`text-[16px] mt-[10px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[1] - 1].weekData != 0
                        ? "text-[#697583]"
                        : "text-button"
                    }`}
                  >
                    {thisWeek[1]}
                  </p>
                  <p
                    className={`text-[9px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[1] - 1].weekData > 100000
                        ? "text-[#FC6767]"
                        : "text-[#697583]"
                    }`}
                  >
                    {loading
                      ? 0
                      : lineData[thisWeek[1] - 1].weekData != 0
                      ? lineData[thisWeek[1] - 1].weekData.toLocaleString()
                      : "⠀"}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                  <p>화</p>
                  <p
                    className={`text-[16px] mt-[10px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[2] - 1].weekData != 0
                        ? "text-[#697583]"
                        : "text-button"
                    }`}
                  >
                    {thisWeek[2]}
                  </p>
                  <p
                    className={`text-[9px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[2] - 1].weekData > 100000
                        ? "text-[#FC6767]"
                        : "text-[#697583]"
                    }`}
                  >
                    {loading
                      ? 0
                      : lineData[thisWeek[2] - 1].weekData != 0
                      ? lineData[thisWeek[2] - 1].weekData.toLocaleString()
                      : "⠀"}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                  <p>수</p>
                  <p
                    className={`text-[16px] mt-[10px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[3] - 1].weekData != 0
                        ? "text-[#697583]"
                        : "text-button"
                    }`}
                  >
                    {thisWeek[3]}
                  </p>
                  <p
                    className={`text-[9px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[3] - 1].weekData > 100000
                        ? "text-[#FC6767]"
                        : "text-[#697583]"
                    }`}
                  >
                    {loading
                      ? 0
                      : lineData[thisWeek[3] - 1].weekData != 0
                      ? lineData[thisWeek[3] - 1].weekData.toLocaleString()
                      : "⠀"}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                  <p>목</p>
                  <p
                    className={`text-[16px] mt-[10px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[4] - 1].weekData != 0
                        ? "text-[#697583]"
                        : "text-button"
                    }`}
                  >
                    {thisWeek[4]}
                  </p>
                  <p
                    className={`text-[9px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[4] - 1].weekData > 100000
                        ? "text-[#FC6767]"
                        : "text-[#697583]"
                    }`}
                  >
                    {loading
                      ? 0
                      : lineData[thisWeek[4] - 1].weekData != 0
                      ? lineData[thisWeek[4] - 1].weekData.toLocaleString()
                      : "⠀"}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                  <p>금</p>
                  <p
                    className={`text-[16px] mt-[10px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[5] - 1].weekData != 0
                        ? "text-[#697583]"
                        : "text-button"
                    }`}
                  >
                    {thisWeek[5]}
                  </p>
                  <p
                    className={`text-[9px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[5] - 1].weekData > 100000
                        ? "text-[#FC6767]"
                        : "text-[#697583]"
                    }`}
                  >
                    {loading
                      ? 0
                      : lineData[thisWeek[5] - 1].weekData != 0
                      ? lineData[thisWeek[5] - 1].weekData.toLocaleString()
                      : "⠀"}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[45px] font-PDRegular text-[13px] text-button">
                  <p>토</p>
                  <p
                    className={`text-[16px] mt-[10px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[6] - 1].weekData != 0
                        ? "text-[#697583]"
                        : "text-button"
                    }`}
                  >
                    {thisWeek[6]}
                  </p>
                  <p
                    className={`text-[9px] ${
                      loading
                        ? 0
                        : lineData[thisWeek[6] - 1].weekData > 100000
                        ? "text-[#FC6767]"
                        : "text-[#697583]"
                    }`}
                  >
                    {loading
                      ? 0
                      : lineData[thisWeek[6] - 1].weekData != 0
                      ? lineData[thisWeek[6] - 1].weekData.toLocaleString()
                      : "⠀"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center p-[30px] w-width h-[220px] mt-[15px] mb-[24px] rounded-15 bg-white">
              {pieData.length == 0 ? (
                ""
              ) : (
                <div className="flex justify-start w-[310px]">
                  <p className="font-PDMedium text-16 text-black">
                    {thisMonth}월
                  </p>
                </div>
              )}

              {pieData.length <= 1 ? (
                <div className="flex flex-col justify-center items-center w-[350px] h-[150px] pb-[10px] rounded-15 ">
                  <img src={YunoP} className="w-[180px] mb-[10px] mr-[18px]" />
                  <p className="font-PDRegular text-[16px] text-black leading-tight">
                    <span className="text-toss">{thisMonth}월</span>에는 아직
                    결제 기록이 없어요.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center w-[350px] h-[150px]">
                  <div className="flex flex-row justify-between w-[350px]">
                    <div className="flex justify-center pl-[20px] font-PDSemibold text-20">
                      <span className="text-black pr-[6px]">최대 소비</span>
                      <span style={{ color: color[0] }}>
                        {loading ? "loading..." : pieData[0].category}
                      </span>
                    </div>
                  </div>

                  {loading ? (
                    0
                  ) : (
                    <div className="flex items-center justify-between w-[300px] h-[120px]">
                      <div>
                        {pieData.map((data, index) => (
                          <div key={index} className="flex flex-row">
                            <div
                              className={`w-[34px] mr-[10px] font-PDMedium`}
                              style={{ color: color[index] }}
                            >
                              {Math.round((data.total / payTotalSum) * 100)}%
                            </div>
                            <div className={`font-PDRegular`}>
                              {data.category}
                            </div>
                          </div>
                        ))}
                      </div>

                      <PieChart labels={labels} data={data} color={color} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </menu>
      </main>
    </div>
  );
};

export default MainPage;
