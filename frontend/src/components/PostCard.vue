<template>
  <div class="card">
    <!-- Title -->
    <div>
      <!-- Use v-html to allow xss attack -->
      <h1 v-html="data.title"></h1>
    </div>
    <!-- Image -->
    <div class="image">
      <img :src="data.content" alt="Image" width="100%" height="100%" />
    </div>
    <!-- Reaction section -->
    <div class="reaction-section">
      <!-- Heart button -->
      <button @click="toggleLike" :class="{ liked: isLiked }" class="heart-button">
        <span class="material-icons" :style="{ color: isLiked ? 'red' : 'black' }">
          {{ isLiked ? 'favorite' : 'favorite_border' }}
        </span>
        <span>{{ likes + (isLiked ? 1 : 0) }}</span>
      </button>

      <!-- Comment button -->
      <button @click="toggleComments" class="heart-button">
        <span>{{ comments.length }}</span>
        <span class="material-icons"> chat_bubble_outline </span>
      </button>

      <!-- Share button -->
      <button class="heart-button">
        <span class="material-icons"> share </span>
      </button>
    </div>

    <!-- Comment section -->

    <div v-if="showComments" class="comment_section">
      <div class="comment" v-for="comment in comments" :key="comment.id">
        <!-- Autor -->
        <div class="comment_header">
          <Avatar :userName="comment.username" :size="30" />
          <span> {{ comment.username }}</span>
        </div>

        <!-- Content -->
        <div style="padding: 10px" v-html="comment.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post, CommentData } from './types'
import Avatar from './Avatar.vue'
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps<{
  data: Post
}>()

const isLiked = ref(false)
const likes = ref(Math.floor(Math.random() * 1000))
const showComments = ref(false)

const comments = ref<CommentData[]>([])

axios.get(`/api/post/${props.data.id}/comments`).then((response) => {
  const temp: CommentData[] = response.data
  temp.forEach((comment) => {
    axios.get('/api/user/' + comment.user_id).then((response) => {
      comment.username = response.data.username
    })
  })
  comments.value = temp
  console.log('comments:', comments.value)
})

const toggleLike = () => {
  isLiked.value = !isLiked.value
}

const toggleComments = () => {
  showComments.value = !showComments.value
}
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 10px;
}

.card:hover {
  transform: scale(1.005);
}

.card h1 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80%;
  max-height: 80%;
  border: 2px solid #ccc;
  border-radius: 15px;
}

.image img {
  max-width: 100%;
  max-height: 100%;
  border-radius: inherit;
}

.reaction-section {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

.heart-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.comment_section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.comment_section .comment:last-child {
  margin-bottom: 10px;
}

.comment {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 10px;
  border-radius: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
  width: 80%;
  gap: 10px;
}

.comment_header {
  display: flex;
  align-items: center;
  font-weight: bolder;
  gap: 10px;
}
</style>
