import { createStore } from 'vuex';

import { User, Course, Assignment, Submission } from './classes';

const student1 = new User(1, 'zhangsan', 'password123', 'student');
student1.avatar = 'avatar1.png';
student1.nickname = '张三';
student1.signature = '努力学习，天天向上';

const student2 = new User(2, 'lisi', 'password456', 'student');
student2.avatar = 'avatar2.png';
student2.nickname = '李四';
student2.signature = '学海无涯苦作舟';

const student3 = new User(3, 'wangwu', 'password789', 'student');
student3.avatar = 'avatar3.png';
student3.nickname = '王五';
student3.signature = '书山有路勤为径';

const teacher1 = new User(4, 'wangzhiru', 'password123', 'teacher');
teacher1.avatar = 'avatar4.png';
teacher1.nickname = '王志茹';
teacher1.signature = '湖北大学';

const teacher2 = new User(5, 'liujinshou', 'password456', 'teacher');
teacher2.avatar = 'avatar5.png';
teacher2.nickname = '刘金寿';
teacher2.signature = '大连大学';

const teacher3 = new User(6, 'wuxiaoyin', 'password789', 'teacher');
teacher3.avatar = 'avatar6.png';
teacher3.nickname = '吴小吟';
teacher3.signature = '南昌大学';

const teacher4 = new User(7, 'hongyun', 'password123', 'teacher');
teacher4.avatar = 'avatar7.png';
teacher4.nickname = '洪云';
teacher4.signature = '昆明理工大学';

const teacher5 = new User(8, 'sunshuilin', 'password456', 'teacher');
teacher5.avatar = 'avatar8.png';
teacher5.nickname = '孙水林';
teacher5.signature = '南昌大学';

const teacher6 = new User(9, 'zhangxuejiao', 'password789', 'teacher');
teacher6.avatar = 'avatar9.png';
teacher6.nickname = '张雪娇';
teacher6.signature = '广州大学';

const course1 = new Course(1, '英语畅谈中国', '语言', teacher1.id);
const course2 = new Course(2, '现代科技与人类未来（国家精品）', '科技', teacher2.id);
const course3 = new Course(3, '宇宙探索与发现（国家精品）', '科技', teacher2.id);
const course4 = new Course(4, '女生穿搭技巧', '生活', teacher3.id);
const course5 = new Course(5, '不负卿春—大学生职业生涯规划', '职业规划', teacher4.id);
const course6 = new Course(6, '无处不在—传染病', '医学', teacher5.id);
const course7 = new Course(7, '中国近现代史纲要', '历史', teacher6.id);

export default createStore({
  state: {
    currentUser: new User(-1, '', '', 'visitor'),
    users: [student1, student2, student3, teacher1, teacher2, teacher3, teacher4, teacher5, teacher6],
    courses: [course1, course2, course3, course4, course5, course6, course7],
    assignments: []
  },
  mutations: {
    // ...existing code...
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    addUser(state, user) {
      state.users.push(user);
    },
    updateUser(state, user) {
      const index = state.users.findIndex(u => u.id === user.id);
      if (index !== -1) state.users.splice(index, 1, user);
    },
    updateUserProperty(state, { userId, property, value }) {
      const user = state.users.find(u => u.id === userId);
      if (user) {
        Vue.set(user, property, value);
      }
    },
    addCourse(state, course) {
      state.courses.push(course);
    },
    updateCourse(state, course) {
      const index = state.courses.findIndex(c => c.id === course.id);
      if (index !== -1) state.courses.splice(index, 1, course);
    },
    deleteCourse(state, courseId) {
      state.courses = state.courses.filter(course => course.id !== courseId);
    },
    updateCourseProperty(state, { courseId, property, value }) {
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        Vue.set(course, property, value);
      }
    },
    registerCourse(state, { userId, courseId }) {
      const user = state.users.find(u => u.id === userId);
      if (user && !user.registeredCourses.includes(courseId)) {
        user.registeredCourses.push(courseId);
      }
    },
    addAssignment(state, assignment) {
      state.assignments.push(assignment);
    },
    updateAssignment(state, assignment) {
      const index = state.assignments.findIndex(a => a.id === assignment.id);
      if (index !== -1) state.assignments.splice(index, 1, assignment);
    },
    addsubmission(state, { assignmentId, submission }) {
      const assignment = state.assignments.find(a => a.id === assignmentId);
      if (assignment) {
        assignment.submissions.push(submission);
      }
    }
  },
  actions: {
    // ...existing code...
    changeCurrentUser({ commit }, user) {
      commit('setCurrentUser', user);
    },
    registerUser({ commit }, user) {
      commit('addUser', user);
    },
    publishCourse({ commit }, course) {
      commit('addCourse', course);
    },
    createCourse({ commit }, course) {
      commit('addCourse', course);
    },
    editCourse({ commit }, course) {
      commit('updateCourse', course);
    },
    deleteCourse({ commit }, courseId) {
      commit('deleteCourse', courseId);
    },
    registerCourse({ commit }, payload) {
      commit('registerCourse', payload);
    },
    submitAssignment({ commit }, assignment) {
      commit('addAssignment', assignment);
    },
    updateUserProperty({ commit }, payload) {
      commit('updateUserProperty', payload);
    },
    updateCourseProperty({ commit }, payload) {
      commit('updateCourseProperty', payload);
    },
    updateAssignment({ commit }, assignment) {
      commit('updateAssignment', assignment);
    },
    gradeSubmission({ commit }, { assignmentId, submissionId, grade, feedback }) {
      const submission = new Submission(submissionId, grade, feedback);
      commit('addsubmission', { assignmentId, submission });
    }
    // ...existing code...
  },
  getters: {
    recommendedCourses: (state) => {
      return state.courses.filter(course => course.recommended);
    },
    popularCourses: (state) => {
      return state.courses.filter(course => course.popular);
    },
    latestCourses: (state) => {
      return state.courses.sort((a, b) => b.timestamp - a.timestamp);
    },
  }
});