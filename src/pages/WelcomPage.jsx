import React from "react";
import "../styles/style.css";
import "../styles/index.css";
import YunoFlower from "../assets/YunoFlower.png";
const WelcomPage = () => {
  return (
    <div className="flex justify-center bg-background mb-[34px]">
      <yuno className="flex mt-[84px]">
        <img
          src={YunoFlower}
          className=" flex justify-center w-[323px] h-[275px] "
        />
      </yuno>
      <div className="flex justify-center mt-[52px] ">
        <p className="flex p-0 leading-tight">홍길동님</p>
      </div>{" "}
    </div>
  );
};

export default WelcomPage;
