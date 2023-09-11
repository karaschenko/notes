import { defineStore } from "pinia";
import indexedDBService from "~/services/indexeddb";
import { Note, NotesStoreState } from "~/types/types";

import { formatDate } from "~/helpers/helpers";

export const useNotesStore = defineStore("notes", {
  state: (): NotesStoreState => ({
    notes: [] as Note[],
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
        const createdNote = await indexedDBService.addNote(note);
        this.notes.push(note);
        return createdNote;
      } catch (e) {
        console.log(e);
      }
    },

    async updateNote(note: Note) {
      try {
        const updatedNote = await indexedDBService.updateNote(note);
        console.log(updatedNote, "updatedNote");
        const index = this.notes.findIndex(
          (note) => note.id === updatedNote.id
        );

        console.log(index, "index");

        if (index !== -1) {
          // Replace the old note with the updated note
          this.notes.splice(index, 1, updatedNote);
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

    setNoteEdit(value: boolean) {
      this.isNoteEditing = value;
    },

    setCurrentNote() {
      this.currentNote = this.notes.find((note) => note.id === this.activeNote);
    },

    clearCurrentNote() {
      this.currentNote = {
        title: "New Note",
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
