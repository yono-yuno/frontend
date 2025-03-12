import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { PAYRECORD_PAGE_PATH } from "../constants/Paths";
import Iteminfo from "../components/ItemInfo";
import YellowStarIcon from "../assets/YellowStarIcon.png";
import GreyStarIcon from "../assets/GreyStarIcon.png";
import Paper from "../assets/Paper.png";
import { api } from "../apis/api";

const DiaryEditPage = () => {
  const { diaryId } = useParams();
  const [diary, setDiary] = useState(null);
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [isFullyEntered, setIsFullyEntered] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const getDiary = async () => {
    setLoading(true);
    try {
      const diaryRes = await api.get(`/diary?diaryId=${diaryId}`);
      if (diaryRes.data.isSuccess) {
        setDiary(diaryRes.data.DiaryInfo);
      }
    } catch (error) {
      console.error("Error fetching diary:", error);
    } finally {
      setLoading(false);
    }
  };

  //diaryId 바뀔때마다 불러오기
  useEffect(() => {
    if (diaryId) getDiary();
  }, [diaryId]);

  const isFull = () => {
    if (diary?.detailDiary != null && diary?.consumerStars !== 0) {
      setIsFullyEntered(true);
    }
  };

  useEffect(() => {
    isFull();
  }, [diary]);

  // ✅ 소비 일기 글자 수 제한 (최대 200자)
  const handleChange = (e) => {
    const newDetailDiary = e.target.value;
    if (newDetailDiary.length <= 200) {
      setDiary((prevDiary) => ({
        ...prevDiary,
        detailDiary: newDetailDiary,
      }));
    }
  };

  // ✅ 등록 후 PayRecord 페이지로 이동
  const handleSave = async () => {
    try {
      const response = await api.put("/diary", {
        diaryId: diary.diaryId,
        consumerStars: diary.consumerStars,
        detailDiary: diary.detailDiary,
      });
      console.log("업데이트 성공:", response.data);
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
    navigate(PAYRECORD_PAGE_PATH.replace(":userId", diary.userId));
  };

  return (
    <div className="flex flex-col h-full w-full bg-background items-center">
      <Header text="일기 수정" onClick={() => navigate(-1)} />
      <main className="flex flex-col items-center px-4 pt-7 w-full flex-grow overflow-y-auto">
        {/* 날짜 및 아이템 정보 박스 */}
        <div className="bg-white w-[371px] rounded-15 p-[15px] shadow-md box-border">
          {isLoading ? (
            <p className="text-[16px] font-PDRegular text-black">로딩 중...</p>
          ) : diary ? (
            <>
              <p className="text-[16px] font-PDRegular text-black">
                {diary.createdAt.slice(2, 10).replace(/-/g, ".")}
              </p>
              {diary.itemInfo && (
                <div className="mt-[10px]">
                  <Iteminfo
                    itemImg={diary.itemInfo.itemImg}
                    brandName={diary.itemInfo.brandName}
                    itemName={diary.itemInfo.itemName}
                    price={diary.itemInfo.price}
                  />
                </div>
              )}
            </>
          ) : (
            <p className="text-[16px] font-PDRegular text-black">Loading...</p>
          )}
        </div>

        {/* 별점 박스 */}
        <div className="mt-[25px] bg-extraButton min-w-[371px] max-w-[371px] h-[75px] rounded-15 p-[15px] shadow-md box-border flex justify-center items-center">
          {isLoading ? (
            <p className="text-[16px] font-PDRegular text-black">로딩 중...</p>
          ) : (
            <div className="flex gap-[17px]">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < (diary?.consumerStars ?? 0)
                      ? YellowStarIcon
                      : GreyStarIcon
                  }
                  alt="star"
                  className="w-[35px] h-[31px] cursor-pointer"
                  onClick={() =>
                    setDiary((diary) => ({
                      ...diary,
                      consumerStars: index + 1,
                    }))
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* 소비 이유 (수정 불가능한 회색 텍스트) */}
        {/* 소비 이유 */}
        <div className="mt-[8px] bg-white min-w-[371px] max-w-[371px] w-full rounded-15 p-[15px] shadow-md box-border">
          {isLoading ? (
            <p className="text-[15px] font-PDSemibold text-[#7C838D]">
              로딩 중...
            </p>
          ) : (
            <>
              <p className="text-[15px] font-PDSemibold text-[#7C838D]">
                소비 이유
              </p>
              <p className="mt-[8px] text-button font-PDSemibold">
                {diary?.firstReview || "소비 이유 없음"}
              </p>
            </>
          )}
        </div>

        {/* ✅ 소비 일기 (76자 제한, 포커스 시 테두리 표시) */}
        <div
          className={`mt-[8px] min-w-[371px] max-w-[371px] h-[173px] rounded-15 p-[15px] shadow-md transition-all flex flex-col justify-start bg-extraButton ${
            isFocused ? "border border-toss" : ""
          }`}
        >
          {isLoading ? (
            <p className="text-[15px] font-PDSemibold text-[#7C838D]">
              로딩 중...
            </p>
          ) : (
            <>
              <p className="text-[15px] font-PDSemibold text-[#7C838D]">
                소비 일기
              </p>
              <textarea
                className="w-full mt-[8px] bg-extraButton text-userBlack font-PDSemibold border-none outline-none resize-none h-[100px]"
                placeholder="소비 일기를 입력하세요."
                value={diary?.detailDiary || null}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={200} // ✅ 글자 수 제한
              />
              <p className="text-right text-[#7C838D] text-sm mt-1">
                {diary?.detailDiary?.length || 0} / 200
              </p>
            </>
          )}
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={() => handleSave()}
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
