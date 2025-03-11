import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { DIARYEDIT_PAGE_PATH } from "../constants/Paths";
import Iteminfo from "../components/ItemInfo";
import ElectronicsCategoryIcon from "../assets/ElectronicsCategoryIcon.png";
import YellowStarIcon from "../assets/YellowStarIcon.png";
import GreyStarIcon from "../assets/GreyStarIcon.png";
import Pencil from "../assets/Pencil.png";

const DiaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const item = location.state?.item || {
    id: 0,
    brandName: "Unknown",
    itemName: "Unknown Item",
    price: 0,
    itemImg: ElectronicsCategoryIcon,
    diary: { reason: "소비 이유를 입력하세요.", diary: "", rating: 0 },
  };

  return (
    <div className="flex flex-col h-full w-full bg-background items-center">
      <Header text="소비 일기" onClick={() => navigate(-1)} />
      <main className="flex flex-col items-center px-4 pt-7 w-full flex-grow overflow-y-auto">
        {/* 날짜 및 아이템 정보 박스 */}
        <div className="bg-white min-w-[371px] max-w-[371px] w-full rounded-15 p-[15px] shadow-md box-border">
          <p className="text-[16px] font-PDRegular text-black">
            25.02.20 09:17
          </p>
          <div className="mt-[10px]">
            <Iteminfo
              itemImg={item.itemImg}
              brandName={item.brandName}
              itemName={item.itemName}
              price={item.price}
            />
          </div>
        </div>

        {/* 별점 박스 */}
        <div className="mt-[25px] bg-white min-w-[371px] max-w-[371px] h-[75px] rounded-15 p-[15px] shadow-md box-border flex justify-center items-center">
          <div className="flex gap-[17px]">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < item.diary.rating ? YellowStarIcon : GreyStarIcon}
                alt="star"
                className="w-[35px] h-[31px]"
              />
            ))}
          </div>
        </div>

        {/* 소비 이유 박스 */}
        <div className="mt-[8px] bg-white min-w-[371px] max-w-[371px] w-full rounded-15 p-[15px] shadow-md box-border">
          <p className="text-15 font-PDSemibold text-[#7C838D]">소비 이유</p>
          <p className="mt-[8px] text-userBlack font-PDSemibold">
            {item.diary.reason}
          </p>
        </div>

        {/* 소비 일기 박스 */}
        <div className="mt-[8px] bg-white min-w-[371px] max-w-[371px] h-[173px] w-full rounded-15 p-[15px] shadow-md box-border">
          <p className="text-15 font-PDSemibold text-[#7C838D]">소비 일기</p>
          <p className="mt-[8px] text-userBlack font-PDSemibold">
            {item.diary.diary || "아직 작성된 일기가 없습니다."}
          </p>
        </div>

        {/* 수정하기 버튼 */}
        <button
          onClick={() => navigate(DIARYEDIT_PAGE_PATH, { state: { item } })}
          className="min-w-[371px] max-w-[371px] w-full h-[48px] rounded-lg bg-toss text-white text-16 flex items-center justify-center mt-[31px]"
        >
          <img src={Pencil} className="w-[25px] h-[24px]" />{" "}
          <p className="pl-[6px] font-PDRegular !text-[20px] text-white">
            수정하기
          </p>
        </button>
      </main>
    </div>
  );
};

export default DiaryPage;
