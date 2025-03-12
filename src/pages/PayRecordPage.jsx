import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import {
  MAIN_PAGE_PATH,
  DIARY_PAGE_PATH,
  DIARYEDIT_PAGE_PATH,
} from "../constants/Paths";
import ItemInfo from "../components/ItemInfo";
import { api } from "../apis/api";

const PayRecordPage = () => {
  const { userId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [diaryData, setDiaryData] = useState([]);

  const navigate = useNavigate();

  const [selectedCategory, setSeletedCategory] = useState("전체");

  const getDiaryList = async (userId, category) => {
    setLoading(true);
    try {
      const diaryRes = await api.get(
        `/diary/all?userId=${userId}&category=${category}`
      );
      if (diaryRes.data.isSuccess) {
        setDiaryData(diaryRes.data.diaryList);
      }
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
    } finally {
      setLoading(false); //모든 요청이 끝난 후 로딩 해제
    }
  };

  useEffect(() => {
    getDiaryList(userId, selectedCategory);
  }, [userId, selectedCategory]);

  const handleGoToDiary = (diary) => {
    navigate(DIARY_PAGE_PATH.replace(":diaryId", diary.diaryId));
  };

  const handleGoToDiaryEdit = (diary) => {
    navigate(DIARYEDIT_PAGE_PATH.replace(":diaryId", diary.diaryId));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-y-auto">
      {/* ✅ 헤더 */}
      <div className="bg-background w-full">
        <Header text="결제 기록" onClick={() => navigate(MAIN_PAGE_PATH)} />
      </div>

      {/* ✅ 카테고리 리스트 */}
      <div className="bg-background w-full pl-[22px] mt-[27px]">
        <CategoryList
          selectedCategory={selectedCategory}
          onChangeCategory={setSeletedCategory}
        />
      </div>

      {/* ✅ 메인 콘텐츠 영역 */}
      <main className="flex flex-col px-[10px] pt-[20px] w-full flex-grow">
        {isLoading ? (
          <p className="text-[16px] font-PDRegular text-black">로딩 중...</p>
        ) : (
          diaryData.map((diary) => (
            <div
              key={diary.diaryId}
              className="flex flex-col items-center bg-white mt-[10px] w-[371px] h-auto rounded-15 p-[15px] shadow-mds"
            >
              <div className="mt-[10px]">
                <ItemInfo
                  itemImg={diary.itemInfo.itemImg}
                  brandName={diary.itemInfo.brandName}
                  itemName={diary.itemInfo.itemName}
                  price={diary.itemInfo.price}
                />
              </div>

              {/* ✅ 버튼 영역 */}
              <div className="flex justify-center mt-[21px]">
                <button
                  className={`w-[149px] h-[48px] rounded-15 text-18 font-PDRegular ${
                    diary.detailDiary && diary.detailDiary.trim() !== ""
                      ? "bg-[#F3F4F6] text-button"
                      : "bg-extraButton text-toss"
                  }`}
                  disabled={
                    !diary.detailDiary || diary.detailDiary.trim() === ""
                  }
                  onClick={() => handleGoToDiaryEdit(diary)}
                >
                  {diary.detailDiary && diary.detailDiary.trim() !== ""
                    ? "일기 작성 완료"
                    : "일기 작성"}
                </button>

                <button
                  className="w-[149px] h-[48px] bg-toss text-white ml-[18px] rounded-15 text-18 font-PDRegular"
                  onClick={() => handleGoToDiary(diary)}
                >
                  소비 일기
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default PayRecordPage;
