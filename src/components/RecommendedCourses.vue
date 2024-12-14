<template>
  <div>
    <h3>Recommended Courses</h3>
    <DataView :value="courses">
      <template #listItem="{ data }">
        <div class="course-item">
          <img :src="data.image" alt="Course Image" />
          <h4>{{ data.title }}</h4>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import DataView from 'primevue/dataview';

const store = useStore();

const courses = computed(() => store.getters.recommendedCourses);
</script>

<style scoped>
.course-item {
  display: flex;
  align-items: center;
}
.course-item img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>