<template>
  <div class="notes">
    <NoteList class="note-list"/>
    <SingleNote class="single-note" />
  </div>
</template>

<script  lang="ts">
import NoteList from '~/components/NoteList.vue';
import SingleNote from '~/components/SingleNote.vue';

export default {
  name: 'notes',
  components: {
    NoteList,
    SingleNote
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.notes {
  display: flex;
}

.note-list {
  flex: 1; 
  max-width: 30%;
  border-right: 1px solid $border-color;
}

.single-note {
  flex: 1; 
  padding: 20px; 
}
</style>
