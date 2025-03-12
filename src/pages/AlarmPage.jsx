import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ReviewAlarm from "../components/ReviewAlarm";
import PayAlarm from "../components/PayAlarm";
import { MAIN_PAGE_PATH } from "../constants/Paths";
import { api } from "../apis/api";

const AlarmPage = () => {
  const navigate = useNavigate();
  const { userId, userName } = useParams();
  const [loading, setLoading] = useState(true);
  const [alarmData, setAlarmData] = useState([]);

  const handleBackButton = () => {
    navigate(
      MAIN_PAGE_PATH.replace(":userId", userId).replace(":userName", userName)
    );
  };

  const fetchData = async () => {
    setLoading(true); // 🔹 로딩 시작

    try {
      const [alarmRes] = await Promise.all([
        api.get(`/alarm?userId=${userId}`),
      ]);

      if (alarmRes.data.isSuccess) {
        setAlarmData(alarmRes.data.alarmList);
      }
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
    } finally {
      setLoading(false); // 🔹 모든 요청이 끝난 후 로딩 해제
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateAlarm = async (alarmId) => {
    try {
      const response = await api.put("/alarm", {
        alarmId: alarmId,
      });
      console.log("업데이트 성공:", response.data);
      fetchData();
      navigate(
        MAIN_PAGE_PATH.replace(":userId", userId).replace(":userName", userName)
      );
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  return (
    <div className="w-full h-full bg-background overflow-y-auto">
      <Header onClick={handleBackButton} text={"알림"} />
      <main className="flex flex-col items-center mt-[20px]">
        {alarmData.map((data, index) =>
          data.nextPageName == "diary" ? (
            <ReviewAlarm
              onClick={() => updateAlarm(data.alarmId)}
              key={index}
              time={data.alarmTime.replace("/", " ")}
              title={data.itemName}
              color={index == 0 ? "extraButton" : "white"}
            />
          ) : (
            <PayAlarm
              onClick={() => updateAlarm(data.alarmId)}
              key={index}
              time={data.alarmTime.replace("/", " ")}
              title={data.itemName}
              color={index == 0 ? "extraButton" : "white"}
            />
          )
        )}
      </main>
      <div className="h-[50px]"></div>
    </div>
  );
};

export default AlarmPage;
