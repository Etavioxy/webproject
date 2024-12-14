<template>
  <div>
    <h3 v-if="!isSearch">{{ selectedCategory }} Courses</h3>
    <h3 v-else>Search Results for "{{ searchQuery }}"</h3>
    <Dropdown
      v-if="!isSearch"
      :options="sortOptions"
      v-model="sortKey"
      placeholder="Sort By"
      @change="sortCourses"
    />
    <DataView :value="filteredCourses" layout="grid">
      <template #gridItem="{ data }">
        <div class="course-item">
          <img :src="data.image" alt="Course Image" />
          <h4>{{ data.title }}</h4>
          <p>{{ data.description }}</p>
          <Button label="View Details" @click="viewCourse(data.id)" />
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const selectedCategory = ref(route.params.category || 'All');
const searchQuery = ref(route.query.query || '');
const isSearch = ref(route.name === 'SearchResults');

const sortOptions = [
  { label: 'Publish Time', value: 'timestamp' },
  { label: 'Registration Number', value: 'students.length' },
  { label: 'Update Time', value: 'updateTime' },
  { label: 'Likes', value: 'likes' },
];

const sortKey = ref(null);

const courses = computed(() => {
  if (isSearch.value) {
    // Filter courses by name based on the search query
    return store.state.courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  } else if (selectedCategory.value === 'All') {
    return store.state.courses;
  } else {
    return store.state.courses.filter(course => course.category === selectedCategory.value);
  }
});

const filteredCourses = ref([]);

const sortCourses = () => {
  if (sortKey.value) {
    filteredCourses.value = [...courses.value].sort((a, b) => {
      const aValue = eval(`a.${sortKey.value}`);
      const bValue = eval(`b.${sortKey.value}`);
      return bValue - aValue;
    });
  } else {
    filteredCourses.value = courses.value;
  }
};

const viewCourse = courseId => {
  router.push(`/course/${courseId}`);
};

watch(
  () => [courses.value, sortKey.value],
  () => {
    sortCourses();
  },
  { immediate: true }
);

// Watch for route changes to update search query
watch(
  () => route.query.query,
  newQuery => {
    searchQuery.value = newQuery || '';
  }
);
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