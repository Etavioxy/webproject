<template>
  <div class="login-page">
    <h1>登录</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">用户名:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">密码:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">登录</button>
    </form>
    <p>'张三', 'zhangsan', 'password123', 'student';</p>
    <p>'洪云', 'hongyun', 'password123', 'teacher';</p>

    <h1>注册</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="regUsername">用户名:</label>
        <input type="text" v-model="regUsername" id="regUsername" required />
      </div>
      <div>
        <label for="regPassword">密码:</label>
        <input type="password" v-model="regPassword" id="regPassword" required />
      </div>
      <div>
        <label for="role">角色:</label>
        <select v-model="role" id="role" required>
          <option value="student">学生</option>
          <option value="teacher">教师</option>
        </select>
      </div>
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import { mapActions, useStore } from 'vuex';

const store = useStore();

export default {
  data() {
    return {
      username: '',
      password: '',
      regUsername: '',
      regPassword: '',
      role: 'student'
    };
  },
  methods: {
    ...mapActions(['registerUser', 'changeCurrentUser']),
    handleLogin() {
      // 登录逻辑
      const user = this.$store.state.users.find(
        user => user.username === this.username && user.password === this.password
      );
      if (user) {
        // 处理登录成功后的逻辑
        this.changeCurrentUser(user);
        this.$router.push('/');
        alert('登录成功');
      } else {
        alert('用户名或密码错误');
      }
    },
    handleRegister() {
      // 注册逻辑
      const newUser = {
        id: Date.now(),
        username: this.regUsername,
        password: this.regPassword,
        role: this.role,
        avatar: '',
        nickname: '',
        signature: '',
        todoList: [],
        history: [],
        notes: [],
        favorites: [],
        mistakes: [],
        discussions: []
      };
      this.registerUser(newUser);
      alert('注册成功');
      // 清空注册表单
      this.regUsername = '';
      this.regPassword = '';
      this.role = 'student';
    }
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form {
  margin-bottom: 2em;
}

div {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input, select {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  background-color: #1a73e8;
  color: white;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background-color: #0c47a1;
}
</style>