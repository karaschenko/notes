<template>
  <button
    class="ui-icon-button"
    :class="{ active: isActive }"
    v-bind="$attrs"
    v-click-outside="clickOutsideHandler"
    @click="toggleActive"
  >
    <i v-if="icon" :class="`fas ${icon}`"></i>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({ icon: String });

const isActive = ref(false);

const toggleActive = () => {
  isActive.value = !isActive.value;
};

const clickOutsideHandler = () => {
  console.log("clickouts");
  isActive.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.ui-icon-button {
  outline: none;
  cursor: pointer;
  padding: var(--base-space);
  border: 1px solid transparent;
  border-radius: 3px;
  transition: all 0.3s ease-out;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--base-space);
  & .fas {
    font-size: 1.2rem;
    color: $light-gray-text;
    margin-right: calc(0.5 * var(--base-space));

    @media (max-width: $medium-screen) {
      font-size: 1rem;
    }

    @media (max-width: $small-screen) {
      font-size: 0.85rem;
    }
  }

  &:hover {
    background: $primary-color;

    & .fas {
      color: #fff;
    }
  }

  &.active:not(:hover) {
    background: $platinum-color;
    color: $black-text;
  }
}
</style>
