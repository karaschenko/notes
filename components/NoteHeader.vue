<template>
  <div class="note-toolbar">
    <div class="note-toolbar__left">
      <ui-icon-button icon="fa-edit" @click="editNote" />
    </div>
    <div class="note-toolbar__right">
      <input
        v-model="searchText"
        type="text"
        class="note-toolbar__search"
        placeholder="Search..."
      />
      <button class="note-toolbar__button">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const editNote = () => {
  console.log("edit");
};

const searchText = ref("");
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
.note-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2 * $base-space;
}

.note-toolbar__left {
  display: flex;
  align-items: center;
}
s .note-toolbar__right {
  display: flex;
  align-items: center;
}
</style>
