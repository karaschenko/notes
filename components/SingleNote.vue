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
        class="note-editor__form"
      >
        <textarea
          class="note-editor__field"
          v-model="currentNote.content"
          placeholder="Type here"
          required
        ></textarea>

        <ui-icon-button
          class="note-editor__create bordered"
          v-if="isNewNote"
          icon="fas fa-plus"
          type="submit"
        >
          Create note
        </ui-icon-button>
      </form>
      <div v-if="isNoteEditing" class="note-editor__heading">Output:</div>
      <Markdown
        class="note-editor__result"
        @click="isNoteEditing = true"
        :source="currentNote?.content"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNotesStore } from "~/store/notesStore";
import { useToasterStore } from "~/store/toasterStore";
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

const { showToast } = useToasterStore();

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
  if (isNewNote.value) {
    addNoteHandler();
    showToast("note has been created", 3);
  }
  if (isNoteEditing && activeNote.value) {
    currentNote.value.date = formatDate();
    updateNote(activeNote.value);
    setNoteEdit(false);
    showToast("note has been saved", 3);
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
  display: flex;
  flex-direction: column;
  align-items: center;

  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__time {
    color: $light-gray-text;
  }

  &__field {
    all: unset;
    width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
    height: 100%;
    min-height: 30vh;
    padding: calc(2 * var(--base-space));
    align-self: flex-start;
  }

  &__result {
    padding: calc(2 * var(--base-space));
    text-align: left;
    align-self: flex-start;

    blockquote {
      margin: var(--base-space) auto;
      padding: calc(2 * var(--base-space));
      border-left: 2px solid #999;
    }

    ul,
    ol {
      padding: calc(2 * var(--base-space));
    }
  }

  &__create {
    border: 1px solid $border-color;
  }
}
</style>
