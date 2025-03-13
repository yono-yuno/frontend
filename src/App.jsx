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
import DiaryEditPage from "./pages/DiaryEditPage";
import PayPage from "./pages/PayPage";
import PaidPage from "./pages/PaidPage";
import WelcomePage from "./pages/WelcomePage";
import SetupPage from "./pages/SetupPage";
import SetupCompletePage from "./pages/SetupCompletePage";
import PayFromItemPage from "./pages/PayFromItemPage";

import {
  SIGNUP_PAGE_PATH,
  SHOP_PAGE_PATH,
  ITEM_PAGE_PATH,
  ALARM_PAGE_PATH,
  SETTING_PAGE_PATH,
  WELCOME_PAGE_PATH,
  SETUP_PAGE_PATH,
  SETUPCOMPLETE_PAGE_PATH,
  MAIN_PAGE_PATH,
  THINKPAY_PAGE_PATH,
  PAYRECORD_PAGE_PATH,
  DIARY_PAGE_PATH,
  DIARYEDIT_PAGE_PATH,
  PAY_PAGE_FROM_CART_PATH,
  PAY_PAGE_FROM_ITEM_PATH,
  PAID_PAGE_PATH,
} from "./constants/Paths";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path={MAIN_PAGE_PATH} element={<MainPage />} />
      <Route path={SIGNUP_PAGE_PATH} element={<SignupPage />} />

      <Route path={SHOP_PAGE_PATH} element={<ShopPage />} />
      <Route path={ITEM_PAGE_PATH} element={<ItemPage />} />
      <Route path={SETTING_PAGE_PATH} element={<SettingPage />} />
      <Route path={ALARM_PAGE_PATH} element={<AlarmPage />} />

      <Route path={THINKPAY_PAGE_PATH} element={<ThinkPayPage />} />
      <Route path={PAYRECORD_PAGE_PATH} element={<PayRecordPage />} />
      <Route path={DIARY_PAGE_PATH} element={<DiaryPage />} />
      <Route path={DIARYEDIT_PAGE_PATH} element={<DiaryEditPage />} />

      <Route path={PAY_PAGE_FROM_CART_PATH} element={<PayPage />} />
      <Route path={PAY_PAGE_FROM_ITEM_PATH} element={<PayFromItemPage />} />
      <Route path={PAID_PAGE_PATH} element={<PaidPage />} />

      <Route path={WELCOME_PAGE_PATH} element={<WelcomePage />} />
      <Route path={SETUP_PAGE_PATH} element={<SetupPage />} />
      <Route path={SETUPCOMPLETE_PAGE_PATH} element={<SetupCompletePage />} />
    </Routes>
  );
}

export default App;
