<template>
  <div class="ui-input">
    <i v-if="icon" :class="`fas ${icon}`"></i>
    <input
      type="text"
      v-bind="$attrs"
      :value="value"
      @input="updateValue($event)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  icon: String,
  value: String,
  updateValue: Function,
});

const emits = defineEmits(["update:value"]);

const updateValue = (event) => {
  props.updateValue(event.target.value);
  emits("update:value", event.target.value);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.ui-input {
  outline: none;
  position: relative;
  padding: var(--base-space);
  transition: all 0.3s ease-out;
  background: transparent;
  display: flex;
  align-items: center;
  gap: var(--base-space);
  width: auto;
  height: auto;

  input {
    width: 100%;
    padding: calc(0.8 * var(--base-space)) calc(3 * var(--base-space));
    border: 1px solid $border-color;
    border-radius: 6px;
    outline: none;

    @media (max-width: $medium-screen) {
      padding: calc(0.7 * var(--base-space)) calc(4 * var(--base-space));
    }
  }

  & .fas {
    font-size: 1rem;
    color: $light-gray-text;
    position: absolute;
    z-index: 1;
    left: calc(0.8 * var(--base-space));
    margin-left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: $medium-screen) {
      font-size: 0.8rem;
    }

    @media (max-width: $small-screen) {
      font-size: 0.6rem;
    }
  }
}
</style>
