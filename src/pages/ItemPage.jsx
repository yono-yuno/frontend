import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import YellowStarIcon from "../assets/YellowStarIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import { SHOP_PAGE_PATH } from "../constants/Paths";
import { api } from "../apis/api";

const ItemPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const getItem = async () => {
    try {
      const res = await api.get(`/item?itemId=${itemId}`);
      if (res.data.isSuccess) {
        setItem(res.data.itemInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItem();
  }, [itemId]);

  const handleBackButton = () => {
    navigate(SHOP_PAGE_PATH);
  };

  if (!item) {
    return <div>Loading...</div>; // item이 없으면 로딩 중 표시
  }

  return (
    <div className="flex flex-col h-full relative">
      <Header onClick={handleBackButton} />
      <div
        className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden mt-3 my-40`}
      >
        <img src={item.itemImg} alt="상품 대표 이미지" />
        <div className="px-4 py-2">
          <p className="text-xs text-gray-400 font-PDMedium">
            {item.brandName}
          </p>
          <p className="text-15 py-1 leading-tight font-PDMedium">
            {item.itemName}
          </p>
          <p className="text-sm text-gray-300 line-through font-PDMedium">
            {item.price.toLocaleString()}원
          </p>
          <div className="flex justify-start items-end">
            <p className="mr-1 text-xl font-PDSemibold text-rose-500">
              {item.discount}%
            </p>
            <p className="mr-1 text-xl font-PDSemibold text-black">
              {Math.round(
                item.price / (1 - item.discount / 100)
              ).toLocaleString()}
              원
            </p>
          </div>
          <div className="flex justify-start items-center">
            <p className="p-1 mr-2 bg-background rounded-md text-[10px] font-PDMedium">
              무료배송
            </p>
          </div>
          <div className="flex justify-start items-center pt-1">
            <img src={YellowStarIcon} alt="별" className="mr-1 h-3 w-3" />
            <p className="mr-2 text-xs font-PDMedium">{item.itemStars}</p>
            <p className="text-xs text-gray-500 font-PDMedium underline">
              리뷰 {item.reviewNum}개
            </p>
          </div>
        </div>
        <img src={item.contentImg} alt="상품 상세 이미지" className="py-4" />
      </div>
      <div className="absolute bottom-0 flex justify-center items-center h-40 w-full bg-gradient-to-b from-transparent to-white from-10% to-25%">
        <Button text="구매하기" />
      </div>
    </div>
  );
};

export default ItemPage;
