<template>
  <div class="toaster" :class="{ show: showToaster }">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { useToasterStore } from "@/store/toasterStore";

const text = computed(() => useToasterStore().text);
const showToaster = computed(() => useToasterStore().showToaster);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.toaster {
  display: none;
}

.toaster.show {
  display: block;
  position: fixed;
  background: $primary-color;
  padding: calc(3 * var(--base-space));
  bottom: calc(2 * var(--base-space));
  right: calc(2 * var(--base-space));
  font-size: calc(2.5 * var(--base-space));
  border-radius: 7px;
}
</style>
