<template>
  <div class="card_container">
    <PostCard :data="post" />
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/components/types'
import PostCard from '../components/PostCard.vue'

const post: Post = {
  id: '1',
  title: 'Cat',
  content: 'https://www.purina.pl/sites/default/files/2021-02/CAT%20HERO_0012_Maine_coon.jpg',
  likes: 281,
  comments: [
    {
      id: '2',
      autor: 'John',
      content: 'This is a comment'
    }
  ]
}
</script>

<style>
.card_container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  padding: 3px;
}
</style>
