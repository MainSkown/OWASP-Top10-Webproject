<template>
  <div class="admin-page">
    <h1>
      {{ message }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const message = ref('')
const token = localStorage.getItem('token')

axios
  .get('/api/admin', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => {
    message.value = response.data
  })
  .catch((error) => {
    console.error('Admin error', error)
    message.value = error.response.data
  })
</script>

<style>
.admin-page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
}
</style>
