import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { PAYRECORD_PAGE_PATH } from "../constants/Paths";
import Iteminfo from "../components/ItemInfo";
import ElectronicsCategoryIcon from "../assets/ElectronicsCategoryIcon.png";
import YellowStarIcon from "../assets/YellowStarIcon.png";
import GreyStarIcon from "../assets/GreyStarIcon.png";

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

  const [diaryData, setDiaryData] = useState(item.diary);
  const [isSaved, setIsSaved] = useState(false);

  // ✅ 기존 데이터가 존재하는지 확인 (일기가 이미 작성된 경우)
  const hasExistingData =
    item.diary.reason.trim() &&
    item.diary.diary.trim() &&
    item.diary.rating > 0;

  // ✅ 모든 값이 입력되었는지 확인 (작성 완료 여부)
  const isFullyEntered =
    diaryData.reason.trim() && diaryData.diary.trim() && diaryData.rating > 0;

  // ✅ 변경 핸들러 (입력된 값 변경)
  const handleChange = (field, value) => {
    setDiaryData({ ...diaryData, [field]: value });
  };

  // ✅ 저장 및 결제 기록 페이지로 이동
  const handleSave = () => {
    if (!isFullyEntered) return;

    localStorage.setItem(`diary-${item.id}`, JSON.stringify(diaryData));
    setIsSaved(true);
  };

  useEffect(() => {
    if (isSaved) {
      navigate(PAYRECORD_PAGE_PATH);
    }
  }, [isSaved, navigate]);

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <Header text="소비 일기" onClick={() => navigate(PAYRECORD_PAGE_PATH)} />
      <main className="flex flex-col px-4 pt-7 w-full h-[calc(100vh-50px)] overflow-y-auto">
        <div className="bg-white w-[371px] h-auto rounded-15 p-[15px] shadow-md">
          <p className="text-16 font-PDRegular">25.02.20 09:17</p>
          <div className="mt-[10px]">
            <Iteminfo
              itemImg={item.itemImg}
              brandName={item.brandName}
              itemName={item.itemName}
              price={item.price}
            />
          </div>

          {/* 별점 */}
          <div className="flex items-center mt-4">
            <p className="text-16 font-bold">소비 이유</p>
          </div>
          <div className="flex mt-2">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => handleChange("rating", index + 1)}
              >
                <img
                  src={index < diaryData.rating ? YellowStarIcon : GreyStarIcon}
                  alt="star"
                  className="w-[24px] h-[24px]"
                />
              </span>
            ))}
          </div>

          {/* ✅ 소비 이유 (수정 불가능 + 회색 처리) */}
          <div className="w-full mt-3 p-2 border rounded-md bg-gray-100 text-gray-500">
            {diaryData.reason}
          </div>

          {/* 소비 일기 입력 */}
          <textarea
            className="w-full mt-3 p-2 border rounded-md"
            placeholder="소비 일기를 입력하세요."
            value={diaryData.diary}
            onChange={(e) => handleChange("diary", e.target.value)}
          />

          {/* ✅ 버튼 (작성하기 & 수정하기 모두 동일한 로직 적용) */}
          <button
            onClick={handleSave}
            className={`w-full h-[48px] rounded-lg text-white text-16 flex items-center justify-center ${
              isFullyEntered ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isFullyEntered}
          >
            {hasExistingData ? "✏️ 수정하기" : "✏️ 작성하기"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default DiaryPage;
