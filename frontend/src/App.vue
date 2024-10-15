<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'
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
