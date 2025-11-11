import type { Category } from "./Category";

export type Note = {
  id: number;
  title: string;
  content?: string;
  categories: Category[];
};
