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
import { useToasterStore } from "~/store/toasterStore";
import { storeToRefs } from "pinia";
import {
  debounce,
  formatDate,
  generateTitleFromContent,
} from "~/helpers/helpers";

const notesStore = useNotesStore();
const toasterStore = useToasterStore();
const { isNoteEditing, activeNote, currentNote } = storeToRefs(notesStore);

const editNote = async () => {
  try {
    await notesStore.fetchNotes();
    if (isNoteEditing && activeNote.value) {
      if (currentNote.value.content.length < 1) {
        currentNote.value.content = "New note";
      }
      currentNote.value.date = formatDate();
      currentNote.value.title = generateTitleFromContent(
        currentNote.value.content
      );
      currentNote.value.id = activeNote.value;
      const updatedNote = Object.assign({}, currentNote.value);
      notesStore.updateNote(updatedNote);
      notesStore.setNoteEdit(false);
      toasterStore.showToast("note has been saved", 3);
    }
  } catch (error) {
    console.log(error);
  }
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
