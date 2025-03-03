import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { LOGIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "./constants/Paths";
import WelcomPage from "./pages/WelcomPage";
import SetupPage from "./pages/SetupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path={LOGIN_PAGE_PATH} element={<Login />} />
      <Route path={SIGNUP_PAGE_PATH} element={<Signup />} />
      <Route path="/WelcomPage" element={<WelcomPage />} />
      <Route path="/SetupPage" element={<SetupPage />} />
    </Routes>
  );
}

export default App;
