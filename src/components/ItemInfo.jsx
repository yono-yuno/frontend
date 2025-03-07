import React from "react";

const ItemInfo = (props) => {
  return (
    <div className="flex items-center justify-center w-[351px] h-[147px] gap-[9px] rounded-15">
      <img
        src={props.itemImg}
        className="w-[100px] h-[100px] border-[2px] border-background rounded-15 "
      />
      <div className="flex flex-col items-start justify-center gap-[8px] font-PDMedium text-16 leading-tight">
        <p>{props.brandName}</p>
        <p className="font-PDLight">
          {props.itemName.length > 24
            ? `${props.itemName.slice(0, 23)}...`
            : props.itemName}
        </p>
        <p className={`text-${props.priceColor}`}>
          {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </p>
      </div>
    </div>
  );
};

export default ItemInfo;
