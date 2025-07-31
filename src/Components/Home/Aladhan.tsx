import { useEffect, useState } from "react";

interface Timings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

const prayerNames: Record<string, string> = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

const prayerIcons: Record<keyof typeof prayerNames, React.ReactNode> = {
  Fajr: <i className="fas fa-sun prayer-icon"></i>,
  Dhuhr: <i className="fas fa-cloud-sun prayer-icon"></i>,
  Asr: <i className="fas fa-cloud prayer-icon"></i>,
  Maghrib: <i className="fas fa-cloud-moon prayer-icon"></i>,
  Isha: <i className="fas fa-moon prayer-icon"></i>,
};

export default function PrayerTimes() {
  const [timings, setTimings] = useState<Timings | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=5`
          )
            .then((res) => res.json())
            .then((data) => {
              setTimings(data.data.timings);
            })
            .catch(() => setError("فشل في تحميل أوقات الصلاة."));
        },
        () => setError("رجاءً اسمح للموقع باستخدام موقعك لعرض أوقات الصلاة.")
      );
    } else {
      setError("المتصفح لا يدعم تحديد الموقع الجغرافي.");
    }
  }, []);

  return (
    <div className="prayer-times-container">
      <div className="header">
        <i className="fas fa-mosque main-icon"></i>
        <h1 className="title">أوقات الصلاة</h1>
      </div>
      {error && <p className="error-message">{error}</p>}
      {timings ? (
        <div className="prayer-grid">
          {Object.entries(timings)
            .filter(([name]) =>
              ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(name)
            )
            .map(([name, time]) => (
              <div key={name} className="prayer-card">
                {prayerIcons[name as keyof typeof prayerIcons]}
                <p className="prayer-name">{prayerNames[name] || name}</p>
                <p className="prayer-time">{time}</p>
              </div>
            ))}
        </div>
      ) : (
        !error && <p className="loading">جاري تحميل أوقات الصلاة...</p>
      )}
    </div>
  );
}
