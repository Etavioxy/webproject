<template>
  <div>
    <Header />
    <h2>My Learning</h2>
    <div class="course-registration">
      <h3>Register for Courses</h3>
      <DataView :value="availableCourses" layout="grid">
        <template #gridItem="{ data }">
          <div class="course-item">
            <img :src="data.image" alt="Course Image" />
            <h4>{{ data.title }}</h4>
            <p>{{ data.description }}</p>
            <Button label="Register" @click="registerCourse(data.id)" />
          </div>
        </template>
      </DataView>
    </div>
    <div class="my-courses">
      <h3>My Courses</h3>
      <DataView :value="registeredCourses" layout="grid">
        <template #gridItem="{ data }">
          <div class="course-item">
            <img :src="data.image" alt="Course Image" />
            <h4>{{ data.title }}</h4>
            <Button label="View Course" @click="viewCourse(data.id)" />
          </div>
        </template>
      </DataView>
    </div>
    <!-- <div class="tasks">
      <h3>My Tasks</h3>
      <DataView :value="tasks" layout="list">
        <template #listItem="{ data }">
          <div class="task-item">
            <h4>{{ data.title }}</h4>
            <p>{{ data.description }}</p>
            <Button label="Submit Assignment" @click="submitAssignment(data.id)" v-if="data.type === 'assignment'" />
            <Button label="Complete Exercise" @click="completeExercise(data.id)" v-if="data.type === 'exercise'" />
            <Button label="Take Exam" @click="takeExam(data.id)" v-if="data.type === 'exam'" />
          </div>
        </template>
      </DataView>
    </div> -->
    <Footer />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';

const store = useStore();
const router = useRouter();

console.log(store.state.currentUser);

const availableCourses = computed(() => store.state.courses.filter(course => !store.state.currentUser.registeredCourses.includes(course.id)));
const registeredCourses = computed(() => store.state.courses.filter(course => store.state.currentUser.registeredCourses.includes(course.id)));
// const tasks = computed(() => store.state.tasks.filter(task => task.userId === store.state.currentUser.id));

const registerCourse = (courseId) => {
  store.dispatch('registerCourse', { userId: store.state.currentUser.id, courseId });
};

const viewCourse = (courseId) => {
  router.push(`/course/${courseId}`);
};

const submitAssignment = (taskId) => {
  router.push(`/assignment/submit/${taskId}`);
};

// const completeExercise = (taskId) => {
//   // Logic to complete exercise
// };

// const takeExam = (taskId) => {
//   // Logic to take exam
// };
</script>

<style scoped>
.course-registration, .my-courses, .tasks {
  margin-bottom: 20px;
}

.course-item, .task-item {
  text-align: center;
}

.course-item img, .task-item img {
  width: 100%;
  height: auto;
}
</style>