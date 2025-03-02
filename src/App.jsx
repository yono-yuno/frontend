import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Ex from "./pages/Ex";
import WelcomPage from "./pages/WelcomPage";

function App() {
  return (
    <Routes>
      <Route path="/MainPage" element={<MainPage />} />
      <Route path="/Ex" element={<Ex />} />
      <Route path="/WelcomPage" element={<WelcomPage />} />
    </Routes>
  );
}

export default App;
