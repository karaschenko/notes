<template>
  <div class="container">
    <h1 class="app-name">{{ head.title }}</h1>
    <slot />
  </div>
</template>

<script setup lang="ts">
const head = {
  title: "Your Notes",
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap",
    },
  ],
};
</script>
