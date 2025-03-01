import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Ex from "./pages/Ex";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Ex" element={<Ex />} />
    </Routes>
  );
}

export default App;
