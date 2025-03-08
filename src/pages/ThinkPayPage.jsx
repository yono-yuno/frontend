import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import { MAIN_PAGE_PATH } from "../constants/Paths";
import { PAY_PAGE_PATH } from "../constants/Paths";
import Iteminfo from "../components/ItemInfo";
import ProgressBar from "../components/ProgressBar";
import ElectronicsCategoryIcon from "../assets/ElectronicsCategoryIcon.png";
import SmallYuno from "../assets/SmallYuno.png";

const ThinkPayPage = () => {
  const navigate = useNavigate();

  // 🏷️ 아이템 리스트 상태 관리
  const [itemList, setItemList] = useState([
    {
      id: 1,
      brandName: "Apple",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      totalTime: 48,
      elapsedTime: 1000,
    },
    {
      id: 2,
      brandName: "마샬",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      totalTime: 48,
      elapsedTime: 1000,
    },
    {
      id: 3,
      brandName: "마샬",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      totalTime: 48,
      elapsedTime: 1600,
    },
    {
      id: 4,
      brandName: "마샬",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      totalTime: 48,
      elapsedTime: 1000,
    },
  ]);

  const handleBackButton = () => {
    navigate(MAIN_PAGE_PATH);
  };
  const handleMoveToPayPage = () => {
    navigate(PAY_PAGE_PATH);
  };

  // 🏷️ 결제 취소 버튼 클릭 시 해당 아이템 삭제
  const handleCancelPayment = (id) => {
    setItemList(itemList.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <Header text="생각 중인 소비" onClick={handleBackButton} />
      <div className="absolute top-[60px] left-[22px] text-15 z-[50]">
        <Dropdown />
      </div>

      <main
        className="flex flex-col px-[10px] pt-[48px] w-full over"
        style={{ height: "calc(100% - 50px)" }}
      >
        {/* 🏷️ 아이템 리스트 렌더링 */}
        {itemList.map((item) => (
          <div
            key={item.id}
            className="bg-white mt-[10px] w-[371px] h-auto rounded-15 p-[15px] shadow-md"
          >
            <p className="text-16 font-PDRegular">25.02.20 09:17</p>
            <div className="mt-[10px]">
              <Iteminfo
                itemImg={item.itemImg}
                brandName={item.brandName}
                itemName={item.itemName}
                price={item.price}
              />
            </div>

            {/* 🏷️ ID에 따라 다른 UI 적용 */}
            {(() => {
              switch (item.id) {
                case 1:
                case 3:
                  return (
                    <div className="flex items-center mt-[10px] w-full h-[51px]">
                      <div className="flex-1 ml-[16px]">
                        <ProgressBar
                          totalTime={item.totalTime}
                          elapsedTime={item.elapsedTime}
                        />
                      </div>
                      <div className="mr-[17px]">
                        <button
                          onClick={() => handleCancelPayment(item.id)}
                          className="bg-[#FC6767] text-white !text-[18px] rounded-15 w-[116px] h-[48px]"
                        >
                          결제 취소
                        </button>
                      </div>
                    </div>
                  );

                case 2:
                case 4:
                  return (
                    <div className="flex items-center mt-[10px] w-full">
                      <button
                        onClick={handleMoveToPayPage}
                        className="bg-toss rounded-15 w-[173px] h-[48px] flex items-center justify-center ml-[14px]"
                      >
                        <img src={SmallYuno} className="w-[23px] h-[27px]" />{" "}
                        <p className="pl-[6px] font-PDRegular !text-[18px] text-white">
                          결제로 이동
                        </p>
                      </button>

                      <button
                        onClick={() => handleCancelPayment(item.id)}
                        className="bg-[#FC6767] text-white !text-[18px] rounded-15 w-[116px] h-[48px] ml-[23px]"
                      >
                        결제 취소
                      </button>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        ))}
      </main>
    </div>
  );
};

export default ThinkPayPage;
