<template>
  <div class="notes-actions">
    <ui-icon-button icon="fa-plus" @click="createNoteHandler" />
    <ui-icon-button
      v-if="activeNote"
      icon="fa-trash-alt"
      @click="removeNoteHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { useNotesStore } from "~/store/notesStore";
import { storeToRefs } from "pinia";
import { useToasterStore } from "~/store/toasterStore";

const {
  setActiveNote,
  clearCurrentNote,
  addNote,
  removeNote,
  setNoteEdit,
  fetchNotes,
} = useNotesStore();

const { showToast } = useToasterStore();
const { activeNote, currentNote, notes } = storeToRefs(useNotesStore());

const removeNoteHandler = () => {
  if (
    activeNote.value &&
    confirm(`are you sure to remove note with id ${activeNote.value}`)
  ) {
    removeNote(activeNote.value);
    const lastNoteId = notes.value[notes.value.length - 1].id;
    setActiveNote(lastNoteId ?? 0);
    clearCurrentNote();
    showToast("Note has been removed", 3);
  }
};

const createNoteHandler = async () => {
  try {
    clearCurrentNote();
    const newNote = Object.assign({}, currentNote.value);
    const createdNote = await addNote(newNote);
    await fetchNotes();
    if (createdNote) {
      setActiveNote(createdNote);
      setNoteEdit(true);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.notes-actions {
  display: flex;
  padding: calc(2 * var(--base-space));
  gap: var(--base-space);
}
</style>
