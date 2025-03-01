import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Ex from "./pages/Ex";
import Greeting from "./pages/Greeting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Ex" element={<Ex />} />
      <Route path="/Greeting" element={<Greeting />} />
    </Routes>
  );
}

export default App;
