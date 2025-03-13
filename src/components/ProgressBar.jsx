import React, { useState, useEffect } from "react";

const ProgressBar = ({ totalTime, elapsedTime, askCount }) => {
  const initialProgress = (100 / 3) * askCount; // 첫 번째 칸이 채워진 상태 (1/3)
  const [progress, setProgress] = useState(initialProgress);
  const [remainingTime, setRemainingTime] = useState(
    (totalTime * 60) / 2 - elapsedTime
  ); // 남은 시간 (분 단위)
  const [days, setDays] = useState(Math.floor(remainingTime / 1440)); // 1일 = 1440분
  const [hours, setHours] = useState(Math.floor((remainingTime % 1440) / 60));
  const [minutes, setMinutes] = useState(Math.floor(remainingTime % 60));

  useEffect(() => {
    if (totalTime < 1 || totalTime > 71) return; // 최소 1시간, 최대 71시간 제한

    const updateProgress = () => {
      const elapsed = elapsedTime;
      const totalDuration = (totalTime * 60) / 2;

      //현재 경과 시간을 반영하여 게이지 업데이트
      console.log(elapsed, totalDuration);
      const newProgress = Math.min(
        (elapsed / totalDuration) * 100 * (1 / 3) + initialProgress,
        100
      );
      setProgress(newProgress);
      // 남은 시간을 "일/시간/분" 형식으로 변환
    };
    setDays(Math.floor(remainingTime / 1440)); // 1일 = 1440분
    setHours(Math.floor((remainingTime % 1440) / 60));
    setMinutes(Math.floor(remainingTime % 60));

    updateProgress(); // 초기 실행
    const interval = setInterval(updateProgress, 60 * 1000); // 1분마다 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [totalTime, elapsedTime]);

  return (
    <div className="flex flex-col mt-[21px] w-[173px] h-[69px]">
      <div className="relative w-[173px] h-[34px] bg-gray-200 rounded-full overflow-hidden">
        {/* 점선 추가 */}
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-between px-[33%] z-10"
          style={{ pointerEvents: "none" }}
        >
          <div className="border-r-2 border-dashed border-white h-full"></div>
          <div className="border-r-2 border-dashed border-white h-full"></div>
        </div>

        {/* 프로그레스 바 */}
        <div
          className="h-full bg-blue-500 transition-all duration-500 relative z-0"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 🏷️ 프로그레스 바 아래 텍스트 */}
      <p className="flex justify-center w-full mt-1 text-12 font-PDRegular text-black">
        {progress >= 100 ? (
          <>
            <span className="text-toss">게이지</span>가 모두 채워졌어요!
          </>
        ) : (
          <>
            {days > 0 && (
              <>
                <span className="text-toss">
                  {String(days).padStart(2, "0")}
                </span>
                <span className="text-black">일{"\u00A0"}</span>
              </>
            )}
            {hours > 0 && (
              <>
                <span className="text-toss">
                  {String(hours).padStart(2, "0")}
                </span>
                <span className="text-black">시간{"\u00A0"}</span>
              </>
            )}
            {minutes > 0 && (
              <>
                <span className="text-toss">
                  {String(minutes).padStart(2, "0")}
                </span>
                <span className="text-black">분{"\u00A0"}</span>
              </>
            )}
            남았어요!
          </>
        )}
      </p>
    </div>
  );
};

export default ProgressBar;
