import React, { useState, useEffect } from "react";

const ProgressBar = ({ totalTime, elapsedTime }) => {
  const initialProgress = 100 / 3; // 첫 번째 칸이 채워진 상태 (1/3)
  const [progress, setProgress] = useState(initialProgress);
  const [remainingTime, setRemainingTime] = useState(
    (totalTime - elapsedTime) * 60
  ); // 남은 시간 (분 단위)

  useEffect(() => {
    if (totalTime < 1 || totalTime > 47) return; // 최소 1시간, 최대 47시간 제한

    const startTime = Date.now() - elapsedTime * 60 * 1000; // 경과 시간 반영
    const endTime = startTime + totalTime * 60 * 60 * 1000; // 종료 시간 계산

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const totalDuration = endTime - startTime;

      // 현재 경과 시간을 반영하여 게이지 업데이트
      const newProgress = Math.min(
        (elapsed / totalDuration) * (100 - initialProgress) + initialProgress,
        100
      );
      setProgress(newProgress);

      // 남은 시간 계산 (분 단위)
      const remainingMinutes = Math.max(
        (endTime - currentTime) / (1000 * 60),
        0
      );
      setRemainingTime(Math.floor(remainingMinutes));
    };

    updateProgress(); // 초기 실행
    const interval = setInterval(updateProgress, 60 * 1000); // 1분마다 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [totalTime, elapsedTime]);

  // 남은 시간을 "일/시간/분" 형식으로 변환
  const days = Math.floor(remainingTime / 1440); // 1일 = 1440분
  const hours = Math.floor((remainingTime % 1440) / 60);
  const minutes = remainingTime % 60;

  return (
    <div className="flex flex-col mt-[21px] ml-[26px]">
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
          className="h-full bg-blue-500 rounded-full transition-all duration-500 relative z-0"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-1 text-xs font-semibold text-gray-600">
        {days > 0 && `${String(days).padStart(2, "0")}일 `}
        {String(hours).padStart(2, "0")}시간 {String(minutes).padStart(2, "0")}
        분 남았어요!
      </p>
    </div>
  );
};

export default ProgressBar;
