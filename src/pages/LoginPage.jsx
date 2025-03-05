import React, { useEffect, useState } from "react";
import { FormatPhoneNumber, FormatPassWord } from "../utils/FormatByAuth";
import { useNavigate } from "react-router-dom";
import { SIGNUP_PAGE_PATH } from "../constants/Paths";
import { api } from "../apis/api";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/user/login", {
        phoneNum: phone.replaceAll("-", ""),
        passWord,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setPhone("");
      setPassWord("");
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(FormatPhoneNumber(e.target.value));
  };

  const handlePassWordChange = (e) => {
    setPassWord(FormatPassWord(e.target.value));
  };

  const handleMoveToSignup = () => {
    navigate(SIGNUP_PAGE_PATH);
  };

  return (
    <div className="flex flex-col justify-center items-start h-full px-[34px]">
      <p className="mb-3">Logo</p>
      <input
        type="tel"
        placeholder="휴대폰 번호"
        value={phone}
        onChange={handlePhoneChange}
        maxLength={13}
        className="w-full h-[46px] mb-1.5 px-3 border-2 border-gray-200 rounded-15 font-PDRegular placeholder:font-PDRegular placeholder:text-15 focus:border-toss focus:bg-blue-50 focus:outline-none"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={passWord}
        onChange={handlePassWordChange}
        maxLength={6}
        className="w-full h-[46px] mb-7 px-3 border-2 border-gray-200 rounded-15 font-PDRegular placeholder:font-PDRegular placeholder:text-15 focus:border-toss focus:bg-blue-50 focus:outline-none"
      />
      <button
        onClick={handleLogin}
        className="w-full h-[46px] mb-1.5 rounded-15 bg-toss font-PDMedium text-white"
      >
        로그인
      </button>
      <button
        onClick={handleMoveToSignup}
        className="w-full h-[46px] rounded-15 bg-blue-50 font-PDMedium text-toss"
      >
        회원가입
      </button>
    </div>
  );
};

export default LoginPage;
