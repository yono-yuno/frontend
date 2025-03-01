import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
const MainPage = () => {
  return (
    <>
      <Header text={"알림"} />
      <div className="hover:bg-extraButton hover:ring-toss hover:ring-2 mx-auto my-10 w-width text-15 bg-background ring-2 ring-button text-red text-center font-PDBold rounded-15">
        MainPage
      </div>
      <Button text={"확인"} />
    </>
  );
};
export default MainPage;
