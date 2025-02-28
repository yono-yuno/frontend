import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Setting from "./pages/Setting";
import PayHistory from "./pages/PayHistory";
import Thinking from "./pages/Thinking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/payHistory" element={<PayHistory />} />
      <Route path="/Thinking" element={<Thinking />} />
    </Routes>
  );
}

export default App;
