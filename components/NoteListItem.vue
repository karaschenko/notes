<template>
  <li class="notes-item">
    <div class="notes-item__title">{{ note?.title }}</div>
    <div class="notes-item__content">
      <div class="notes-item__date">{{ note?.date }}</div>
      <div class="notes-item__text">{{ note?.content }}</div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineProps } from 'vue';
import { Note } from '~/types/types';

export default {
  props: {
    note: Object as () => Note,
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.notes-item {
    list-style: none;
    padding: $base-space;
}

</style>
