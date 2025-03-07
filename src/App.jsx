import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ShopPage from "./pages/ShopPage";
import ItemPage from "./pages/ItemPage";
import SettingPage from "./pages/SettingPage";
import AlarmPage from "./pages/AlarmPage";
import ThinkPayPage from "./pages/ThinkPayPage";
import PayRecordPage from "./pages/PayRecordPage";
import DiaryPage from "./pages/DiaryPage";
import PayPage from "./pages/PayPage";

import {
  SIGNUP_PAGE_PATH,
  SHOP_PAGE_PATH,
  ITEM_PAGE_PATH,
  ALARM_PAGE_PATH,
  SETTING_PAGE_PATH,
  MAIN_PAGE_PATH,
  THINKPAY_PAGE_PATH,
  PAYRECORD_PAGE_PATH,
  DIARY_PAGE_PATH,
  PAY_PAGE_PATH,
} from "./constants/Paths";

function App() {
  return (
    <Routes>
      <Route path={MAIN_PAGE_PATH} element={<MainPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path={SIGNUP_PAGE_PATH} element={<SignupPage />} />

      <Route path={SHOP_PAGE_PATH} element={<ShopPage />} />
      <Route path={ITEM_PAGE_PATH} element={<ItemPage />} />
      <Route path={SETTING_PAGE_PATH} element={<SettingPage />} />
      <Route path={ALARM_PAGE_PATH} element={<AlarmPage />} />

      <Route path={THINKPAY_PAGE_PATH} element={<ThinkPayPage />} />
      <Route path={PAYRECORD_PAGE_PATH} element={<PayRecordPage />} />
      <Route path={DIARY_PAGE_PATH} element={<DiaryPage />} />

      <Route path={PAY_PAGE_PATH} element={<PayPage />} />
    </Routes>
  );
}

export default App;
