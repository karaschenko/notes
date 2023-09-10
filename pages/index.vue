<template>
  <div class="notes">
    <div class="notes-header">
      <notes-actions class="notes-header__actions" />
      <note-header class="notes-header__toolbar" />
    </div>
    <div class="notes-body">
      <NoteList class="note-list" />
      <SingleNote class="single-note" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.notes {
  &-header {
    display: flex;
  }
  &-body {
    display: flex;
  }
}

.note-list,
.notes-header__actions {
  flex: 1;
  max-width: 30%;
  border-right: 1px solid $border-color;
}

.single-note,
.notes-header__toolbar {
  flex: 1;
}
</style>
