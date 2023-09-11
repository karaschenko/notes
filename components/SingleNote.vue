<template>
  <div>
    <div v-if="notes.length < 1 && !isNewNote" class="note-placeholder">
      <div>There are no notes yet!</div>
      <ui-icon-button icon="fa-plus" @click="setNewNote(true)"
        >Create first</ui-icon-button
      >
    </div>

    <div v-else class="note-editor">
      <div class="note-editor__time">
        {{ currentNote?.date }}
      </div>
      <form
        v-if="isNewNote || isNoteEditing"
        @submit.prevent="addNoteHandler"
        v-click-outside="handleFormLeave"
      >
        <textarea
          class="note-editor__field"
          v-model="currentNote.content"
          placeholder="Type here"
          required
        ></textarea>

        <ui-icon-button
          class="note-editor__create"
          v-if="isNewNote"
          icon="fas fa-plus"
          type="submit"
        >
          Create
        </ui-icon-button>
      </form>

      <Markdown class="note-editor__result" :source="currentNote?.content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNotesStore } from "~/store/notesStore";
import Markdown from "vue3-markdown-it";
import { formatDate, generateTitleFromContent } from "~/helpers/helpers";
import { storeToRefs } from "pinia";

const {
  addNote,
  fetchNotes,
  clearCurrentNote,
  setActiveNote,
  updateNote,
  setNoteEdit,
  setNewNote,
} = useNotesStore();

const notesStore = useNotesStore();
const { notes, isNewNote, isNoteEditing, currentNote, activeNote } =
  storeToRefs(notesStore);

const addNoteHandler = async () => {
  currentNote.value.date = formatDate();
  if (currentNote.value.content.length < 1) {
    currentNote.value.content = "Empty note";
  }
  currentNote.value.title = generateTitleFromContent(currentNote.value.content);
  const noteToSave = Object.assign({}, currentNote.value);
  await addNote(noteToSave);
  clearCurrentNote();
  isNewNote.value = false;
  await fetchNotes();
  const activeNote = Number(notes.value[notes.value.length - 1].id);
  setActiveNote(activeNote);
};

const handleFormLeave = () => {
  const editedNote = activeNote.value;
  if (confirm("Do you want to save your changes?")) {
    if (isNewNote) {
      addNoteHandler();
    }
    if (isNoteEditing && activeNote.value) {
      updateNote(activeNote.value);
      setNoteEdit(false);
    }
  } else {
    console.log(activeNote.value);
    setActiveNote(editedNote ?? 0);
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

.note-placeholder {
  display: flex;
  min-height: 70vh;
  align-items: center;
  justify-content: center;
  gap: var(--base-space);

  .ui-icon-button {
    border: 1px solid $border-color;
  }
}

.note-editor {
  padding: calc(2 * var(--base-space));

  &__field {
    all: unset;
    width: 100%;
    height: 100%;
    min-height: 30vh;
  }

  &__create {
    border: 1px solid $border-color;
  }
}
</style>
