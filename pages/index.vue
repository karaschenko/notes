<template>
  <div class="notes">
    <div class="notes-header">
      <header-notes-actions class="notes-header__actions" />
      <header-notes-toolbar class="notes-header__toolbar" />
    </div>
    <div class="notes-body">
      <NoteList class="note-list" />
      <SingleNote class="single-note" />
    </div>
    <ui-toaster />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.notes {
  border: 1px solid $border-color;
  @media (max-width: $medium-screen) {
    border: 0;
    border-bottom: 1px solid $border-color;
    border-top: 1px solid $border-color;
  }

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
