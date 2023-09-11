import { openDB, IDBPDatabase } from "idb";
import { Note, MyDB } from "~/types/types";

const dbName = "notesDB";
const dbVersion = 1;

// Function to open the IndexedDB database
async function openNotesDB(): Promise<IDBPDatabase<MyDB>> {
  console.log("openNotesDB");
  const db = await openDB<MyDB>(dbName, dbVersion, {
    upgrade(db) {
      console.log("upgrade");
      try {
        const notesStore = db.createObjectStore("notes", {
          keyPath: "id",
          autoIncrement: true,
        });
        notesStore.createIndex("contentIndex", "content");
      } catch (error) {
        console.error("Upgrade error:", error);
      }
    },
  });
  return db;
}

const indexedDBService = {
  async addNote(note: Note) {
    const db = await openNotesDB();
    const tx = db.transaction("notes", "readwrite");
    const store = tx.objectStore("notes");
    const id = await store.add(note);
    return id;
  },

  async getAllNotes() {
    const db = await openNotesDB();
    const store = db.transaction("notes", "readonly").objectStore("notes");
    return store.getAll();
  },

  async removeNote(id: number) {
    const db = await openNotesDB();
    const tx = db.transaction("notes", "readwrite");
    const store = tx.objectStore("notes");
    await store.delete(id);
  },

  async updateNote(updatedNote: Note) {
    const db = await openNotesDB();
    const tx = db.transaction("notes", "readwrite");
    const store = tx.objectStore("notes");
    await store.put(updatedNote);

    return updatedNote;
  },
  async searchNotes(query: string) {
    const db = await openNotesDB();
    const store = db.transaction("notes", "readonly").objectStore("notes");
    const index = store.index("contentIndex");

    const searchResult: Note[] = [];

    const lowerQuery = query.toLowerCase();

    const cursor = await index.openCursor();

    while (cursor) {
      const note = cursor.value;

      if (note.content.toLowerCase().includes(lowerQuery)) {
        searchResult.push(note);
      }

      const hasNext = await cursor.continue().catch((error) => {
        console.error("Error advancing cursor:", error);
        return false;
      });
      if (!hasNext) {
        break;
      }
    }

    return searchResult;
  },
};

export default indexedDBService;
