import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import {
  FormatPhoneNumber,
  FormatPassWord,
  FormatAccount,
} from "../utils/FormatByAuth";
import { api } from "../apis/api";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState("");
  const [passWord, setPassWord] = useState("");
  const [rePassWord, setRePassWord] = useState("");
  const [isTerms, setIsTerms] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(
      name !== "" &&
        phone.length === 13 &&
        account !== "" &&
        passWord.length === 6 &&
        passWord === rePassWord &&
        isTerms &&
        isPrivacy
    );
  }, [name, phone, account, passWord, rePassWord, isTerms, isPrivacy]);

  const handlePhoneChange = (e) => {
    setPhone(FormatPhoneNumber(e.target.value));
  };

  const handlePassWordChange = (e) => {
    setPassWord(FormatPassWord(e.target.value));
  };

  const handleRePassWordChange = (e) => {
    setRePassWord(FormatPassWord(e.target.value));
  };

  const handleAccountChange = (e) => {
    setAccount(FormatAccount(e.target.value));
  };

  const navigate = useNavigate();

  const handleMoveToLogin = async () => {
    try {
      const res = await api.post("/user/signup", {
        userName: name,
        phoneNum: phone.replaceAll("-", ""),
        accountNum: account,
        passWord,
      });
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Header text={"회원가입"} onClick={handleMoveToLogin} />
      <div className="flex flex-col justify-between items-center px-[34px] pb-[43px] pt-[38px] h-full">
        <div className="flex flex-col justify-center items-start w-full">
          <label className="text-toss font-PDMedium">이름</label>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[46px] mb-3 px-3 border-2 border-gray-200 bg-gray-100 rounded-15 font-PDRegular placeholder:font-PDRegular placeholder:text-15 focus:border-toss focus:bg-blue-50 focus:outline-none"
          />
          <label className="text-toss font-PDMedium">휴대폰 번호</label>
          <input
            type="tel"
            placeholder="휴대폰 번호를 입력해주세요"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={13}
            className="w-full h-[46px] mb-3 px-3 border-2 border-gray-200 bg-gray-100 rounded-15 font-PDRegular placeholder:font-PDRegular placeholder:text-15 focus:border-toss focus:bg-blue-50 focus:outline-none"
          />
          <label className="text-toss font-PDMedium">연동 계좌</label>
          <input
            type="tel"
            placeholder="계좌번호를 입력해주세요"
            value={account}
            onChange={handleAccountChange}
            className="w-full h-[46px] mb-3 px-3 border-2 border-gray-200 bg-gray-100 rounded-15 font-PDRegular placeholder:font-PDRegular placeholder:text-15 focus:border-toss focus:bg-blue-50 focus:outline-none"
          />
          <label className="text-toss font-PDMedium">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 6자리를 입력해주세요"
            value={passWord}
            onChange={handlePassWordChange}
            maxLength={6}
            className="w-full h-[46px] mb-3 px-3 border-2 border-gray-200 bg-gray-100 rounded-15 font-PDRegular placeholder:font-PDRegular placeholder:text-15 focus:border-toss focus:bg-blue-50 focus:outline-none"
          />
          <label className="text-toss font-PDMedium">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            value={rePassWord}
            onChange={handleRePassWordChange}
            maxLength={6}
            className="w-full h-[46px] mb-3 px-3 border-2 border-gray-200 bg-gray-100 rounded-15 font-PDRegular placeholder:font-PDRegular placeholder:text-15 focus:border-toss focus:bg-blue-50 focus:outline-none"
          />
        </div>
        <div>
          <div className="flex justify-start items-center mb-2.5">
            <input
              type="checkbox"
              checked={isTerms}
              onChange={() => setIsTerms(!isTerms)}
            />
            <label className="font-PDLight text-12">
              &nbsp; (필수){" "}
              <span className="font-PDMedium text-toss underline">
                서비스 이용 약관
              </span>
              에 동의합니다.
            </label>
          </div>
          <div className="flex justify-start items-center mb-2.5">
            <input
              type="checkbox"
              checked={isPrivacy}
              onChange={() => setIsPrivacy(!isPrivacy)}
            />
            <label className="font-PDLight text-12">
              &nbsp; (필수){" "}
              <span className="font-PDMedium text-toss underline">
                개인정보 수집/이용
              </span>
              에 동의합니다.
            </label>
          </div>
          <Button text="확인" onClick={handleMoveToLogin} disabled={!isValid} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
