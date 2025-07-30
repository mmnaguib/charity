import React, { useEffect, useState } from "react";
import axios from "axios";
import { IHahdith, IHahdithBook, IHahdithChapter } from "../../interface";
import HadithApi from "../../services/hadithApi";
import {
  bookNameTranslations,
  bookTranslations,
  writerNameTranslations,
} from "../../assets/Tanslation";
import Loading from "../Loading";

const HadithsByBook = () => {
  const [books, setBooks] = useState<IHahdithBook[]>([]);
  const [activeBook, setActiveBook] = useState<string>("sahih-bukhari");
  const [hadiths, setHadiths] = useState<IHahdith[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState<IHahdithChapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string>("");

  // Get all books
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await HadithApi.getAllBooks();
      setBooks(res.data.books.filter((b: IHahdithBook) => b.hadiths_count > 0));
      setActiveBook(res.data.books[0].bookSlug);
    };
    fetchBooks();
  }, []);

  // Fetch chapters when book changes
  useEffect(() => {
    const fetchChapters = async () => {
      setSelectedChapter("");
      const res = await HadithApi.getAllChapters(activeBook);
      setChapters(res.data.chapters || []);
    };

    if (activeBook) {
      fetchChapters();
    }
  }, [activeBook]);

  // Fetch hadiths (filtered by chapter if selected)
  useEffect(() => {
    const fetchHadiths = async () => {
      setLoading(true);
      try {
        const res = await HadithApi.getHadith(
          activeBook,
          selectedChapter,
          page
        );
        setHadiths(res.data.hadiths.data || []);
      } finally {
        setLoading(false);
      }
    };
    if (activeBook) fetchHadiths();
  }, [activeBook, page, selectedChapter]);

  return (
    <div>
      {/* Tabs */}
      <div className="hadithTabs">
        {books.map((b) => (
          <button
            key={b.bookSlug}
            onClick={() => {
              setActiveBook(b.bookSlug);
              setPage(1);
              setSelectedChapter("");
            }}
            style={{
              background: activeBook === b.bookSlug ? "#fff" : "#f0f0f0",
            }}
          >
            {bookTranslations[b.bookSlug] || b.bookName}
          </button>
        ))}
      </div>

      {chapters.length > 0 && (
        <select
          value={selectedChapter}
          onChange={(e) => {
            setSelectedChapter(e.target.value);
            setPage(1);
          }}
          style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
        >
          <option value="">📂 كل الأبواب</option>
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.chapterArabic}
            </option>
          ))}
        </select>
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="mainWidth">
          {hadiths.map((h) => (
            <div key={h.id} className="hadith-card">
              <p className="hadith-title">🕋 الحديث:</p>
              <p className="hadith-text">{h.hadithArabic}</p>

              {h.chapter?.chapterArabic && (
                <p className="hadith-chapter">
                  📚 الباب: {h.chapter.chapterArabic}
                </p>
              )}

              {h.book?.bookName && (
                <p className="hadith-source">
                  📖 المصدر:
                  <span className="bold">
                    {bookNameTranslations[h.book.bookName] || h.book.bookName}
                  </span>
                  {h.book.writerName && (
                    <>
                      {" "}
                      -{" "}
                      <span className="bold">
                        {writerNameTranslations[h.book.writerName] ||
                          h.book.writerName}
                      </span>
                    </>
                  )}
                </p>
              )}

              {h.hadithNumber && (
                <p className="hadith-number">🔢 رقم الحديث: {h.hadithNumber}</p>
              )}
            </div>
          ))}

          {/* Pagination */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              ◀️ السابق
            </button>
            <span>الصفحة {page}</span>
            <button onClick={() => setPage((p) => p + 1)}>التالي ▶️</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HadithsByBook;
