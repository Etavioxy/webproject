<template>
  <div>
    <Header />
    <h2>{{ course.title }}</h2>
    <p>{{ course.description }}</p>
    <TabView>
      <TabPanel header="Course Materials">
        <Listbox :options="course.materials" optionLabel="name" />
      </TabPanel>
      <TabPanel header="Discussion">
        <div v-if="isVisitor">
          <p>You need to log in to participate in discussions.</p>
        </div>
        <div v-else>
          <!-- Discussion component or logic here -->
        </div>
      </TabPanel>
      <TabPanel header="Notes" v-if="!isVisitor">
        <!-- Personal notes component or logic here -->
      </TabPanel>
    </TabView>
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Listbox from 'primevue/listbox';

const store = useStore();
const route = useRoute();

const courseId = parseInt(route.params.id);
const course = computed(() => store.state.courses.find(c => c.id === courseId));

const isVisitor = computed(() => {
  const user = store.state.currentUser;
  return !user || user.role === 'visitor';
});
</script>

<style scoped>
/* Add any custom styles here */
</style>