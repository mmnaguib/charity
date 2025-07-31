export interface ISurahList {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

export interface IAyah {
  number: number;
  audio: string;
  audioSecondary: string;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  surah: ISurahContent;
}

export interface ISurahContent {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: IAyah[];
}

export interface IZekr {
  number: number;
  text: string;
  id: number;
  progress?: number;
}

export interface IHahdithBook {
  id: number;
  bookName: string;
  writerName: string;
  aboutWriter: null;
  writerDeath: string;
  bookSlug: string;
  hadiths_count: number;
  chapters_count: number;
}
export interface IHahdithChapter {
  id: 1;
  chapterNumber: string;
  chapterArabic: string;
  bookSlug: string;
}
export interface IHahdith {
  id: number;
  hadithNumber: string;
  hadithArabic: string;
  headingArabic: string;
  chapterId: string;
  bookSlug: string;
  volume: string;
  status: string;
  book: IHahdithBook;
  chapter: IHahdithChapter;
}
