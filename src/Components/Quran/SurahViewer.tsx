import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuranApi from "../../services/quranApi";
import { IAyah } from "../../interface";
import { SurahHeader } from "./SurahHeader";

const SurahViewer = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [ayahs, setAyahs] = useState<IAyah[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [name, setName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [place, setPlace] = useState("");
  const [surahAyahNumbers, setSurahAyahNumbers] = useState(0);

  const getSurah = async (surahNumber: number) => {
    const res = await QuranApi.getSurahContent(surahNumber);
    const ayahList = res.data.data.ayahs;
    const start = ayahList[0].page;
    const end = ayahList[ayahList.length - 1].page;

    setStartPage(start);
    setEndPage(end);
    setCurrentPage(start);

    setName(res.data.data.name);
    setEnglishName(res.data.data.englishName);
    setPlace(res.data.data.revelationType);
    setSurahAyahNumbers(res.data.data.numberOfAyahs);
  };

  const getPageAyahs = async (page: number) => {
    try {
      const res = await QuranApi.getSurahByPage(page);
      const filtered = res.data.data.ayahs.filter(
        (ayah: { surah: { number: number } }) =>
          ayah.surah.number === Number(number)
      );
      setAyahs(filtered);
    } catch {
      setAyahs([]);
    }
  };

  useEffect(() => {
    getSurah(Number(number));
  }, [number]);

  useEffect(() => {
    getPageAyahs(currentPage);
  }, [currentPage, number]);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= endPage) {
      setCurrentPage(nextPage);
    } else if (Number(number) < 114) {
      navigate(`/quran/${Number(number) + 1}`);
    }
  };

  const handlePrevious = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= startPage) {
      setCurrentPage(prevPage);
    } else if (Number(number) > 1) {
      navigate(`/quran/${Number(number) - 1}`);
    }
  };

  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Touch (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    setEndX(currentX);
    const distance = currentX - (startX || 0);
    const angle = Math.max(-90, Math.min(90, distance / 2));
    setRotation(-angle);
  };

  const handleTouchEnd = () => {
    if (startX !== null && endX !== null) {
      const distance = endX - startX;
      if (distance > 50) handleNext(); // ⬅️ swipe right → go forward
      else if (distance < -50) handlePrevious(); // ➡️ swipe left → go back
    }
    setStartX(null);
    setEndX(null);
    setRotation(0);
  };

  // Mouse (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const distance = e.clientX - (startX || 0);
      const angle = Math.max(-90, Math.min(90, distance / 2));
      setRotation(-angle);
      setEndX(e.clientX);
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      const distance = (endX || 0) - (startX || 0);
      if (distance > 50) handleNext();
      else if (distance < -50) handlePrevious();

      setStartX(null);
      setEndX(null);
      setIsDragging(false);
      setRotation(0);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, endX]);

  return (
    <div>
      <SurahHeader
        name={name}
        enName={englishName}
        surahNumbers={surahAyahNumbers}
        place={place === "Meccan" ? "مكية" : "مدنية"}
        positionFrom={startPage}
        positionTo={endPage}
      />

      <div
        className="page-container"
        dir="rtl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{
          width: "90%",
          margin: "20px auto",
          background: "#fff",
          padding: "25px",
          border: "1px solid #ccc",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          transform: `rotateY(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.5s ease-in-out",
          transformOrigin: "center right",
          perspective: "1500px",
          userSelect: "none",
          minHeight: "300px",
          lineHeight: "2.2",
          fontSize: "1.4em",
          cursor: "grab",
        }}
      >
        {ayahs.length > 0 ? (
          <p>
            {ayahs.map((ayah) => (
              <span key={ayah.number}>
                <span>{ayah.text} </span>
                <span className="numberInSurah">{ayah.numberInSurah}</span>{" "}
              </span>
            ))}
          </p>
        ) : (
          <p>لا توجد آيات في هذه الصفحة.</p>
        )}
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === startPage && Number(number) === 1}
        >
          ◀ الصفحة السابقة
        </button>
        <span style={{ margin: "0 20px" }}>الصفحة {currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === endPage && Number(number) === 114}
        >
          الصفحة التالية ▶
        </button>
      </div>
    </div>
  );
};

export default SurahViewer;
