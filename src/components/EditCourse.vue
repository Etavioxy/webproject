<template>
  <div>
    <Header />
    <h2>Edit Course</h2>
    <form @submit.prevent="submitCourse">
      <InputText v-model="title" placeholder="Course Title" required />
      <InputTextarea v-model="description" placeholder="Course Description" required />
      <Button label="Save Changes" type="submit" />
    </form>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import InputText from 'primevue/inputtext';
import InputTextarea from 'primevue/inputtextarea';
import Button from 'primevue/button';

const store = useStore();
const route = useRoute();
const router = useRouter();

const courseId = route.params.id;
const course = ref(null);

const title = ref('');
const description = ref('');

onMounted(() => {
  course.value = store.state.courses.find(c => c.id === parseInt(courseId));
  if (course.value) {
    title.value = course.value.title;
    description.value = course.value.description;
  }
});

const submitCourse = () => {
  const updatedCourse = {
    ...course.value,
    title: title.value,
    description: description.value
  };
  store.dispatch('editCourse', updatedCourse);
  router.push('/teacher/dashboard');
};
</script>

<style scoped>
/* Add any custom styles here */
</style>