import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import {
  LOGIN_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  SHOP_PAGE_PATH,
} from "./constants/Paths";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path={LOGIN_PAGE_PATH} element={<Login />} />
      <Route path={SIGNUP_PAGE_PATH} element={<Signup />} />

      <Route path={SHOP_PAGE_PATH} element={<Shop />} />
    </Routes>
  );
}

export default App;
