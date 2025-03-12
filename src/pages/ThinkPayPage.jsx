import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import { MAIN_PAGE_PATH } from "../constants/Paths";
import { PAY_PAGE_PATH } from "../constants/Paths";
import Iteminfo from "../components/ItemInfo";
import ProgressBar from "../components/ProgressBar";
import SmallYuno from "../assets/SmallYuno.png";
import { api } from "../apis/api";

const SORT_MAP = {
  최신순: "latest",
  오래된순: "oldest",
  "가격 높은순": "highPrice",
  "가격 낮은순": "lowPrice",
};

const ThinkPayPage = () => {
  const navigate = useNavigate();
  const { userId, userName } = useParams();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [settingTime, setSettingTime] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cartRes, userRes] = await Promise.all([
        api.get(`/cart/all?userId=${userId}`),
        api.get(`/user?userId=${userId}`),
      ]);

      if (cartRes.data.isSuccess) {
        setCartItems(cartRes.data.cartList);
        console.log(cartRes.data.message);
      }
      if (userRes.data.isSuccess) {
        setSettingTime(userRes.data.userInfo.settingTime);
      }
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const [sort, setSort] = useState("latest");

  const handleBackButton = () => {
    navigate(
      MAIN_PAGE_PATH.replace(":userId", userId).replace(":userName", userName)
    );
  };
  const handleMoveToPayPage = (cartId) => {
    navigate(
      PAY_PAGE_PATH.replace(":userId", userId)
        .replace(":userName", userName)
        .replace(":cartId", cartId)
    );
  };

  // 🏷️ 결제 취소 버튼 클릭 시 해당 아이템 삭제
  const handleCancelPayment = () => {
    // setItemList(itemList.filter((item) => item.id !== id));
  };

  return (
    <div className="h-full w-full">
      {loading ? (
        ""
      ) : (
        <div className="flex flex-col h-full w-full bg-background">
          <Header text="생각 중인 소비" onClick={handleBackButton} />
          <div className="flex-none px-4 pt-3 text-15">
            <Dropdown
              selectedSort={sort}
              onChangeSort={(selected) => setSort(SORT_MAP[selected])}
            />
          </div>

          <main
            className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-11 px-2.5`}
          >
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="flex flex-col items-center bg-white mb-[10px] w-full h-auto rounded-15 p-[15px] shadow-mds"
              >
                <p className="mr-[225px] text-16 font-PDRegular">
                  {cartItems.createdAt}
                </p>
                <div className="mt-[10px]">
                  <Iteminfo
                    itemImg={item.itemInfo.itemImg}
                    brandName={item.itemInfo.brandName}
                    itemName={item.itemInfo.itemName}
                    price={item.itemInfo.price}
                  />
                </div>
                <div></div>
                <div className="flex justify-between items-center mt-[10px] w-full h-[51px]">
                  {((Number(settingTime.slice(0, 2)) * 24 +
                    Number(settingTime.slice(2, 4))) /
                    2) *
                    60 >
                  Number(settingTime.slice(0, 2)) * 24 * 60 +
                    Number(settingTime.slice(2, 4)) * 60 -
                    (Number(item.extraTime.slice(0, 2)) * 24 * 60 +
                      Number(item.extraTime.slice(3, 5)) * 60 +
                      Number(item.extraTime.slice(6, 8))) ? (
                    <div className="flex-1 ml-[16px]">
                      <ProgressBar
                        totalTime={
                          Number(settingTime.slice(0, 2)) * 24 +
                          Number(settingTime.slice(2, 4))
                        }
                        elapsedTime={
                          Number(settingTime.slice(0, 2)) * 24 * 60 +
                          Number(settingTime.slice(2, 4)) * 60 -
                          (Number(item.extraTime.slice(0, 2)) * 24 * 60 +
                            Number(item.extraTime.slice(3, 5)) * 60 +
                            Number(item.extraTime.slice(6, 8)))
                        }
                        askCount={2}
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleMoveToPayPage(item.cartId)}
                      className="flex items-center justify-center bg-toss rounded-15 w-[173px] h-[48px]  ml-[14px]"
                    >
                      <img
                        src={SmallYuno}
                        className="w-[23px] h-[27px] mr-[3px]"
                      />
                      <p className="pl-[6px] font-PDRegular !text-[18px] text-white">
                        결제로 이동
                      </p>
                    </button>
                  )}
                  <div className="mr-[17px]">
                    <button
                      onClick={() => handleCancelPayment(item.id)}
                      className="bg-[#FC6767] text-white font-PDRegular !text-[18px] rounded-15 w-[116px] h-[48px]"
                    >
                      결제 취소
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      )}
    </div>
  );
};

export default ThinkPayPage;
