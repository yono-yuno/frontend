import React, { useState } from "react";
import Category from "./Category";
import AllCategoryIcon from "../assets/AllCategoryIcon.png";
import FoodCategoryIcon from "../assets/FoodCategoryIcon.png";
import LifeCategoryIcon from "../assets/LifeCategoryIcon.png";
import ElectronicsCategoryIcon from "../assets/ElectronicsCategoryIcon.png";
import BeautyCategoryIcon from "../assets/BeautyCategoryIcon.png";
import ClothesCategoryIcon from "../assets/ClothesCategoryIcon.png";
import HobbyCategoryIcon from "../assets/HobbyCategoryIcon.png";
import SportCategoryIcon from "../assets/SportCategoryIcon.png";
import BookCategoryIcon from "../assets/BookCategoryIcon.png";
import BabyCategoryIcon from "../assets/BabyCategoryIcon.png";
import InteriorCategoryIcon from "../assets/InteriorCategoryIcon.png";

const categoryDataList = [
  { id: 1, title: "전체", icon: AllCategoryIcon },
  { id: 2, title: "식품", icon: FoodCategoryIcon },
  { id: 3, title: "생활", icon: LifeCategoryIcon },
  { id: 4, title: "전자제품", icon: ElectronicsCategoryIcon },
  { id: 5, title: "뷰티", icon: BeautyCategoryIcon },
  { id: 6, title: "의류", icon: ClothesCategoryIcon },
  { id: 7, title: "여행/취미", icon: HobbyCategoryIcon },
  { id: 8, title: "스포츠", icon: SportCategoryIcon },
  { id: 9, title: "도서", icon: BookCategoryIcon },
  { id: 10, title: "출산/육아", icon: BabyCategoryIcon },
  { id: 11, title: "인테리어", icon: InteriorCategoryIcon },
];

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(categoryDataList[0]);

  return (
    <div
      className={`flex overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden`}
    >
      {categoryDataList.map((category) => (
        <Category
          key={category.id}
          img={category.icon}
          text={category.title}
          isSelected={selectedCategory === category}
          onClick={() => setSelectedCategory(category)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
