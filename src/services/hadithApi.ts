import axios from "axios";
const API_KEY = "$2y$10$K7W8NLw3MzlaXUqlheryqjIACAXG5Um7rMVNmw9aYk3KrxrK";

const HadithApi = {
  getAllBooks: async () => {
    return await axios.get(`https://hadithapi.com/api/books?apiKey=${API_KEY}`);
  },

  getAllChapters: async (activeBook: string) => {
    return await axios.get(
      `https://hadithapi.com/api/${activeBook}/chapters?apiKey=${API_KEY}`
    );
  },

  getHadith: async (
    activeBook: string,
    selectedChapter: string,
    page: number
  ) => {
    const url = selectedChapter
      ? `https://hadithapi.com/api/hadiths?apiKey=${API_KEY}&book=${activeBook}&chapter=${selectedChapter}&page=${page}`
      : `https://hadithapi.com/api/hadiths?apiKey=${API_KEY}&book=${activeBook}&page=${page}`;
    return await axios.get(url);
  },
};

export default HadithApi;
