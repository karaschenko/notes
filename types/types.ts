import { DBSchema } from 'idb';

export interface Note {
  id?: string;
  title: string;
  content: string;
  date: string;
}

export interface MyDB extends DBSchema {
  notes: {
    key: number;
    value: any;
  };
}