<template>
  <div>
    <Header />
    <h2>Create New Course</h2>
    <form @submit.prevent="submitCourse">
      <InputText v-model="title" placeholder="Course Title" required />
      <InputTextarea v-model="description" placeholder="Course Description" required />
      <Button label="Create Course" type="submit" />
    </form>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import InputText from 'primevue/inputtext';
import InputTextarea from 'primevue/inputtextarea';
import Button from 'primevue/button';

const store = useStore();
const router = useRouter();

const title = ref('');
const description = ref('');

const submitCourse = () => {
  const course = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    teacherId: store.state.currentUser.id,
    image: '', // Add logic to handle course image
    materials: [],
    assignments: [],
    students: [],
    comments: [],
    recommended: false,
    popular: false,
    latest: false
  };
  store.dispatch('createCourse', course);
  router.push('/teacher/dashboard');
};
</script>

<style scoped>
/* Add any custom styles here */
</style>