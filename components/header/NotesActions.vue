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
import { useToasterStore } from "~/store/toasterStore";

const { setNewNote, clearCurrentNote, removeNote } = useNotesStore();
const { showToast } = useToasterStore();
const { activeNote } = storeToRefs(useNotesStore());

const removeNoteHandler = () => {
  if (
    activeNote.value &&
    confirm(`are you sure to remove note with id ${activeNote.value}`)
  ) {
    removeNote(activeNote.value);
    showToast("note has been removed", 3);
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
