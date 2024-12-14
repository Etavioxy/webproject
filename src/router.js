import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import AccountPage from './pages/AccountPage.vue';
import StudentDashboard from './pages/StudentDashboard.vue';
import TeacherDashboard from './pages/TeacherDashboard.vue';
import CourseDetail from './pages/CourseDetail.vue';
import CourseList from './pages/CourseList.vue';
import ErrorPage from './pages/ErrorPage.vue';
import store from './store';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/account',
    name: 'AccountPage',
    component: AccountPage
  },
  {
    path: '/student/dashboard',
    name: 'StudentDashboard',
    component: StudentDashboard
  },
  {
    path: '/teacher/dashboard',
    name: 'TeacherDashboard',
    component: TeacherDashboard
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: CourseDetail
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: CourseList
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    component: ErrorPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.currentUser;
  if (to.name.startsWith('Student') && (!isAuthenticated || isAuthenticated.role !== 'student')) {
    next({ name: 'LoginPage' });
  } else if (to.name.startsWith('Teacher') && (!isAuthenticated || isAuthenticated.role !== 'teacher')) {
    next({ name: 'LoginPage' });
  } else if (to.name.startsWith('Account') && (!isAuthenticated || isAuthenticated.role === 'visitor')) {
    next({ name: 'LoginPage' });
  } else {
    next();
  }
});

export default router;