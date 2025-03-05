import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import YellowStarIcon from "../assets/YellowStarIcon.png";

const ItemPage = () => {
  return (
    <div className="flex flex-col h-full relative">
      <Header />
      <div
        className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden mt-3`}
      >
        <img src="https://picsum.photos/393/350" alt="상품 이미지" />
        <div className="px-4 py-2">
          <p className="text-xs text-gray-400 font-PDMedium">시루조아</p>
          <p className="text-15 py-1 leading-tight font-PDMedium">
            시루조아 우리쌀 카스테라 호박 인절미 외 BEST 떡 모음전
          </p>
          <p className="text-sm text-gray-300 line-through font-PDMedium">
            16,500원
          </p>
          <div className="flex justify-start items-end">
            <p className="mr-1 text-xl font-PDSemibold text-rose-500">20%</p>
            <p className="mr-1 text-xl font-PDSemibold text-black">11,500원</p>
          </div>
          <div className="flex justify-start items-center">
            <p className="p-1 mr-2 bg-background rounded-md text-[10px] font-PDMedium">
              무료배송
            </p>
          </div>
          <div className="flex justify-start items-center pt-1">
            <img src={YellowStarIcon} alt="별" className="mr-1 h-3 w-3" />
            <p className="mr-2 text-xs font-PDMedium">4.7</p>
            <p className="text-xs text-gray-500 font-PDMedium underline">
              리뷰 736개
            </p>
          </div>
        </div>
        <img
          src="https://picsum.photos/393/2533"
          alt="상품 이미지"
          className="py-4"
        />
      </div>
      <div className="absolute bottom-0 flex justify-center items-center h-40 w-full bg-gradient-to-b from-transparent to-white from-10% to-25%">
        <Button text="구매하기" />
      </div>
    </div>
  );
};

export default ItemPage;
