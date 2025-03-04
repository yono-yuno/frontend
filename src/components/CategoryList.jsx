import React, { useState } from "react";
import Category from "./Category";

const categoryDataList = [
  "전체",
  "식품",
  "생활",
  "전자제품",
  "뷰티",
  "의류",
  "여행/취미",
  "스포츠",
  "도서",
  "출산/육아",
  "인테리어",
];

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  return (
    <div
      className={`flex overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden`}
    >
      {categoryDataList.map((category) => (
        <Category
          key={category}
          img="https://picsum.photos/30/30"
          text={category}
          isSelected={selectedCategory === category}
          onClick={() => setSelectedCategory(category)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
