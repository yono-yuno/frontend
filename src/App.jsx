import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ShopPage from "./pages/ShopPage";
import ItemPage from "./pages/ItemPage";
import SettingPage from "./pages/SettingPage";
import AlarmPage from "./pages/AlarmPage";
import WelcomePage from "./pages/WelcomePage";
import SetupPage from "./pages/SetupPage";
import SetupCompletePage from "./pages/SetupCompletePage";

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
        
      <Route path={WELCOME_PAGE_PATH} element={<WelcomePage />} />
      <Route path={SETUP_PAGE_PATH} element={<SetupPage />} />
      <Route path={SETUPCOMPLETE_PAGE_PATH} element={<SetupCompletePage />} />
    </Routes>
  );
}

export default App;
