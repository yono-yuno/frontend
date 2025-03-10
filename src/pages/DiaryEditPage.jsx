import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { PAYRECORD_PAGE_PATH } from "../constants/Paths";
import Iteminfo from "../components/ItemInfo";
import ElectronicsCategoryIcon from "../assets/ElectronicsCategoryIcon.png";
import YellowStarIcon from "../assets/YellowStarIcon.png";
import GreyStarIcon from "../assets/GreyStarIcon.png";
import Paper from "../assets/Paper.png";

const DiaryEditPage = () => {
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

  const [diaryData, setDiaryData] = useState(item.diary);
  const [isFocused, setIsFocused] = useState(false);
  const isFullyEntered = diaryData.diary.trim() !== "" && diaryData.rating > 0;

  // ✅ 소비 일기 글자 수 제한 (최대 200자)
  const handleChange = (e) => {
    if (e.target.value.length <= 200) {
      setDiaryData({ ...diaryData, diary: e.target.value });
    }
  };

  // ✅ 등록 후 PayRecord 페이지로 이동
  const handleSave = () => {
    if (!isFullyEntered) return;
    navigate(PAYRECORD_PAGE_PATH);
  };

  return (
    <div className="flex flex-col h-full w-full bg-background items-center">
      <Header text="일기 수정" onClick={() => navigate(-1)} />
      <main className="flex flex-col items-center px-4 pt-7 w-full flex-grow overflow-y-auto">
        {/* 날짜 및 아이템 정보 박스 */}
        <div className="bg-white w-[371px] rounded-15 p-[15px] shadow-md box-border">
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
                src={index < diaryData.rating ? YellowStarIcon : GreyStarIcon}
                alt="star"
                className="w-[35px] h-[31px] cursor-pointer"
                onClick={() =>
                  setDiaryData({ ...diaryData, rating: index + 1 })
                }
              />
            ))}
          </div>
        </div>

        {/* 소비 이유 (수정 불가능한 회색 텍스트) */}
        <div className="mt-[8px] bg-white min-w-[371px] max-w-[371px] w-full rounded-15 p-[15px] shadow-md box-border">
          <p className="text-15 font-PDSemibold text-[#7C838D]">소비 이유</p>
          <p className="mt-[8px] text-button font-PDSemibold">
            {diaryData.reason}
          </p>
        </div>

        {/* ✅ 소비 일기 (76자 제한, 포커스 시 테두리 표시) */}
        <div
          className={`mt-[8px] min-w-[371px] max-w-[371px] h-[173px] rounded-15 p-[15px] shadow-md transition-all flex flex-col justify-start bg-extraButton ${
            isFocused ? "border border-toss" : ""
          }`}
        >
          <p className="text-15 font-PDSemibold text-[#7C838D]">소비 일기</p>
          <textarea
            className="w-full mt-[8px] bg-extraButton text-userBlack font-PDSemibold border-none outline-none resize-none h-[100px]"
            placeholder="소비 일기를 입력하세요."
            value={diaryData.diary}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={200} // ✅ 글자 수 제한
          />
          <p className="text-right text-[#7C838D] text-sm mt-1">
            {diaryData.diary.length} / 200
          </p>
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={handleSave}
          className={`w-[371px] h-[48px] rounded-lg text-white text-16 flex items-center justify-center mt-5 ${
            isFullyEntered ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!isFullyEntered}
        >
          <img src={Paper} className="w-[19px] h-[22px]" />{" "}
          <p className="pl-[6px] font-PDRegular !text-[20px] text-white">
            등록하기
          </p>
        </button>
      </main>
    </div>
  );
};

export default DiaryEditPage;
