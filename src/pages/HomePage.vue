<template>
    <div>
      <Header />
      <CourseCarousel />
      <CourseCategoryList />
      <RecommendedCourses />
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '../components/Header.vue';
  import CourseCarousel from '../components/CourseCarousel.vue';
  import CourseCategoryList from '../components/CourseCategoryList.vue';
  import RecommendedCourses from '../components/RecommendedCourses.vue';
  import Footer from '../components/Footer.vue';
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>