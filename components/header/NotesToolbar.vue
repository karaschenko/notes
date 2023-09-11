<template>
  <div class="note-toolbar">
    <div class="note-toolbar__left">
      <ui-icon-button
        :icon="isNoteEditing ? 'fa-save' : 'fa-edit'"
        @click="editNote"
      />
    </div>
    <div class="note-toolbar__right">
      <ui-input
        icon="fa-search"
        :value="searchText"
        :update-value="updateSearchText"
        type="text"
        class="note-toolbar__search"
        @input="searchNotes"
        placeholder="Search..."
      ></ui-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNotesStore } from "~/store/notesStore";
import { storeToRefs } from "pinia";
import {
  debounce,
  formatDate,
  generateTitleFromContent,
} from "~/helpers/helpers";

const notesStore = useNotesStore();
const { isNoteEditing, activeNote, currentNote } = storeToRefs(notesStore);

const editNote = () => {
  if (isNoteEditing.value && activeNote.value) {
    currentNote.value.title = generateTitleFromContent(
      currentNote.value.content
    );
    currentNote.value.date = formatDate();
    notesStore.updateNote(activeNote.value);
    notesStore.setNoteEdit(false);
    return;
  }
  notesStore.setNoteEdit(true);
};

const searchText = ref("");

const updateSearchText = (value: string) => {
  searchText.value = value;
};

const searchNotes = debounce(() => {
  notesStore.searchNotes(searchText.value);
}, 500);
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
.note-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(2 * var(--base-space));
}
</style>
