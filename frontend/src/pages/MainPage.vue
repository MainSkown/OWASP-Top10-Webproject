<template>
  <div class="card_container">
    <PostCard v-for="post in posts" :key="post.id" :data="post" />
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/components/types'
import PostCard from '../components/PostCard.vue'
import axios from 'axios'
import { ref } from 'vue';

const posts = ref<Post[]>([])

axios.get('/api/posts').then((response) => {
  posts.value = response.data;
});

</script>

<style>
.card_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  padding: 3px;
}
</style>
