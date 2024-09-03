export type Chapter = {
  chapter_id: string;
  title: string;
  pages: number;
  summary: string;
  chapterNumber: number;
  isImportant: boolean;
};

export type Book = {
  book_id: string;
  title: string;
  author: string;
  yearPublished: number;
  genre: string;
  chapters: Chapter[];
};
