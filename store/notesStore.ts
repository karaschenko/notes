import { defineStore } from "pinia";
import indexedDBService from "~/services/indexeddb";
import { Note, NotesStoreState } from "~/types/types";

import { formatDate } from "~/helpers/helpers";

export const useNotesStore = defineStore("notes", {
  state: (): NotesStoreState => ({
    notes: [] as Note[],
    isNewNote: false,
    isNoteEditing: false,
    activeNote: 0,
    currentNote: {
      title: "",
      content: "",
      date: formatDate(),
    },
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

    async updateNote(id: number) {
      try {
        const updatedNote = Object.assign(
          {},
          this.notes.find((note) => note.id === id)
        );

        if (updatedNote) {
          await indexedDBService.updateNote(updatedNote);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async fetchNotes() {
      try {
        const notes = await indexedDBService.getAllNotes();
        console.log("notes", notes);
        this.notes = notes;
      } catch (e) {
        console.log(e);
      }
    },

    async removeNote(id: number) {
      this.notes = this.notes.filter((note: Note) => note.id !== id);
      await indexedDBService.removeNote(id);
    },

    setActiveNote(id: number) {
      this.activeNote = id;
    },

    setNewNote(value: boolean) {
      if (value) {
        this.activeNote = 0;
      }
      this.isNewNote = value;
    },

    setNoteEdit(value: boolean) {
      this.isNoteEditing = value;
    },

    setCurrentNote() {
      this.currentNote = this.notes.find((note) => note.id === this.activeNote);
    },

    clearCurrentNote() {
      this.currentNote = {
        title: "",
        content: "",
        date: formatDate(),
      };
    },

    async searchNotes(query: string) {
      const searchResult = await indexedDBService.searchNotes(query);
      console.log("searchResult", searchResult);
      this.notes = [...searchResult];
      return searchResult;
    },
  },
});
