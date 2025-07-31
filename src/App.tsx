import QuranViewer from "./Components/Quran/QuranViewer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SurahViewer from "./Components/Quran/SurahViewer";
import "./assets/main.css";
import Navbar from "./Components/Navbar/Navbar";
import Azkar from "./Components/Azkar/Azkar";
import Hadiths from "./Components/Hadith/Hadiths";
import Home from "./Components/Home/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/quran" element={<QuranViewer />} />
          <Route path="quran/:number" element={<SurahViewer />} />
          <Route path="/azkars" element={<Azkar />} />
          <Route path="/hadiths" element={<Hadiths />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
