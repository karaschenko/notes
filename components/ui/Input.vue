<template>
  <div class="ui-input">
    <i v-if="icon" :class="`fas ${icon}`"></i>
    <input type="text" :value="value" @input="updateValue($event)" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  icon: String,
  value: String,
  updateValue: Function, // Custom prop to handle two-way binding
});

const emits = defineEmits(["update:value"]); // Emit the update event

const updateValue = (event) => {
  props.updateValue(event.target.value);
  emits("update:value", event.target.value);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.ui-input {
  position: relative;
}
</style>
