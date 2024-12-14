<template>
  <div>
    <Header />
    <h2>Teacher Dashboard</h2>
    <div class="course-management">
      <h3>Manage Courses</h3>
      <Button label="Create New Course" @click="createNewCourse" />
      <DataView :value="teacherCourses" layout="grid">
        <template #gridItem="{ data }">
          <div class="course-item">
            <img :src="data.image" alt="Course Image" />
            <h4>{{ data.title }}</h4>
            <p>{{ data.description }}</p>
            <Button label="Edit Course" @click="editCourse(data.id)" />
            <Button label="Delete Course" @click="deleteCourse(data.id)" />
          </div>
        </template>
      </DataView>
    </div>
    <div class="material-management">
      <h3>Manage Course Materials</h3>
      <FileUpload name="demo[]" url="./upload" multiple accept="image/*,video/*,application/pdf" @upload="onUpload" />
      <DataView :value="courseMaterials" layout="grid">
        <template #gridItem="{ data }">
          <div class="material-item">
            <img v-if="data.type === 'image'" :src="data.url" alt="Material Image" />
            <video v-if="data.type === 'video'" controls>
              <source :src="data.url" type="video/mp4" />
            </video>
            <a v-if="data.type === 'document'" :href="data.url" target="_blank">{{ data.name }}</a>
            <Button label="Delete" @click="deleteMaterial(data.id)" />
          </div>
        </template>
      </DataView>
    </div>
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
import FileUpload from 'primevue/fileupload';

const store = useStore();
const router = useRouter();

const teacherCourses = computed(() => store.state.courses.filter(course => course.teacherId === store.state.currentUser.id));
const courseMaterials = ref([]);

const createNewCourse = () => {
  router.push('/teacher/create-course');
};

const editCourse = (courseId) => {
  router.push(`/teacher/edit-course/${courseId}`);
};

const deleteCourse = (courseId) => {
  store.dispatch('deleteCourse', courseId);
};

const onUpload = (event) => {
  const uploadedFiles = event.files;
  uploadedFiles.forEach(file => {
    const material = {
      id: Date.now(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'document'
    };
    courseMaterials.value.push(material);
  });
};

const deleteMaterial = (materialId) => {
  courseMaterials.value = courseMaterials.value.filter(material => material.id !== materialId);
};
</script>

<style scoped>
.course-management, .material-management {
  margin-bottom: 20px;
}

.course-item, .material-item {
  text-align: center;
}

.course-item img, .material-item img, .material-item video {
  width: 100%;
  height: auto;
}
</style>