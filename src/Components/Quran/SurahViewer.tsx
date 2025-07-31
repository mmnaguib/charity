import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuranApi from "../../services/quranApi";
import { IAyah } from "../../interface";
import { SurahHeader } from "./SurahHeader";
import Loading from "../Loading";

const SurahViewer = () => {
  const { number } = useParams();
  const navigate = useNavigate();

  const [ayahsBySurah, setAyahsBySurah] = useState<Record<number, IAyah[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [name, setName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [place, setPlace] = useState("");
  const [surahAyahNumbers, setSurahAyahNumbers] = useState(0);
  const [pageNumber, setPageNumber] = useState("");

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
      const grouped = res.data.data.ayahs.reduce(
        (acc: Record<number, IAyah[]>, ayah: IAyah) => {
          const surahNum = ayah.surah.number;
          if (!acc[surahNum]) acc[surahNum] = [];
          acc[surahNum].push(ayah);
          return acc;
        },
        {}
      );
      setAyahsBySurah(grouped);
    } catch {
      setAyahsBySurah({});
    }
  };

  useEffect(() => {
    getSurah(Number(number));
  }, [number]);

  useEffect(() => {
    getPageAyahs(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= 604) {
      setCurrentPage(nextPage);
    }
  };

  const handlePrevious = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      setCurrentPage(prevPage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = Number(pageNumber);
    if (page >= 1 && page <= 604) {
      setCurrentPage(page);
    }
  };

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

      <form
        onSubmit={handleSubmit}
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        <input
          type="number"
          value={pageNumber}
          placeholder="أدخل رقم الصفحة (1 - 604)"
          onChange={(e) => setPageNumber(e.target.value)}
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            borderRadius: "8px",
            background: "#008080",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          اذهب للصفحة
        </button>
      </form>

      <div
        className="page-container"
        dir="rtl"
        style={{
          margin: "20px auto",
          background: "#fff",
          padding: "25px",
          border: "1px solid #ccc",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          minHeight: "300px",
          lineHeight: "2.2",
          fontSize: "1.5em",
          textAlign: "justify",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <audio
            controls
            src={`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${number}.mp3`}
          />
        </div>

        {Object.keys(ayahsBySurah).length > 0 ? (
          Object.entries(ayahsBySurah).map(([surahNum, ayahs]) => (
            <div key={surahNum} style={{ marginBottom: "40px" }}>
              <strong
                style={{
                  fontSize: "1.3em",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                {ayahs[0].surah.name}
              </strong>
              <p>
                {ayahs.map((ayah) => (
                  <span key={ayah.number}>
                    {ayah.text}
                    <span className="numberInSurah">
                      {" "}
                      ﴿{ayah.numberInSurah}﴾{" "}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          ▶ الصفحة السابقة
        </button>
        <span style={{ margin: "0 20px" }}>الصفحة {currentPage}</span>
        <button onClick={handleNext} disabled={currentPage === 604}>
          الصفحة التالية ◀
        </button>
      </div>
    </div>
  );
};

export default SurahViewer;
