<template>
  <div class="error-page">
    <h1>页面未找到</h1>
    <p>抱歉，您访问的页面不存在。</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script setup>
// Add any necessary script here
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}
</style>