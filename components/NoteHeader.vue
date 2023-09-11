<template>
  <div class="note-toolbar">
    <div class="note-toolbar__left">
      <ui-icon-button
        :icon="isNoteEditing ? 'fa-save' : 'fa-edit'"
        @click="editNote"
      />
    </div>
    <div class="note-toolbar__right">
      <input
        v-model="searchText"
        type="text"
        class="note-toolbar__search"
        @input="searchNotes"
        placeholder="Search..."
      />
      <button class="note-toolbar__button">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNotesStore } from "~/store/notesStore";
import { storeToRefs } from "pinia";
import { generateTitleFromContent } from "~/helpers/helpers";

const notesStore = useNotesStore();
const { isNoteEditing, activeNote, currentNote } = storeToRefs(notesStore);

const editNote = () => {
  if (isNoteEditing.value && activeNote.value) {
    currentNote.value.title = generateTitleFromContent(
      currentNote.value.content
    );
    notesStore.updateNote(activeNote.value);
    notesStore.setNoteEdit(false);
    return;
  }
  notesStore.setNoteEdit(true);
};

const searchText = ref("");

const searchNotes = () => {
  notesStore.searchNotes(searchText.value);
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
.note-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(2 * var(--base-space));
}

.note-toolbar__left {
  display: flex;
  align-items: center;
}
s .note-toolbar__right {
  display: flex;
  align-items: center;
}
</style>
