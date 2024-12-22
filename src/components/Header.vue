<template>
  <header>
    <img src="../assets/logo.png" alt="Logo" class="logo" />
    <Menubar :model="items" />
    <div class="search-container">
      <InputText v-model="searchQuery" placeholder="Search courses..." />
      <Button label="Search" icon="pi pi-search" @click="performSearch" />
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const store = useStore();
const router = useRouter();

const searchQuery = ref('');

const items = computed(() => [
  { label: 'Home', command: () => { router.push('/') } },
  {
    label: store.state.currentUser.role === 'visitor' ? 'Login':'Account',
    command: () => {
      router.push('/account')
    }
  },
  {
    label: 'Dashboard',
    command: () => {
      // check if the user is a student or teacher
      if (store.state.currentUser.role === 'student') {
        router.push('/student/dashboard')
      } else if (store.state.currentUser.role === 'teacher') {
        router.push('/teacher/dashboard')
      }
    }
  },
  // Add more navigation items as needed
]);

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'SearchResults', query: { query: searchQuery.value.trim() } });
  }
};
</script>

<style scoped>
.logo {
  height: 50px;
}
</style>