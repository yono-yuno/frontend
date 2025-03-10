import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import {
  MAIN_PAGE_PATH,
  DIARY_PAGE_PATH,
  DIARYEDIT_PAGE_PATH,
} from "../constants/Paths";
import Iteminfo from "../components/ItemInfo";
import ElectronicsCategoryIcon from "../assets/ElectronicsCategoryIcon.png";

const PayRecordPage = () => {
  const navigate = useNavigate();

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
      diary: {
        reason: "고민 끝에 구매!",
        diary:
          "오래 사용해보고 느낀 점은 괜찮은 제품인거 같다. 볼륨도 빵빵하고 사운드도 잘 들려서 자기 전에 듣고 자면 꿀잠 예약이였다.",
        rating: 4,
      },
    },
    {
      id: 3,
      brandName: "마샬",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      diary: {
        reason: "고민 끝에 구매!",
        diary:
          "오래 사용해보고 느낀 점은 괜찮은 제품인거 같다. 볼륨도 빵빵하고 사운드도 잘 들려서 자기 전에 듣고 자면 꿀잠 예약이였다.",
        rating: 4,
      },
    },
    {
      id: 4,
      brandName: "마샬",
      itemName: "Marshal WOBURN3 블루투스 스피커",
      price: 855000,
      itemImg: ElectronicsCategoryIcon,
      diary: {
        reason: "고민 끝에 구매!",
        diary:
          "오래 사용해보고 느낀 점은 괜찮은 제품인거 같다. 볼륨도 빵빵하고 사운드도 잘 들려서 자기 전에 듣고 자면 꿀잠 예약이였다.",
        rating: 4,
      },
    },
  ]);

  const handleGoToDiary = (item) => {
    navigate(DIARY_PAGE_PATH, { state: { item } });
  };

  const handleGoToDiaryEdit = (item) => {
    navigate(DIARYEDIT_PAGE_PATH, {
      state: {
        item: {
          ...item,
          diary: { ...item.diary, diary: "", rating: 0 },
        },
      },
    });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-y-auto">
      {/* ✅ 헤더 (상단 여백 유지) */}
      <div className="bg-background w-full">
        <Header text="결제 기록" onClick={() => navigate(MAIN_PAGE_PATH)} />
      </div>

      {/* ✅ 카테고리 리스트 (헤더와 간격 추가) */}
      <div className="bg-background w-full pl-[22px] mt-[27px]">
        <CategoryList />
      </div>

      {/* ✅ 메인 콘텐츠 영역 (스크롤 가능) */}
      <main className="flex flex-col px-[10px] pt-[20px] w-full flex-grow">
        {itemList.map((item) => (
          <div
            key={item.id}
            className="bg-white mt-[10px] w-[371px] h-auto rounded-15 p-[15px] shadow-md"
          >
            <p className="!text-[16px] font-PDRegular text-black">25.02.20</p>
            <div className="mt-[10px]">
              <Iteminfo
                itemImg={item.itemImg}
                brandName={item.brandName}
                itemName={item.itemName}
                price={item.price}
              />
            </div>

            <div className="flex justify-center mt-[21px]">
              <button
                className={`w-[149px] h-[48px] rounded-15 text-18 font-PDRegular ${
                  item.diary.diary && item.diary.rating > 0
                    ? "bg-[#F3F4F6] text-button"
                    : "bg-extraButton text-toss"
                }`}
                disabled={item.diary.diary && item.diary.rating > 0}
                onClick={() => handleGoToDiaryEdit(item)}
              >
                {item.diary.diary && item.diary.rating > 0
                  ? "일기 작성 완료"
                  : "일기 작성"}
              </button>

              <button
                className="w-[149px] h-[48px] bg-toss text-white ml-[18px] rounded-15 text-18 font-PDRegular"
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
