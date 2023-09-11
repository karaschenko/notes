<template>
  <li :class="{ active: note.id === activeId }" class="notes-item">
    <div class="notes-item__title">{{ note?.title }}</div>
    <div class="notes-item__content">
      <div class="notes-item__date">{{ note?.date }}</div>
      <div class="notes-item__text">{{ note?.content }}</div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { Note } from "~/types/types";

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
    font-weight: bold;

    @media (max-width: $medium-screen) {
      display: none;
    }
  }
}
</style>
