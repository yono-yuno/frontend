import React from "react";
import Header from "../components/Header";
import SmallAngryYuno from "../assets/SmallAngryYuno.png";
import MediumAngryYuno from "../assets/MediumAngryYuno.png";
import BigAngryYuno from "../assets/BigAngryYuno.png";
import SmallAngryBubble from "../assets/SmallAngryBubble.png";
import MediumAngryBubble from "../assets/MediumAngryBubble.png";
import BigAngryBubble from "../assets/BigAngryBubble.png";
import ElectronicsCategoryIcon from "../assets/ElectronicsCategoryIcon.png";

const PayPage = () => {
  const data = {
    overprice: 500000,
    status: 0,
    brandName: "토스 요노쇼핑",
    itemName: "Marshal WOBURN3 블루투스 스피커",
    price: 855000,
    itemImg: ElectronicsCategoryIcon,
  };
  let yonoStatus = {};

  const Yuno = () => {
    switch (data.status) {
      default:
        return (yonoStatus = {
          bubble: SmallAngryBubble,
          talk: "흠.. 꼭 사야 될까요?",
          yonoImg: SmallAngryYuno,
        });
      case 0:
        return (yonoStatus = {
          bubble: MediumAngryBubble,
          talk: "좀 더 고민해 볼까요??",
          yonoImg: MediumAngryYuno,
        });
      case 1:
        return (yonoStatus = {
          bubble: BigAngryBubble,
          talk: "정말요?",
          yonoImg: BigAngryYuno,
        });
    }
  };

  Yuno();

  return (
    <div className="w-full h-full bg-background">
      <Header />
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center relative mt-[1px]">
          <img src={yonoStatus.bubble} className="w-[188px] h-[68.5px]" />
          <p className="absolute left-[45px] top-[14px] font-PDRegular text-16 text-black leading-tight">
            {yonoStatus.talk}
          </p>
          <img src={yonoStatus.yonoImg} className="w-[229px] h-[143px]" />
        </div>
        <div className="flex items-center justify-center mt-[60px] w-width h-[147px] gap-[9px] bg-white rounded-15">
          <img
            src={data.itemImg}
            className="w-[100px] h-[100px] border-[2px] border-background rounded-15 "
          />
          <div className="flex flex-col items-start justify-center gap-[8px] font-PDMedium text-16 leading-tight">
            <p>{data.brandName}</p>
            <p className="font-PDLight">{data.itemName}</p>
            <p>
              {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </p>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default PayPage;
