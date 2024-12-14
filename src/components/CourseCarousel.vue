<template>
  <Carousel :value="courses" numVisible="3" numScroll="1">
    <template #item="{ data }">
      <div class="course-item">
        <img :src="data.image" alt="Course Image" />
        <h3>{{ data.title }}</h3>
      </div>
    </template>
  </Carousel>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Carousel from 'primevue/carousel';

const store = useStore();

const courses = computed(() => store.getters.latestCourses);
</script>

<style scoped>
.course-item {
  text-align: center;
}
.course-item img {
  width: 100%;
  height: auto;
}
</style>