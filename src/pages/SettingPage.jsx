import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import Header from "../components/Header";
import Profile from "../assets/Profile.png";
import SettingDropUp from "../assets/SettingDropUp.png";
import SettingDropDown from "../assets/SettingDropDown.png";

const dayOptions = [
  { id: 0, name: "00" },
  { id: 1, name: "01" },
  { id: 2, name: "02" },
];

const hourOptions = [];
for (let i = 0; i < 24; i++) {
  hourOptions.push({ id: i, name: String(i).padStart(2, "0") });
}

const SettingPage = () => {
  const [overpriceSetting, setOverpriceSetting] = useState(false);
  const [alarmSetting, setAlarmSetting] = useState(false);
  const [selectedDayOption, setSelectedDayOption] = useState(dayOptions[0]);
  const [selectedHourOption, setSelectedHourOption] = useState(hourOptions[0]);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/");
  };

  const overpriceClick = () => {
    setOverpriceSetting(!overpriceSetting);
    setAlarmSetting(false);
  };
  const alarmClick = () => {
    setAlarmSetting(!alarmSetting);
    setOverpriceSetting(false);
  };

  return (
    <div className="w-full h-full bg-background">
      <Header onClick={handleBackButton} text={"설정"} />
      <div className="flex flex-col items-center mt-[20px]">
        <div className="flex flex-row items-center w-width h-[125px] p-[30px] mb-[15px] rounded-t-[20px] bg-white">
          <img src={Profile} className="w-[65px] h-[65px] mr-[9px]" />
          <div>
            <p className="font-PDRegular text-15 leading-tight text-black">
              홍길동
            </p>
            <p className="mt-[2px] font-PDRegular text-[13px] leading-tight text-button">
              010-1234-1234
            </p>
          </div>
        </div>
        <div>
          {overpriceSetting === false ? (
            <div className="flex justify-between items-center w-width h-[67px] bg-white">
              <button
                onClick={overpriceClick}
                className="flex justify-between items-center w-width"
              >
                <p className=" ml-[24px] font-PDRegular text-16 text-black">
                  상한액 설정하기
                </p>
                <img
                  src={SettingDropUp}
                  className="w-[10px] h-[19px] mr-[24px]"
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-start items-between w-width h-[178px] bg-extraButton">
              <button onClick={overpriceClick} className="flex justify-between">
                <p className="mt-[21px]  ml-[24px] font-PDRegular text-16 text-toss">
                  상한액 설정하기
                </p>
                <img
                  src={SettingDropDown}
                  className="w-[19px] h-[10px] mr-[24px] mt-[27px]"
                />
              </button>
              <div className="flex flex-col items-center justify-start h-[111px] mt-[20px]">
                <div className="flex justify-start w-[320px]">
                  <p className="font-PDMedium text-16 text-[#B4B6B8]">상한액</p>
                </div>
                <div className="flex justify-between w-[320px] h-[46px]">
                  <div className="flex items-center">
                    <input
                      type="number"
                      placeholder="1,000,000"
                      className="w-[200px] h-[46px] rounded-15 bg-white border-[2px] border-[#ECEEEF] font-PDMedium text-20 pl-[14px] text-black placeholder:text-[#B4B6B8] focus:outline-none focus:bg-[#F6F9FF] focus:border-toss focus:text-toss"
                    />
                    <p className="pl-[5px] font-PDMedium text-20 text-black">
                      원
                    </p>
                  </div>

                  <button className="w-[76px] h-[46px] rounded-15 bg-toss font-PDRegular text-[18px] text-white">
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {alarmSetting === false ? (
            <div className="flex justify-between items-center w-width h-[67px] bg-white">
              <button
                onClick={alarmClick}
                className="flex justify-between items-center w-width"
              >
                <p className="ml-[24px] font-PDRegular text-16 text-black">
                  알림 간격 설정하기
                </p>

                <img
                  src={SettingDropUp}
                  className="w-[10px] h-[19px] mr-[24px]"
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-start items-between w-width h-[178px] bg-extraButton">
              <button onClick={alarmClick} className="flex justify-between">
                <p className="mt-[21px]  ml-[24px] font-PDRegular text-16 text-toss">
                  알림 간격 설정하기
                </p>
                <button>
                  <img
                    src={SettingDropDown}
                    className="w-[19px] h-[10px] mr-[24px] mt-[27px]"
                  />
                </button>
              </button>
              <div className="flex flex-col items-center justify-start h-[111px] mt-[20px]">
                <div className="flex justify-start w-[320px]">
                  <p className="font-PDMedium text-16 text-[#B4B6B8]">
                    전체 고민 시간
                  </p>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-row items-center">
                    <Listbox
                      value={selectedDayOption}
                      onChange={setSelectedDayOption}
                    >
                      {({ open }) => (
                        <div>
                          <Listbox.Button
                            className={`w-[74px] h-[46px] rounded-15 pl-[5px] border-[2px] font-PDMedium text-left text-24 text-black  ${
                              open
                                ? "border-toss bg-[#F6F9FF] text-toss"
                                : "border-[#ECEEEF] bg-white"
                            } focus:outline-none `}
                          >
                            {selectedDayOption.name}
                          </Listbox.Button>

                          <Listbox.Options className="absolute w-[122px] h-[138px] bg-white border-[2px] border-[#ECEEEF] rounded-15">
                            {dayOptions.map((option) => (
                              <Listbox.Option
                                key={option.id}
                                value={option}
                                className={`pl-[5px] pt-[7px] pb-[7px] font-PDRegular ${
                                  option.name == "02"
                                    ? "border-none"
                                    : "border-b-[1px]"
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
                            className={`w-[74px] h-[46px] rounded-15 pl-[5px] border-[2px] font-PDMedium text-left text-24 text-black  ${
                              open
                                ? "border-toss bg-[#F6F9FF] text-toss"
                                : "border-[#ECEEEF] bg-white"
                            } focus:outline-none `}
                          >
                            {selectedHourOption.name}
                          </Listbox.Button>

                          <Listbox.Options className="absolute overflow-y-scroll w-[122px] h-[160px] bg-white border-[2px] border-[#ECEEEF] rounded-15">
                            {hourOptions.map((option) => (
                              <Listbox.Option
                                key={option.id}
                                value={option}
                                className={`pl-[5px] pt-[7px] pb-[7px] font-PDRegular ${
                                  option.name == "59"
                                    ? "border-none"
                                    : "border-b-[1px]"
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
                  <button className="w-[76px] h-[46px] ml-[23px] rounded-15 bg-toss font-PDRegular text-[18px] text-white">
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="flex justify-start items-center w-width h-[67px] bg-white">
          <p className="ml-[24px] font-PDMedium text-16 text-[#E24F4F]">
            로그아웃
          </p>
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
