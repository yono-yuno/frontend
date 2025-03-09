import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import { MAIN_PAGE_PATH, DIARY_PAGE_PATH } from "../constants/Paths";
import Iteminfo from "../components/ItemInfo";
import ElectronicsCategoryIcon from "../assets/ElectronicsCategoryIcon.png";

const PayRecordPage = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(MAIN_PAGE_PATH);
  };

  const [itemList] = useState([
    {
      id: 1,
      brandName: "Apple",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      diary: { reason: "고민 끝에 구매!", diary: "", rating: 0 },
    },
    {
      id: 2,
      brandName: "마샬",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      diary: { reason: "고민 끝에 구매!", diary: "소리가 좋다", rating: 4 },
    },
    {
      id: 3,
      brandName: "Apple",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      diary: { reason: "고민 끝에 구매!", diary: "", rating: 0 },
    },
    {
      id: 4,
      brandName: "마샬",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      diary: { reason: "고민 끝에 구매!", diary: "소리가 좋다", rating: 4 },
    },
  ]);

  const handleGoToDiary = (item) => {
    navigate(DIARY_PAGE_PATH, { state: { item } });
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <Header text="결제 기록" onClick={handleBackButton} />

      {/* ✅ overflow-y-auto를 추가하여 함께 스크롤 되도록 함 */}
      <main className="flex flex-col px-[10px] pt-4 w-full h-full overflow-y-auto">
        {/* ✅ 카테고리 리스트 위치 조정 (fixed → 제거) */}
        <div className="px-[6px] pt-[27px]">
          <CategoryList />
        </div>
        {itemList.map((item) => (
          <div
            key={item.id}
            className="bg-white mt-[10px] w-[371px] h-auto rounded-15 p-[15px] shadow-md"
          >
            <p className="text-16 font-PDRegular">25.02.20</p>
            <div className="mt-[10px]">
              <Iteminfo
                itemImg={item.itemImg}
                brandName={item.brandName}
                itemName={item.itemName}
                price={item.price}
              />
            </div>

            <div className="flex justify-between mt-3">
              <button
                className={`w-[140px] h-[40px] rounded-lg text-14 ${
                  item.diary.reason && item.diary.diary && item.diary.rating > 0
                    ? "bg-gray-200 text-gray-500"
                    : "bg-[#DDEBFF] text-[#2F80ED]"
                }`}
                disabled={
                  item.diary.reason && item.diary.diary && item.diary.rating > 0
                }
              >
                {item.diary.reason && item.diary.diary && item.diary.rating > 0
                  ? "일기 작성 완료"
                  : "일기 작성"}
              </button>

              <button
                className="w-[140px] h-[40px] bg-[#2F80ED] text-white rounded-lg text-14"
                onClick={() => handleGoToDiary(item)}
              >
                소비 일기
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default PayRecordPage;
