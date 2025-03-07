import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import Item from "../components/Item";
import Dropdown from "../components/Dropdown";
import SearchIcon from "../assets/SearchIcon.png";
import { MAIN_PAGE_PATH } from "../constants/Paths";

const itemList = [
  {
    id: "qwer1234",
    img: "https://picsum.photos/355/142",
    itemName: "[오늘만 특가] 어쩌구 싸다싸 상품 이름",
    discount: 10,
    price: 8400,
    itemStars: 4.5,
    reviewNum: 736,
  },
  {
    id: "asdf123456",
    img: "https://picsum.photos/355/142",
    itemName: "[오늘만 특가] 저쩌구 싸다싸 상품 이름",
    discount: 20,
    price: 10000,
    itemStars: 4.1,
    reviewNum: 48,
  },
  {
    id: "zsx6dfa5a515",
    img: "https://picsum.photos/355/142",
    itemName: "[오늘만 특가] 얼씨구 싸다싸 상품 이름",
    discount: 15,
    price: 14500,
    itemStars: 3.1,
    reviewNum: 1123,
  },
  {
    id: "erdtyyf86516a",
    img: "https://picsum.photos/355/142",
    itemName: "[오늘만 특가] 절씨구 싸다싸 상품 이름",
    discount: 34,
    price: 7500,
    itemStars: 4.7,
    reviewNum: 1136,
  },
  {
    id: "yi89tu6t45fdes",
    img: "https://picsum.photos/355/142",
    itemName: "[오늘만 특가] 크게 싸다싸 상품 이름",
    discount: 20,
    price: 7600,
    itemStars: 4.2,
    reviewNum: 56,
  },
];

const ShopPage = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(MAIN_PAGE_PATH);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <Header text="요노쇼핑" onClick={handleBackButton} />
      <main
        style={{ height: "calc(100% - 50px)" }}
        className="flex flex-col px-4 pt-7 w-full"
      >
        <div className="relative flex w-full px-2">
          <input
            type="text"
            placeholder="요노쇼핑 검색"
            className="w-full py-1.5 px-3 bg-background rounded-[10px] font-PDRegular placeholder:text-placeholder placeholder:font-PDRegular placeholder:text-16"
          />
          <img
            src={SearchIcon}
            alt="돋보기"
            className="absolute right-4 top-1.5 w-[25px] h-[25px]"
          />
        </div>
        <p className="flex-none px-2 py-4 font-PDRegular text-16">카테고리별</p>
        <CategoryList />
        <div className="flex-none px-2 text-15">
          <Dropdown />
        </div>
        <div
          className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-11`}
        >
          {itemList.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
