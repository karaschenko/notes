<!-- components/NotesActions.vue -->

<template>
  <div class="notes-actions">
    <ui-icon-button icon="fa-plus" @click="setNewNote(true)" />
    <ui-icon-button icon="fa-trash-alt" @click="removeNoteHandler" />
  </div>
</template>

<script lang="ts" setup>
import { useNotesStore } from "~/store/notesStore";

const { setNewNote, removeNote, activeNote } = useNotesStore();

const removeNoteHandler = () => {
  console.log("remove", activeNote, typeof activeNote);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.notes-actions {
  display: flex;
  padding: 2 * $base-space;
  gap: $base-space;
}
</style>
