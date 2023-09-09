// services/indexeddb.ts

import { openDB } from 'idb';
import { Note, MyDB } from '~/types/types';

const dbName = 'notesDB';
const dbVersion = 1;

// Check if we're running on the client side before opening IndexedDB
const dbPromise = process.client
  ? openDB<MyDB>(dbName, dbVersion, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes');
        }
      },
    })
  : null;

const indexedDBService = {
  async addNote(note: Note) {
    if (!dbPromise) {
      // Handle the case where IndexedDB is not available (e.g., on the server side)
      return;
    }

    const db = await dbPromise;
    const tx = db.transaction('notes', 'readwrite');
    const store = tx.objectStore('notes');
    await store.add(note);
  },

  async getAllNotes() {
    if (!dbPromise) {
      // Handle the case where IndexedDB is not available (e.g., on the server side)
      return [];
    }

    const db = await dbPromise;
    const store = db.transaction('notes', 'readonly').objectStore('notes');
    return store.getAll();
  },

  async removeNote(id: number) {
    if (!dbPromise) {
      // Handle the case where IndexedDB is not available (e.g., on the server side)
      return;
    }

    const db = await dbPromise;
    const tx = db.transaction('notes', 'readwrite');
    const store = tx.objectStore('notes');
    await store.delete(id);
  },
};

export default indexedDBService;
