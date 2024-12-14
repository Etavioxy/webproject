<template>
  <div>
    <Header />
    <div v-if="user">
      <h2>Welcome, {{ user.nickname || user.username }}</h2>
      <TabView>
        <TabPanel header="Profile">
          <!-- Profile editing form -->
        </TabPanel>
        <TabPanel header="My Courses" v-if="user.role === 'student'">
          <!-- List of registered courses -->
        </TabPanel>
        <TabPanel header="Course Management" v-if="user.role === 'teacher'">
          <!-- Course creation and management -->
        </TabPanel>
        <TabPanel header="User Management" v-if="user.role === 'admin'">
          <!-- User management functionalities -->
        </TabPanel>
      </TabView>
      <button @click="handleLogout">Logout</button>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import { User } from '../classes';

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.currentUser);

const handleLogout = () => {
  store.commit('setCurrentUser', new User(-1, '', '', 'visitor'));
  router.push('/');
  alert('You have been logged out.');
};
</script>

<style scoped>
/* Add any custom styles here */
</style>