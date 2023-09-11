<!-- components/NotesActions.vue -->

<template>
  <div class="notes-actions">
    <ui-icon-button icon="fa-plus" @click="createNoteHandler" />
    <ui-icon-button icon="fa-trash-alt" @click="removeNoteHandler" />
  </div>
</template>

<script lang="ts" setup>
import { useNotesStore } from "~/store/notesStore";
import { storeToRefs } from "pinia";

const { setNewNote, clearCurrentNote, removeNote } = useNotesStore();
const { activeNote } = storeToRefs(useNotesStore());

const removeNoteHandler = () => {
  if (
    activeNote.value &&
    confirm(`are you sure to remove note with id ${activeNote.value}`)
  ) {
    removeNote(activeNote.value);
  }
};

const createNoteHandler = () => {
  setNewNote(true);
  clearCurrentNote();
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
