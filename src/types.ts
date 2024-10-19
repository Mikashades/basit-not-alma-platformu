export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  isFavorite: boolean;
  category: string;
  isEdited?: boolean;
  history: { title: string; content: string; date: string }[];
}
  