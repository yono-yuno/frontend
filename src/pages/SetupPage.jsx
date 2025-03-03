import React from "react";
import "../styles/style.css";
import "../styles/index.css";
import YunoWarning from "../assets/YunoWarning.png";
import GuideBook from "../assets/GuideBook.png";

const SetupPage = () => {
  // const [amount, setAmount] = useState("");
  // const [days, setDays] = useState("01");
  // const [hours, setHours] = useState("01");
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      {/* 유노 캐릭터 이미지 */}
      <div className="flex mt-[133px]">
        <img src={YunoWarning} className=" w-[229px] h-[143px]" />
      </div>
      {/* 안내 문구 */}
      <div className="flex mt-[18px] font-PDMedium leading-tight text-center t-20">
        <img src={GuideBook} className="w-[18px] h-[18px]" />
        <p className="text-toss pl-[4px]">
          결제할 때 적용될 옵션
          <span className="text-black">이니,</span>
        </p>
      </div>
      <div className="flex font-PDMedium leading-tight text-center t-20">
        <p className=" text-black">신중하게 선택해주세요!</p>
      </div>
    </div>
  );
};

export default SetupPage;
