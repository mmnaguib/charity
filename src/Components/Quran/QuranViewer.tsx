import { useEffect, useState } from "react";
import QuranApi from "../../services/quranApi";
import { ISurahList } from "../../interface";
import { Link } from "react-router-dom";
const QuranViewer = () => {
  const [chapters, setChapters] = useState<ISurahList[]>([]);
  const getAllChapters = async () => {
    const res = await QuranApi.getAllChapters();
    console.log(res);
    setChapters(res.data.data);
  };
  useEffect(() => {
    getAllChapters();
  }, []);
  return (
    <div className="surahsCont">
      {chapters.map((chapter) => (
        <div className="chapter" key={chapter.number}>
          {chapter.number}- <Link to={`${chapter.number}`}>{chapter.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default QuranViewer;
