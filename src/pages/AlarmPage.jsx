import React from "react";
import Header from "../components/Header";
import ReviewAlarm from "../components/ReviewAlarm";
import PayAlarm from "../components/PayAlarm";

const AlarmPage = () => {
  return (
    <div className="w-[393px] h-[795px] bg-background">
      <Header text={"알림"} />
      <main className="flex flex-col items-center mt-[20px]">
        <ReviewAlarm
          time={"25.02.24 15:17"}
          title={"Mashal WOBURN3 블루투스 스피커"}
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
