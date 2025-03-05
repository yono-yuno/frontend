import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ShopPage from "./pages/ShopPage";
import ItemPage from "./pages/ItemPage";
import {
  LOGIN_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  SHOP_PAGE_PATH,
  ITEM_PAGE_PATH,
} from "./constants/Paths";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path={LOGIN_PAGE_PATH} element={<LoginPage />} />
      <Route path={SIGNUP_PAGE_PATH} element={<SignupPage />} />

      <Route path={SHOP_PAGE_PATH} element={<ShopPage />} />
      <Route path={ITEM_PAGE_PATH} element={<ItemPage />} />
    </Routes>
  );
}

export default App;
