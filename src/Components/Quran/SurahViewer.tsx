import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuranApi from "../../services/quranApi";
import { IAyah } from "../../interface";
import { SurahHeader } from "./SurahHeader";

const SurahViewer = () => {
  const { number } = useParams();
  const [ayahs, setAyahs] = useState<IAyah[]>([]);
  const [name, setName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [place, setPlace] = useState("");
  const [surahAyahNumbers, setSurahAyahNumbers] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const getSurah = async (surahNumber: number) => {
    const res = await QuranApi.getSurahContent(surahNumber);

    const ayahList = res.data.data.ayahs;
    setName(res.data.data.name);
    setEnglishName(res.data.data.englishName);
    setSurahAyahNumbers(res.data.data.numberOfAyahs);
    setPlace(res.data.data.revelationType);
    setAyahs(ayahList);

    setStartPage(ayahList[0].page);
    setEndPage(ayahList[ayahList.length - 1].page);
  };

  useEffect(() => {
    getSurah(Number(number));
  }, [number]);
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

      <p className="surahText">
        {ayahs.map((ayah) => (
          <>
            {ayah.text}
            <span className="numberInSurah"> ﴿{ayah.numberInSurah}﴾</span>
          </>
        ))}{" "}
      </p>
    </div>
  );
};

export default SurahViewer;
