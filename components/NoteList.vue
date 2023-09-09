<template>
  <div>
    <ul>
      <NoteListItem
        v-for="note in notes"
        :key="note.id"
        :note="note"
      />
    </ul>
    <button @click="removeNote">remove</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useNotesStore } from '~/store/notesStore';
import { storeToRefs } from 'pinia';
import NoteListItem from '~/components/NoteListItem.vue'; // Import the NoteListItem component

const notesStore = useNotesStore();
const { notes } = storeToRefs(notesStore);

const removeNote = async () => {
  // Implement the removeNote logic here
};

onMounted(async () => {
  await notesStore.fetchNotes();
});
</script>
