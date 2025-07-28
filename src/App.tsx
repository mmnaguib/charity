import QuranViewer from "./Components/Quran/QuranViewer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SurahViewer from "./Components/Quran/SurahViewer";
import "./assets/main.css";
import Navbar from "./Components/Navbar/Navbar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/quran" element={<QuranViewer />} />
          <Route path="quran/:number" element={<SurahViewer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
