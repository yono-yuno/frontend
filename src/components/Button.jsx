import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className="flex justify-center items-center mx-auto w-buttonWidth h-buttonHeight rounded-15 bg-toss font-PDMedium text-white text-20 disabled:bg-background"
    >
      {props.text}
    </button>
  );
};

export default Button;
