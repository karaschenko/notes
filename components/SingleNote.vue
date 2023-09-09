
<template>
  <div class="single-note">
    <form @submit.prevent="addNoteHandler" >
      <input v-model="newNote.title" placeholder="Title" required />
      <textarea v-model="newNote.content" placeholder="Content" required></textarea>
      <button type="submit">Add Note</button>
    </form>

    <Markdown :source="newNote.content" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useNotesStore } from '~/store/notesStore';
import Markdown from 'vue3-markdown-it';
import { formatDate } from '~/helpers/helpers';

const { addNote, fetchNotes } = useNotesStore();


const newNote = ref({ title: '', content: '', date: formatDate() });
const source = ref('# Hello World! \n ## Заголовок два \n  > Blockquotes ');

const addNoteHandler = async () => {
    const noteToSave = Object.assign({}, newNote.value)
    await addNote(noteToSave);
    newNote.value = { title: '', content: '', date: '' };
    await fetchNotes();
};
</script>

<style lang="scss">
</style>
