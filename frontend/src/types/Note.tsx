import type { Category } from "./Category";

export type Note = {
  id: number;
  archived: boolean;
  title: string;
  content?: string;
  categories: Category[];
};
