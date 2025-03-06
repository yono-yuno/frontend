import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import YunoWarning from "../assets/YunoWarning.png";
import GuideBook from "../assets/GuideBook.png";
import MoneyIcon from "../assets/MoneyIcon.png";
import TimeIcon from "../assets/TimeIcon.png";
import { useNavigate } from "react-router-dom";
import { SETUPCOMPLETE_PAGE_PATH } from "../constants/Paths";

const dayOptions = [
  { id: 0, name: "00" },
  { id: 1, name: "01" },
  { id: 2, name: "02" },
];

const hourOptions = [];
for (let i = 0; i < 24; i++) {
  hourOptions.push({ id: i, name: String(i).padStart(2, "0") });
}

const SetupPage = () => {
  const navigate = useNavigate();
  const handleMoveToSetupCompletePage = () => {
    navigate(SETUPCOMPLETE_PAGE_PATH);
  };
  const [amount, setAmount] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedDayOption, setSelectedDayOption] = useState(dayOptions[0]);
  const [selectedHourOption, setSelectedHourOption] = useState(hourOptions[0]);
  const [isOpen, setIsOpen] = useState(false); // 팝업 상태 추가

  // 포커스 핸들러
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleTogglePopup = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      {/* 유노 캐릭터 이미지 */}
      <div className="flex mt-[133px]">
        <button onClick={handleTogglePopup}>
          <img src={YunoWarning} className=" w-[229px] h-[143px]" />
        </button>
      </div>
      {/* 안내 문구 */}
      <div className="flex mt-[18px] font-PDMedium leading-tight text-center text-20">
        <button onClick={handleTogglePopup}>
          <img src={GuideBook} className="w-[18px] h-[18px]" />
        </button>
        <p className="text-toss pl-[4px]">
          결제할 때 적용될 옵션
          <span className="text-black">이니,</span>
        </p>
      </div>
      <div className="flex font-PDMedium leading-tight text-center text-20">
        <p className=" text-black">신중하게 선택해주세요!</p>
      </div>
      {/* 상한액 설정 */}
      <div className="mt-[34px] mr-[17px] w-[311px] h-[66px]">
        <label className=" font-PDMedium leading-tight text-16 text-toss">
          상한액
        </label>
        <div className="flex items-center mt-[1px]">
          <div className="flex items-center w-[288px] h-[46px] rounded-15 border-2 border-[#ECEEEF] bg-background focus-within:border-toss focus-within:bg-extraButton">
            <input
              className={`w-full ml-[13px] leading-tight font-PDRegular placeholder:text-20 bg-background outline-none focus-within:bg-extraButton focus-within:outline-none
                ${
                  isFocused
                    ? "text-toss text-20 font-PDMedium"
                    : "text-black text-20 font-PDMedium"
                }`}
              type="number"
              placeholder="금액을 입력해주세요"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <span className="text-black pl-[5px] font-PDMedium text-20">원</span>
        </div>
      </div>
      {/* 고민 시간 설정 */}
      <div className="mt-[27px] w-[328px] h-[66px]">
        <label className="font-PDMedium leading-tight text-16 text-toss">
          전체 고민 시간
        </label>
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <Listbox value={selectedDayOption} onChange={setSelectedDayOption}>
              {({ open }) => (
                <div>
                  <Listbox.Button
                    className={`w-[122px] h-[46px] rounded-15 pl-[5px] border-[2px] font-PDMedium text-left text-24 text-black  ${
                      open
                        ? "border-toss bg-[#F6F9FF] text-toss"
                        : "border-[#ECEEEF] bg-background"
                    } focus:outline-none `}
                  >
                    {selectedDayOption.name}
                  </Listbox.Button>

                  <Listbox.Options className="absolute w-[122px] h-[138px] bg-background border-[2px] border-[#ECEEEF] rounded-15">
                    {dayOptions.map((option) => (
                      <Listbox.Option
                        key={option.id}
                        value={option}
                        className={`pl-[5px] pt-[7px] pb-[7px] font-PDRegular ${
                          option.name == "02" ? "border-none" : "border-b-[1px]"
                        } text-24 text-black leading-tight hover:bg-background`}
                      >
                        {option.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              )}
            </Listbox>
            <p className="font-PDMedium text-20 text-black">일</p>
          </div>
          <div className="flex flex-row items-center ml-[17px]">
            <Listbox
              value={selectedHourOption}
              onChange={setSelectedHourOption}
            >
              {({ open }) => (
                <div className="relative">
                  <Listbox.Button
                    className={`w-[122px] h-[46px] rounded-15 pl-[5px] border-[2px] font-PDMedium text-left text-24 text-black  ${
                      open
                        ? "border-toss bg-[#F6F9FF] text-toss"
                        : "border-[#ECEEEF] bg-background"
                    } focus:outline-none `}
                  >
                    {selectedHourOption.name}
                  </Listbox.Button>

                  <Listbox.Options className="absolute overflow-y-scroll w-[122px] h-[160px] bg-background border-[2px] border-[#ECEEEF] rounded-15">
                    {hourOptions.map((option) => (
                      <Listbox.Option
                        key={option.id}
                        value={option}
                        className={`pl-[5px] pt-[7px] pb-[7px] font-PDRegular ${
                          option.name == "59" ? "border-none" : "border-b-[1px]"
                        } text-24 text-black leading-tight hover:bg-background`}
                      >
                        {option.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              )}
            </Listbox>
            <p className="font-PDMedium text-20 text-black">시간</p>
          </div>
        </div>
      </div>

      {/* 완료 버튼 */}
      <button
        className="mt-[155px] w-[351px] h-[59px] rounded-15 bg-toss"
        onClick={handleMoveToSetupCompletePage}
      >
        <p className="font-PDMedium text-20 text-white">완료하기</p>
      </button>

      {/* 팝업 (모달) */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
          {/* 애니메이션 적용된 팝업 */}
          <motion.div
            initial={{ y: [100], opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: [100], opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-10 translate-y-[-50%] flex flex-col w-[383px] h-[333px] bg-white rounded-15 shadow-lg"
          >
            <p className="mt-[20px] font-PDMedium text-black text-[22px] text-center">
              결제할 때 적용될 옵션이란?
            </p>
            <div className="flex mt-[18px] ml-[10px] font-PDMedium leading-tight">
              <img src={MoneyIcon} className="w-[74px] h-[70px]" />
              <div className="mt-[4px] ml-[10px]">
                <p className="text-[#999999] text-[16px] ">상한액</p>
                <p className="text-[17px]">상한액 이상의 결제는</p>
                <p className="text-[17px]">
                  유노와 고민할 시간을 가질 수 있어요.
                </p>
              </div>
            </div>
            <div className="flex mt-[21px] ml-[16px] font-PDMedium leading-tight">
              <img src={TimeIcon} className="w-[69px] h-[70px]" />
              <div className="mt-[4px] ml-[10px]">
                <p className="text-[#999999] text-[16px] ">전체 고민 시간</p>
                <p className="text-[17px]">총 두번의 고민이 있었고</p>
                <p className="text-[17px]">
                  한 번 고민할 때 옵션의 반씩 고민해요.
                </p>
              </div>
            </div>

            {/* 확인 버튼 */}
            <button
              className="mt-[20px] ml-[16px] w-[351px] h-[59px] rounded-15 bg-toss text-white font-PDMedium text-20"
              onClick={handleTogglePopup}
            >
              확인
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SetupPage;
