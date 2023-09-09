<template>
    <div class="container">
        <slot />
    </div>

</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap',
        },
      ],
    };
  },
};
</script>