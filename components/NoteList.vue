<template>
  <div>
    <ul class="notes-list" v-if="notes.length > 0">
      <NoteListItem
        v-for="note in notes"
        :key="note.id"
        :note="note"
        :activeId="activeNote"
        class="notes-list__item"
        @click="selectNoteHandler(note.id ?? 0)"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useNotesStore } from "~/store/notesStore";
import { storeToRefs } from "pinia";

const notesStore = useNotesStore();
const { notes, activeNote } = storeToRefs(notesStore);

const selectNoteHandler = (id: number) => {
  notesStore.setNewNote(false);
  notesStore.setActiveNote(id);
  notesStore.setCurrentNote();
};

onMounted(async () => {
  await notesStore.fetchNotes();
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.notes-list {
  display: flex;
  flex-direction: column;
  gap: calc(var(--base-space) * 2);
  padding: calc(var(--base-space) * 2);
  list-style: none;
  max-height: 80vh;
  overflow: auto;

  &__item {
    padding: var(--base-space);
    cursor: pointer;
    border-radius: var(--base-space);

    &.active {
      background: $primary-color;
    }
  }
}
</style>
