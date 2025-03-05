import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ShopPage from "./pages/ShopPage";
import ItemPage from "./pages/ItemPage";
import SettingPage from "./pages/SettingPage";
import AlarmPage from "./pages/AlarmPage";

import {
  SIGNUP_PAGE_PATH,
  SHOP_PAGE_PATH,
  ITEM_PAGE_PATH,
  ALARM_PAGE_PATH,
  SETTING_PAGE_PATH,
  MAIN_PAGE_PATH,
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
    </Routes>
  );
}

export default App;
