import React from "react";

const Item = (props) => {
  return (
    <div className="flex flex-col mb-3">
      <img src={props.img} alt="상품 사진" className="rounded-xl" />
      <p className="py-2 text-15 font-PDMedium leading-tight">
        {props.itemName}
      </p>
      <div className="flex justify-start items-end">
        <p className="mr-1 text-xl font-PDSemibold text-rose-600">
          {props.discount}%
        </p>
        <p className="mr-1 text-xl font-PDBold text-black">
          {props.price.toLocaleString()}원
        </p>
        <p className="text-sm font-PDMedium text-gray-400 line-through">
          {Math.round(
            props.price / (1 - props.discount / 100)
          ).toLocaleString()}
          원
        </p>
      </div>
      <div className="flex justify-start items-center">
        <p className="p-1 mr-2 bg-gray-100 rounded-md text-[10px] font-PDMedium">
          무료배송
        </p>
        <img src="https://picsum.photos/12/12" alt="별" className="mr-1" />
        <p className="mr-2 text-xs font-PDMedium">{props.itemStars}</p>
        <p className="text-xs text-gray-500 font-PDMedium underline">
          리뷰 {props.reviewNum.toLocaleString()}개
        </p>
      </div>
    </div>
  );
};

export default Item;
