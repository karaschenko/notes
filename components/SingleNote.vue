<template>
  <div>
    <div v-if="notes.length < 1" class="note-placeholder">
      <div>There are no notes yet!</div>
    </div>

    <div v-else class="note-editor">
      <div class="note-editor__time">
        {{ currentNote?.date }}
      </div>
      <form
        v-if="isNoteEditing"
        @submit.prevent="handleFormLeave"
        v-click-outside="handleFormLeave"
        class="note-editor__form"
      >
        <textarea
          class="note-editor__field"
          ref="editor"
          v-model="currentNote.content"
          placeholder="Type here"
          @input="editorHandler"
        ></textarea>
      </form>
      <div v-if="isNoteEditing" class="note-editor__heading">Output:</div>
      <Markdown
        :class="['note-editor__result', { isNoteEditing }]"
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

const { updateNote, setNoteEdit, fetchNotes } = useNotesStore();

const { showToast } = useToasterStore();

const notesStore = useNotesStore();
const { notes, isNoteEditing, currentNote, activeNote } =
  storeToRefs(notesStore);

const editorHandler = () => {
  currentNote.value.title = generateTitleFromContent(currentNote.value.content);
};

const handleFormLeave = async () => {
  try {
    await fetchNotes();
    if (isNoteEditing && activeNote.value) {
      if (currentNote.value.content.length < 1) {
        currentNote.value.content = "New note";
      }
      currentNote.value.date = formatDate();
      currentNote.value.title = generateTitleFromContent(
        currentNote.value.content
      );
      currentNote.value.id = activeNote.value;
      console.log(activeNote.value);
      const updatedNote = Object.assign({}, currentNote.value);
      updateNote(updatedNote);
      setNoteEdit(false);
      showToast("note has been saved", 3);
    }
  } catch (error) {
    console.log(error);
  }
};

const editor = ref<HTMLElement | null>(null);

onUpdated(() => {
  if (editor.value) {
    editor.value!.focus();
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

.note-placeholder {
  display: flex;
  min-height: 70vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--base-space);

  .ui-icon-button {
    border: 1px solid $border-color;
  }
}

.note-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

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
    width: 100%;
    height: 100%;
    flex-grow: 1;

    &.isNoteEditing {
      background: #f8f3e6;
    }

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

  &__heading {
    padding: calc(2 * var(--base-space));
    border-top: 1px solid $border-color;
    width: 100%;
    text-align: center;
    background: #f8f3e6;
    font-weight: bold;
    color: $light-gray-text;
  }
}
</style>
