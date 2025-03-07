import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ReviewAlarm from "../components/ReviewAlarm";
import PayAlarm from "../components/PayAlarm";
import { MAIN_PAGE_PATH } from "../constants/Paths";

const AlarmPage = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(MAIN_PAGE_PATH);
  };

  return (
    <div className="w-full h-full bg-background">
      <Header onClick={handleBackButton} text={"알림"} />
      <main className="flex flex-col items-center mt-[20px]">
        <ReviewAlarm
          time={"25.02.24 15:17"}
          title={
            "Mashal WOBURN3 블루투스 스피커이지만 사실은 스피커가 아닌 마이크지롱"
          }
        />
        <PayAlarm
          time={"25.02.24 15:17"}
          title={"Mashal WOBURN3 블루투스 스피커"}
        />
      </main>
    </div>
  );
};

export default AlarmPage;
