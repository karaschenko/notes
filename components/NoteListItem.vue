<template>
  <li :class="{ active: note.id === activeId }" class="notes-item">
    <div v-if="note.id === activeId && isNoteEditing">
      <div class="notes-item__title">{{ currentNote?.title }}</div>
      <div class="notes-item__content">
        <div class="notes-item__date">
          {{ cutDateString(currentNote?.date) }}
        </div>
        <div class="notes-item__text">{{ currentNote?.content }}</div>
      </div>
    </div>
    <div v-else>
      <div class="notes-item__title">{{ note?.title }}</div>
      <div class="notes-item__content">
        <div class="notes-item__date">{{ cutDateString(note?.date) }}</div>
        <div class="notes-item__text">{{ note?.content }}</div>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { Note } from "~/types/types";
import { storeToRefs } from "pinia";
import { useNotesStore } from "~/store/notesStore";

const { isNoteEditing, currentNote } = storeToRefs(useNotesStore());
const props = defineProps({
  note: {
    type: Object as () => Note,
    required: true,
  },
  activeId: {
    type: Number,
    required: true,
  },
});

const cutDateString = (str: string) => {
  return str.split(",")[0];
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.notes-item {
  padding: var(--base-space);
  border-radius: var(--base-space);
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    height: 1px;
    bottom: 0;
    left: var(--base-space);
    background: $border-color;
    width: calc(100% - 2 * var(--base-space));
  }

  &:last-child::after {
    display: none;
  }

  &.active {
    background: $primary-color;
  }

  &__title {
    @include text-ellipsis;
    font-weight: bold;
    margin-bottom: var(--base-space);
  }

  &__content {
    display: flex;
    gap: var(--base-space);
    font-size: 0.8rem;

    @media (max-width: $medium-screen) {
      font-size: 0.7rem;
      flex-wrap: wrap;
    }

    @media (max-width: $small-screen) {
      font-size: 0.6rem;
    }
  }

  &__text {
    @include text-ellipsis;
    color: $dark-gray-text;
  }

  &__date {
    white-space: nowrap;
    font-weight: 600;

    @media (max-width: $medium-screen) {
      display: none;
    }
  }
}
</style>
