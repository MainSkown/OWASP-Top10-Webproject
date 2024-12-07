<template>
  <div class="header">
    <div class="left-header">
      <svg class="logo">
        <use xlink:href="/icon.svg"></use>
      </svg>

      <h1>CatWorld</h1>
    </div>

    <div class="right-header">
      <!-- Login / Register buttons -->
      <div v-if="!loggedIn">
        <button @click="showLoginDialog = true">Login</button>
        <button @click="showRegisterDialog = true">Register</button>
      </div>
      <!-- Logout button -->
      <div class="user-header" v-else>
        <div class="user_avatar">
          <Avatar :userName="username" :size="30" />
          <h3>{{ username }}</h3>
        </div>
        <button @click="logout">Logout</button>
      </div>
    </div>

    <!-- Login Dialog -->
    <div v-if="showLoginDialog" class="dialog-overlay">
      <div class="dialog">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <label for="login-username">Username:</label>
          <input id="login-username" v-model="loginUsername" type="text" required />
          <label for="login-password">Password:</label>
          <input id="login-password" v-model="loginPassword" type="password" required />
          <button type="submit">Login</button>
          <button type="button" @click="showLoginDialog = false">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Register Dialog -->
    <div v-if="showRegisterDialog" class="dialog-overlay">
      <div class="dialog">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <label for="register-username">Username:</label>
          <input id="register-username" v-model="registerUsername" type="text" required />
          <label for="register-password">Password:</label>
          <input id="register-password" v-model="registerPassword" type="password" required />
          <button type="submit">Register</button>
          <button type="button" @click="showRegisterDialog = false">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import Avatar from './Avatar.vue'

const $toast = useToast()

const showLoginDialog = ref(false)
const showRegisterDialog = ref(false)

const loginUsername = ref('')
const loginPassword = ref('')

const registerUsername = ref('')
const registerPassword = ref('')

const loggedIn = ref(localStorage.getItem('token') !== null)
const username = ref(localStorage.getItem('username') || 'User')

const login = async () => {
  try {
    const response = await axios.post('/api/user/login', {
      username: loginUsername.value,
      password: loginPassword.value
    })
    // Save token to local storage
    localStorage.setItem('token', response.data.token)
    loggedIn.value = true
    showLoginDialog.value = false
    username.value = loginUsername.value
    localStorage.setItem('username', loginUsername.value)
    $toast.open({
      message: 'Login successful',
      type: 'success'
    })
  } catch (error) {
    console.error('Login failed:', error)
    $toast.error('Login failed')
  }
}

const register = async () => {
  try {
    const response = await axios.post('/api/user/register', {
      username: registerUsername.value,
      password: registerPassword.value
    })
    console.log('Registration successful:', response.data)
    showRegisterDialog.value = false
    $toast.success('Registration successful')
  } catch (error) {
    console.error('Registration failed:', error)
    $toast.error('Registration failed')
  }
}

const logout = () => {
  loggedIn.value = false
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  $toast.open({
    message: 'Logout successful',
    type: 'success'
  })
}
</script>

<style scoped>
.header {
  background-color: #f3f3f3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  box-shadow: 0 2px 4px 0 #4612127a;
  background: linear-gradient(to bottom, #f3f3f3 90%, #4612127a);
}

.left-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  h1 {
    background: linear-gradient(to top right, #461212, #f01763);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: linear-gradient(45deg, #461212, #f01763);
  -webkit-mask: url('/icon.svg') no-repeat center;
  mask: url('/icon.svg') no-repeat center;
  -webkit-mask-size: cover;
  mask-size: cover;
}

.right-header {
  display: flex;
  align-items: center;
  padding-right: 20px;
  button {
    margin-left: 10px;
  }
}

.right-header button {
  background: none;
  color: #461212;
  border: 2px solid #461212;
  padding: 5px 10px;
  border-radius: 5px;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: white;
  color: black;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dialog h2 {
  margin-top: 0;
}

.dialog form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dialog button {
  margin-top: 10px;
}

.user-header {
  display: flex;
  align-items: center;
}

.user_avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.user_avatar h3 {
  margin: 0;
  background: linear-gradient(to top right, #461212, #f01763);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
