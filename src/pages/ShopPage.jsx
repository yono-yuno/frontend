import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import Item from "../components/Item";
import Dropdown from "../components/Dropdown";
import SearchIcon from "../assets/SearchIcon.png";
import { MAIN_PAGE_PATH, ITEM_PAGE_PATH } from "../constants/Paths";
import { api } from "../apis/api";

const SORT_MAP = {
  최신순: "latest",
  오래된순: "oldest",
  "가격 높은순": "highPrice",
  "가격 낮은순": "lowPrice",
};

const ShopPage = () => {
  const navigate = useNavigate();
  const { userId, userName } = useParams();
  const [itemList, setItemList] = useState([]);
  const [category, setCategory] = useState("전체");
  const [sort, setSort] = useState("latest");

  const getItemList = async (selectedCategory, selectedSort) => {
    try {
      const res = await api.get(
        `/item/${selectedCategory}?sort=${selectedSort}`
      );
      if (res.data.isSuccess) {
        setItemList(
          res.data.itemList.map((item) => ({
            id: item.itemId,
            img: item.itemImg,
            itemName: item.itemName,
            discount: item.discount,
            price: item.price,
            itemStars: item.itemStars,
            reviewNum: item.reviewNum,
          }))
        );
      } else {
        console.error(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItemList(category, sort);
  }, [category, sort]);

  const handleBackButton = () => {
    navigate(
      MAIN_PAGE_PATH.replace(":userId", userId).replace(":userName", userName)
    );
  };

  const handleItemClick = (itemId) => {
    navigate(ITEM_PAGE_PATH.replace(":itemId", itemId));
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
        <CategoryList
          selectedCategory={category}
          onChangeCategory={setCategory}
        />
        <div className="flex-none px-2 text-15">
          <Dropdown
            selectedSort={sort}
            onChangeSort={(selected) => setSort(SORT_MAP[selected])}
          />
        </div>
        <div
          className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-11`}
        >
          {itemList.map((item) => (
            <div key={item.id} onClick={() => handleItemClick(item.id)}>
              <Item {...item} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
