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
import ElectronicsCategoryIcon from "../assets/ElectronicsCategoryIcon.png";
import { api } from "../apis/api";

const PayRecordPage = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [itemInfoList, setItemInfoList] = useState([]);
  const [diaryData, setDiaryData] = useState([]);

  const navigate = useNavigate();

  const [selectedCategory, setSeletedCategory] = useState("전체");

  const getDiaryList = async (userId, category) => {
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

  const handleGoToDiary = (item) => {
    navigate(DIARY_PAGE_PATH, { state: { item } });
  };

  const handleGoToDiaryEdit = (item) => {
    navigate(DIARYEDIT_PAGE_PATH);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-y-auto">
      {/* ✅ 헤더 (상단 여백 유지) */}
      <div className="bg-background w-full">
        <Header text="결제 기록" onClick={() => navigate(MAIN_PAGE_PATH)} />
      </div>

      {/* ✅ 카테고리 리스트 (헤더와 간격 추가) */}
      <div className="bg-background w-full pl-[22px] mt-[27px]">
        <CategoryList
          selectedCategory={selectedCategory}
          onChangeCategory={setSeletedCategory}
        />
      </div>

      {/* ✅ 메인 콘텐츠 영역 (스크롤 가능) */}
      <main className="flex flex-col px-[10px] pt-[20px] w-full flex-grow">
        {diaryData.map((diary) => (
          <div
            key={diary.diaryId}
            className="flex flex-col items-center bg-white mt-[10px] w-[371px] h-auto rounded-15 p-[15px] shadow-mds"
          >
            <p className="mr-[225px] text-16 font-PDRegular">25.02.20 09:17</p>
            <div className="mt-[10px]">
              <ItemInfo
                itemImg={diary.itemInfo.itemImg}
                brandName={diary.itemInfo.brandName}
                itemName={diary.itemInfo.itemName}
                price={diary.itemInfo.price}
              />
            </div>

            <div className="flex justify-center mt-[21px]">
              <button
                className={`w-[149px] h-[48px] rounded-15 text-18 font-PDRegular ${
                  diary.detailDiary !== null
                    ? "bg-[#F3F4F6] text-button"
                    : "bg-extraButton text-toss"
                }`}
                disabled={diary.detailDiary !== null}
                onClick={() => handleGoToDiaryEdit(diary)}
              >
                {diary.detailDiary !== null ? "일기 작성 완료" : "일기 작성"}
              </button>

              <button
                className="w-[149px] h-[48px] bg-toss text-white ml-[18px] rounded-15 text-18 font-PDRegular"
                onClick={() => handleGoToDiary(diary)}
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
