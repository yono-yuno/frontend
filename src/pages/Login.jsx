import React, { useState } from "react";
import { FormatPhoneNumber, FormatNumber } from "../utils/FormatByAuth";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("휴대폰 번호:", phone);
    console.log("비밀번호:", password);
    setPhone("");
    setPassword("");
  };

  const handlePhoneChange = (e) => {
    setPhone(FormatPhoneNumber(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(FormatNumber(e.target.value));
  };

  return (
    <div className="flex flex-col justify-center items-start h-full px-[34px]">
      <p className="mb-3">Logo</p>
      <input
        type="tel"
        placeholder="휴대폰 번호"
        value={phone}
        onChange={handlePhoneChange}
        className="w-full h-[46px] mb-1.5 px-3 border-2 border-gray-100 rounded-15 placeholder:text-15 focus:border-toss focus:bg-blue-50 focus:outline-none"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={handlePasswordChange}
        maxLength={6}
        className="w-full h-[46px] mb-7 px-3 border-2 border-gray-100 rounded-15 placeholder:text-15 focus:border-toss focus:bg-blue-50 focus:outline-none"
      />
      <button
        onClick={handleLogin}
        className="w-full h-[46px] mb-1.5 rounded-15 bg-toss font-PDMedium text-white"
      >
        로그인
      </button>
      <button className="w-full h-[46px] rounded-15 bg-blue-50 font-PDMedium text-toss">
        회원가입
      </button>
    </div>
  );
};

export default Login;
