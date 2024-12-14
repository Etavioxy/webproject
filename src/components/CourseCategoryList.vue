<template>
  <div class="category-list">
    <Button v-for="category in categories" :key="category" label="category" @click="selectCategory(category)" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';

const categories = ['Math', 'Science', 'Arts', 'Technology']; // Replace with actual categories

const selectCategory = (category) => {
  // Navigate to course list with selected category
};
</script>

<style scoped>
.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>