import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ItemInfo from "../components/ItemInfo";
import SmallAngryYuno from "../assets/SmallAngryYuno.gif";
import MediumAngryYuno from "../assets/MediumAngryYuno.gif";
import BigAngryYuno from "../assets/BigAngryYuno.gif";
import SmallAngryBubble from "../assets/SmallAngryBubble.png";
import MediumAngryBubble from "../assets/MediumAngryBubble.png";
import BigAngryBubble from "../assets/BigAngryBubble.png";
import TossAccountIcon from "../assets/TossAccountIcon.png";
import TossPayIcon from "../assets/TossPayIcon.png";
import Check from "../assets/Check.png";
import SmallYuno from "../assets/SmallYuno.png";
import {
  PAID_PAGE_PATH,
  SHOP_PAGE_PATH,
  MAIN_PAGE_PATH,
} from "../constants/Paths";
import { api } from "../apis/api";

const PayFromItemPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { userId, userName, itemId } = useParams();
  const [item, setItem] = useState([]);
  const [userData, setUserData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [accountNum, setAccountNum] = useState("");
  const [accountId, setAccountId] = useState("");
  const wiseSayingList = [
    '"소비는 나의 자유다. 하지만 그 자유는 선택에 달려 있다." — 로버트 키요사키',
    '"사람들은 소비하는 것에 비해 더 많은 것을 소유하려고 한다. 하지만 물건이 아니라 경험을 소유하는 것이 더 중요하다." — 조지 베르나르 쇼',
    '"소비는 결국 나 자신을 정의하는 것이다. 나는 내가 소비하는 것을 통해 나를 만든다." — 크리스티나 호프',
    '"돈을 쓰는 건 중요하지만, 어떻게 쓰느냐가 더 중요하다." — 리처드 브랜슨',
    '"물건을 사는 건 나의 마음을 채우는 일이다. 하지만 진정한 행복은 물건이 아니라 경험에서 온다." — 미셸 오바마',
    '"소비가 계속되면 삶은 더 가벼워지고, 진짜 가치 있는 것은 점점 더 가벼워진다." — 헨리 데이비드 소로',
    '"소비는 자아를 만족시키지만, 자아를 만족시키는 것만이 진정한 소비가 아니다." — 파울로 코엘료',
    '"소비는 단순히 물건을 사는 것이 아니라, 나의 삶을 어떻게 사용할 것인가에 대한 선택이다." — 안나 퀸들런',
    '"과소비는 결코 성취감을 가져오지 않는다. 필요한 것을 알게 되는 순간, 진정한 만족을 찾을 수 있다." — 알프레드 나이트',
    '"소비는 단지 물건을 사고 파는 것 이상의 의미가 있다. 그것은 우리가 무엇을 중시하는지를 보여준다." — 트레이시 맥밀란',
  ];
  let wiseSaying = "";

  const GetRandomWiseSaying = () => {
    const randomIndex = Math.floor(Math.random() * wiseSayingList.length);
    wiseSaying = wiseSayingList[randomIndex];
  };

  GetRandomWiseSaying();

  const handleGotoMain = () => {
    navigate(
      MAIN_PAGE_PATH.replace(":userId", userId).replace(":userName", userName)
    );
  };

  const handleGotoPaid = () => {
    navigate(
      PAID_PAGE_PATH.replace(":userId", userId)
        .replace(":userName", userName)
        .replace(":itemId", itemId)
    );
  };

  const handleGotoShop = () => {
    navigate(
      SHOP_PAGE_PATH.replace(":userId", userId).replace(":userName", userName)
    );
  };

  const createCart = async () => {
    try {
      const res = await api.post("/cart", {
        userId,
        itemId,
        askCount: 0,
      });
      handleGotoMain();
    } catch (error) {
      console.error("API 실패", error);
    }
  };

  const handlePay = async () => {
    try {
      const response = await api.put("/account", {
        accountId,
        balance: balance - item.price,
      });
      console.log("업데이트 성공:", response.data);
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  const handleFinallyPay = () => {
    handlePay();
    handleGotoPaid();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [itemRes, userRes, accountRes] = await Promise.all([
        api.get(`/item?itemId=${itemId}`),
        api.get(`/user?userId=${userId}`),
        api.get(`/account?userId=${userId}`),
      ]);

      if (itemRes.data.isSuccess) {
        setItem(itemRes.data.itemInfo);
      }
      if (userRes.data.isSuccess) {
        setUserData(userRes.data.userInfo);
      }
      if (accountRes.data.isSuccess) {
        setBalance(accountRes.data.accountInfo.balance);
        setAccountNum(accountRes.data.accountInfo.accountNum);
        setAccountId(accountRes.data.accountInfo.accountId);
      }
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchData();
    }
  }, [itemId]);

  let payStatus = {};

  const Status = () => {
    return (payStatus = {
      bubble: SmallAngryBubble,
      talk: "흠.. 꼭 사야 될까요?",
      talkColor: "black",
      yonoImg: SmallAngryYuno,
      priceColor: "black",
      bg: { background: "#F2F4F6" },
      button1Text: "바로 결제",
      button2Img: SmallYuno,
      button2Text: "일단 고민해 보기",
    });
  };

  const Button = () => {
    return userData.overPrice > item.price ? (
      <div className="flex flex-col items-center justify-center mt-[72px]">
        <div className="flex items-center justify-center overflow-hidden mb-[6px] w-[319px] h-[32px] bg-extraButton rounded-[10px] font-PDMedium text-[13px] text-toss">
          <p className="whitespace-nowrap animate-marquee leading-tight">
            {wiseSaying}
          </p>
          <p className="ml-[40px] whitespace-nowrap animate-marquee leading-tight">
            {wiseSaying}
          </p>
          <p className="ml-[40px] whitespace-nowrap animate-marquee leading-tight">
            {wiseSaying}
          </p>
        </div>
        <button
          onClick={handleFinallyPay}
          className="flex flex-row items-center justify-center w-buttonWidth h-buttonHeight gap-[6px] rounded-15 bg-toss text-white"
        >
          <img src={TossPayIcon} className="w-[30px] h-[30px]" />
          <p className="font-PDLight text-24">Pay</p>
          <p className="font-PDLight text-20">동의하고 결제하기</p>
        </button>
        <div className="flex justify-center items-center gap-[5px] w-[300px] h-[27px] text-[13px] leading-tight">
          <img src={Check} className="w-[17px] h-[17px]" />
          <p className="font-PDSemibold text-toss">필수</p>
          <p className="font-PDRegular text-[#999FA8]">
            결제 정보 확인 및 정보 제공 동의
          </p>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center mt-[110px]">
        <div className="flex flex-row items-center justify-center w-buttonWidth h-buttonHeight gap-[19px] font-PDLight text-20">
          <button
            onClick={handleGotoPaid}
            disabled={balance < item.price}
            className="flex justify-center items-center w-[129px] h-buttonHeight rounded-15 bg-extraButton text-toss disabled:bg-placeholder disabled:text-white"
          >
            <p>{payStatus.button1Text}</p>
          </button>
          <button
            onClick={createCart}
            disabled={balance < item.price}
            className={`flex justify-center items-center w-[203px] h-[59px] rounded-15 gap-[6px] bg-toss text-white disabled:bg-placeholder`}
          >
            <img src={payStatus.button2Img} className="w-[23px] h-[27px]" />
            <p>{payStatus.button2Text}</p>
          </button>
        </div>
      </div>
    );
  };

  Status();

  return (
    <div className="h-full w-full">
      {loading ? (
        ""
      ) : (
        <div className="w-full h-full" style={payStatus.bg}>
          <Header onClick={handleGotoShop} />
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center relative mt-[1px]">
              <img src={payStatus.bubble} className="w-[188px] h-[68.5px]" />
              <p
                className={`absolute left-[23px] top-[14px] font-PDRegular text-16 text-${payStatus.talkColor} leading-tight`}
              >
                {payStatus.talk}
              </p>
              <img src={payStatus.yonoImg} className="w-[149px] h-[143px]" />
            </div>
            <div className="flex items-center justify-center mt-[60px] w-width h-[147px] rounded-15 bg-white">
              <ItemInfo
                itemImg={item.itemImg}
                brandName={item.brandName}
                itemName={item.itemName}
                priceColor={payStatus.priceColor}
                price={item.price}
              />
            </div>
            <div className="flex items-center mt-[15px] w-width h-[99px] rounded-15 bg-white">
              <div className="flex flex-col ml-[22px] w-[200px] h-[71px]">
                <p className="font-PDSemibold text-16 text-[#7C838D] leading-tight">
                  결제수단
                </p>
                <div className="flex mt-[7px] gap-[13px]">
                  <img src={TossAccountIcon} className="w-[40px] h-[40px]" />
                  <div className="flex flex-col items-start justify-center leading-tight">
                    <p className="font-PDSemibold text-16 text-black">
                      토스뱅크 통장
                    </p>
                    <p className="font-PDRegular text-12 text-[#7B838F]">
                      토스뱅크 {accountNum}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Button />
          </div>
        </div>
      )}
    </div>
  );
};

export default PayFromItemPage;
