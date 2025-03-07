import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WelcomePage from "./pages/WelcomePage";
import SetupPage from "./pages/SetupPage";
import SetupCompletePage from "./pages/SetupCompletePage";
import {
  LOGIN_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  WELCOME_PAGE_PATH,
  SETUP_PAGE_PATH,
  SETUPCOMPLETE_PAGE_PATH,
  MAIN_PAGE_PATH,
} from "./constants/Paths";

function App() {
  return (
    <Routes>
      <Route path={MAIN_PAGE_PATH} element={<MainPage />} />
      <Route path={LOGIN_PAGE_PATH} element={<Login />} />
      <Route path={SIGNUP_PAGE_PATH} element={<Signup />} />
      <Route path={WELCOME_PAGE_PATH} element={<WelcomePage />} />
      <Route path={SETUP_PAGE_PATH} element={<SetupPage />} />
      <Route path={SETUPCOMPLETE_PAGE_PATH} element={<SetupCompletePage />} />
    </Routes>
  );
}

export default App;
