// store/notesStore.ts

import { defineStore } from 'pinia';
import indexedDBService from '~/services/indexeddb';
import { Note } from '~/types/types';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes : [] as Note[],
  }),

  actions: {
    async addNote(note: Note) {
      try {
        await indexedDBService.addNote(note);
        this.notes.push(note);
      } catch (e) {
        console.log(e);
      }
    },

    async fetchNotes() {
      try {
        const notes = await indexedDBService.getAllNotes();
        console.log('notes', notes);
        this.notes = notes;
      } catch (e) {
        console.log(e)
      }
    },

    async removeNote(id: string) {
      // Remove the note from the store
      this.notes = this.notes.filter((note: Note) => note.id !== id);
      await indexedDBService.removeNote(+id);
    },
  },
});
