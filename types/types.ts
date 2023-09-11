import { DBSchema } from "idb";

export interface Note {
  id?: number;
  title: string;
  content: string;
  date: string;
}

export interface MyDB extends DBSchema {
  notes: {
    key: number;
    value: Note;
  };
}

export interface NotesStoreState {
  notes: Note[];
  isNewNote: boolean;
  isNoteEditing: boolean;
  activeNote: number | null;
  currentNote: Note;
}

export interface ToasterState {
  text: string | null;
  showToaster: boolean;
}
