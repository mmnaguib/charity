import React, { useEffect, useState } from "react";
import { IZekr } from "../../interface";
import Loading from "../Loading";

type Props = {
  fetchAzkar: () => Promise<{ data: { [key: string]: IZekr[] } }>;
  listKey: string;
  title?: string;
};

const AzkarList = ({ fetchAzkar, listKey, title }: Props) => {
  const [azkar, setAzkar] = useState<IZekr[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAzkar = async () => {
      setLoading(true);

      try {
        const cached = localStorage.getItem(`azkar-${listKey}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          const now = new Date().getTime();

          if (now - parsed.timestamp < 24 * 60 * 60 * 1000) {
            setAzkar(parsed.data);
            setLoading(false);
            return;
          }
        }

        // مفيش كاش أو انتهت صلاحيته
        const res = await fetchAzkar();
        const rawAzkar = res.data[listKey];
        const withProgress = rawAzkar.map((item) => ({
          ...item,
          progress: 0,
        }));

        setAzkar(withProgress);

        // نحفظ في الكاش مع التوقيت
        localStorage.setItem(
          `azkar-${listKey}`,
          JSON.stringify({
            data: withProgress,
            timestamp: new Date().getTime(),
          })
        );
      } catch (err) {
        console.error("خطأ في تحميل الأذكار", err);
      } finally {
        setLoading(false);
      }
    };

    getAzkar();
  }, [fetchAzkar, listKey]);

  const handleProgress = (index: number) => {
    setAzkar((prev) => {
      const updated = prev.map((zekr, i) =>
        i === index && (zekr?.progress ?? 0) < zekr.number
          ? { ...zekr, progress: (zekr.progress ?? 0) + 1 }
          : zekr
      );

      // نحدث الكاش بعد التعديل
      localStorage.setItem(
        `azkar-${listKey}`,
        JSON.stringify({ data: updated, timestamp: new Date().getTime() })
      );

      return updated;
    });
  };

  return (
    <div>
      {/* {title && <h2 className="azkar-title">{title}</h2>} */}
      {loading ? (
        <Loading />
      ) : (
        azkar.map((zekr, index) => (
          <div key={index} className="zekr-card">
            <div className="zekr-header">
              <p className="zekr-text">{zekr.text}</p>
              <p className="zekr-count">{zekr.number}</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                className={`progress-btn ${
                  zekr.progress === zekr.number ? "done" : ""
                }`}
                onClick={() => handleProgress(index)}
                disabled={zekr.progress === zekr.number}
                style={{
                  ["--progress" as any]: `${
                    ((zekr.progress ?? 0) / zekr.number) * 100
                  }%`,
                }}
              >
                {zekr.progress ?? 0} / {zekr.number}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AzkarList;
