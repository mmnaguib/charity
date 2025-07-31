import React, { useEffect, useState } from "react";
import QuranApi from "../../services/quranApi";
import { IAyah } from "../../interface";
import axios from "axios";

const Ayah = () => {
  const [ayah, setAyah] = useState<IAyah | null>(null);
  const [timings, setTimings] = useState<{ [key: string]: string } | null>(
    null
  );
  const [backgroundClass, setBackgroundClass] = useState<string>("");

  // احصل على آية عشوائية
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 6236) + 1;
    const getAyah = async () => {
      const res = await QuranApi.getSpecifiecAyah(randomNumber);
      setAyah(res.data.data);
    };
    getAyah();
  }, []);

  function getCurrentPrayerName(timings: { [key: string]: string }): string {
    const allowedPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const timesInMinutes = Object.entries(timings)
      .filter(([key]) => allowedPrayers.includes(key)) // ✅ فلتر المسموح بس
      .map(([key, value]) => {
        const [hour, minute] = value.split(":").map(Number);
        return { key, minutes: hour * 60 + minute };
      });

    const current = timesInMinutes.reduce((acc, curr) =>
      curr.minutes <= nowMinutes ? curr : acc
    );

    return current.key;
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await axios.get(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=5`
        );
        const t = res.data.data.timings;
        setTimings(t);

        const prayer = getCurrentPrayerName(t);
        setBackgroundClass(`prayer-bg-${prayer.toLowerCase()}`);
      },
      () => {
        console.warn("فشل تحديد الموقع");
      }
    );
  }, []);

  return (
    <div className={`ayah-card ${backgroundClass}`}>
      <p className="ayah-text">{ayah?.text}</p>
      <p className="ayah-meta">
        <span className="ayah-surah">{ayah?.surah.name}</span> – الآية{" "}
        {ayah?.numberInSurah}
      </p>
      <audio className="ayah-audio" controls src={ayah?.audio} />
    </div>
  );
};

export default Ayah;
