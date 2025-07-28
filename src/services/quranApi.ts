import axiosInstance from "./axiosInstance";

const QuranApi = {
  getAllChapters: async () => {
    return await axiosInstance.get("surah");
  },

  getSurahContent: async (surahNumber: number) => {
    return await axiosInstance.get(`surah/${surahNumber}/ar.alafasy`);
  },

  getSpecifiecAyah: async (ayahNumber: number) => {
    return await axiosInstance.get(`ayah/${ayahNumber}/ar.alafasy`);
  },

  getSurahByPage: async (pageNumber: number) => {
    return await axiosInstance.get(`page/${pageNumber}/quran-uthmani`);
  },
};

export default QuranApi;
