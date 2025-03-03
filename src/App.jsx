import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/SettingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default App;
