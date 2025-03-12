import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { DIARYEDIT_PAGE_PATH, PAYRECORD_PAGE_PATH } from "../constants/Paths";
import Iteminfo from "../components/ItemInfo";
import YellowStarIcon from "../assets/YellowStarIcon.png";
import GreyStarIcon from "../assets/GreyStarIcon.png";
import Pencil from "../assets/Pencil.png";
import { api } from "../apis/api";
const DiaryPage = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();
  const [diary, setDiary] = useState(null);
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

  const handleEdit = async () => {
    navigate(DIARYEDIT_PAGE_PATH.replace(":diaryId", diary.diaryId));
  };

  const handleBack = async () => {
    navigate(PAYRECORD_PAGE_PATH.replace(":userId", diary.userId));
  };

  return (
    <div className="flex flex-col h-full w-full bg-background items-center">
      <Header text="소비 일기" onClick={() => handleBack()} />
      <main className="flex flex-col items-center px-4 pt-7 w-full flex-grow overflow-y-auto">
        {/* 날짜 및 아이템 정보 박스 */}
        <div className="bg-white min-w-[371px] max-w-[371px] w-full rounded-15 p-[15px] shadow-md box-border">
          {isLoading ? (
            <p className="text-[16px] font-PDRegular text-black">로딩 중...</p>
          ) : (
            <>
              <p className="text-[16px] font-PDRegular text-black">
                {diary.createdAt.slice(2, 10).replace(/-/g, ".")}
              </p>
              <div className="mt-[10px]">
                <Iteminfo
                  itemImg={diary.itemInfo.itemImg}
                  brandName={diary.itemInfo.brandName}
                  itemName={diary.itemInfo.itemName}
                  price={diary.itemInfo.price}
                />
              </div>
            </>
          )}
        </div>

        {/* 별점 박스 */}
        <div className="mt-[25px] bg-white min-w-[371px] max-w-[371px] h-[75px] rounded-15 p-[15px] shadow-md box-border flex justify-center items-center">
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
        </div>

        {/* 소비 이유 박스 */}
        <div className="mt-[8px] bg-white min-w-[371px] max-w-[371px] w-full rounded-15 p-[15px] shadow-md box-border">
          {isLoading ? (
            <>
              <p className="text-[15px] font-PDSemibold text-[#7C838D]">
                로딩 중 ...
              </p>
              <p className="mt-[8px] text-userBlack font-PDSemibold">
                {diary?.firstReview}
              </p>
            </>
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

        {/* 소비 일기 박스 */}
        <div className="mt-[8px] bg-white min-w-[371px] max-w-[371px] h-[173px] w-full rounded-15 p-[15px] shadow-md box-border">
          <p className="text-[15px] font-PDSemibold text-[#7C838D]">
            소비 일기
          </p>
          <p className="mt-[8px] text-userBlack font-PDSemibold">
            {isLoading
              ? "로딩 중..."
              : diary?.detailDiary || "아직 작성된 일기가 없습니다."}
          </p>
        </div>

        {/* 수정하기 버튼 */}
        <button
          onClick={() => handleEdit()}
          className="min-w-[371px] max-w-[371px] w-full h-[48px] rounded-lg bg-toss text-white text-16 flex items-center justify-center mt-[31px]"
        >
          <img src={Pencil} className="w-[25px] h-[24px]" />
          <p className="pl-[6px] font-PDRegular !text-[20px] text-white">
            수정하기
          </p>
        </button>
      </main>
    </div>
  );
};

export default DiaryPage;
