import React from "react";

export const FormatPhoneNumber = (value) => {
  const onlyNums = value.replace(/[^0-9]/g, "");

  if (onlyNums.length <= 3) {
    return onlyNums;
  }

  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  }

  // prettier-ignore
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
};

export const FormatNumber = (value) => {
  return value.replace(/[^0-9]/g, "").slice(0, 6);
};
