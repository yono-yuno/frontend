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

const SORT_MAP = {
  최신순: "latest",
  오래된순: "oldest",
  "가격 높은순": "highPrice",
  "가격 낮은순": "lowPrice",
};

const ThinkPayPage = () => {
  const navigate = useNavigate();

  const [itemList, setItemList] = useState([
    {
      id: 1,
      brandName: "Apple",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      totalTime: 48,
      elapsedTime: 1440,
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

  const [sort, setSort] = useState("latest");

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
      <div className="flex-none px-4 pt-3 text-15">
        <Dropdown
          selectedSort={sort}
          onChangeSort={(selected) => setSort(SORT_MAP[selected])}
        />
      </div>

      <main
        className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-11 px-2.5`}
      >
        {itemList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-white mb-[10px] w-full h-auto rounded-15 p-[15px] shadow-mds"
          >
            <p className="mr-[225px] text-16 font-PDRegular">25.02.20 09:17</p>
            <div className="mt-[10px]">
              <Iteminfo
                itemImg={item.itemImg}
                brandName={item.brandName}
                itemName={item.itemName}
                price={item.price}
              />
            </div>
            <div className="flex justify-between items-center mt-[10px] w-full h-[51px]">
              {Math.floor(item.totalTime / 2) * 60 > item.elapsedTime ? (
                <div className="flex-1 ml-[16px]">
                  <ProgressBar
                    totalTime={item.totalTime}
                    elapsedTime={item.elapsedTime}
                  />
                </div>
              ) : (
                <button
                  onClick={handleMoveToPayPage}
                  className="bg-toss rounded-15 w-[173px] h-[48px] flex items-center justify-center ml-[14px]"
                >
                  <img src={SmallYuno} className="w-[23px] h-[27px]" />{" "}
                  <p className="pl-[6px] font-PDRegular !text-[18px] text-white">
                    결제로 이동
                  </p>
                </button>
              )}
              <div className="mr-[17px]">
                <button
                  onClick={() => handleCancelPayment(item.id)}
                  className="bg-[#FC6767] text-white font-PDRegular !text-[18px] rounded-15 w-[116px] h-[48px]"
                >
                  결제 취소
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ThinkPayPage;
