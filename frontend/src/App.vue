<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
</script>

<template>
  <header>
    <Header> </Header>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
