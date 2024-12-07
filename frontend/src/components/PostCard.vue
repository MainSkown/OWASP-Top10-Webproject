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
      <!-- Post comment -->
      <div class="comment-input-container">
        <input
          class="comment-input"
          type="text"
          :placeholder="isLoggedIn ? 'Add a comment' : 'Login to comment'"
          :disabled="!isLoggedIn"
          :class="{ disabled: !isLoggedIn }"
          v-model="user_comment"
        />
        <button @click="postComment" class="comment-button">Post</button>
      </div>
      <!-- Comments -->
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
import { useToast } from 'vue-toast-notification'

const isLoggedIn = ref(!!localStorage.getItem('token'))

window.addEventListener('login-change-state', () => {
  isLoggedIn.value = !!localStorage.getItem('token')
})

const $toast = useToast()

const props = defineProps<{
  data: Post
}>()

const isLiked = ref(false)
const likes = ref(Math.floor(Math.random() * 1000))
const showComments = ref(false)

const comments = ref<CommentData[]>([])

async function updateComments() {
  try {
    const response = await axios.get(`/api/post/${props.data.id}/comments`)
    const temp: CommentData[] = response.data
    for (const comment of temp) {
      const userResponse = await axios.get('/api/user/' + comment.user_id)
      comment.username = userResponse.data.username
    }
    comments.value = temp
  } catch (error) {
    console.error(error)
  }
}

updateComments()

const user_comment = ref('')

function postComment() {
  const token = localStorage.getItem('token')
  if (!token) {
    $toast.error('You need to be logged in to comment')
    return
  }
  axios
    .post(
      `/api/post/${props.data.id}/comment`,
      {
        content: user_comment.value
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => {
      user_comment.value = ''
      updateComments()
    })
    .catch((error) => {
      console.error(error)
    })
}

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
  border: 4px solid transparent;
  border-radius: 20px;
  background: linear-gradient(45deg, #ede7e7, #fcd1e0), linear-gradient(45deg, #461212, #f01763);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
  width: 80%;
  gap: 10px;
  position: relative;
}

.comment_header {
  display: flex;
  align-items: center;
  font-weight: bolder;
  gap: 10px;
}

.comment_header {
  display: flex;
  align-items: center;
  font-weight: bolder;
  gap: 10px;
}

.comment-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  width: 85%;
}

.comment-button {
  background: linear-gradient(45deg, #7e5959, #f55d92);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-end;
}

.comment-input {
  width: 96%;
  height: 5vh;
  padding: 5px;  
  border: 2px solid transparent;
  border-radius: 5px;
  background: linear-gradient(45deg, #ede7e7, #fcd1e0), linear-gradient(45deg, #461212, #f01763);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  color: #333;
}

.comment-input.disabled {
  background-color: #f9f9f9;
  cursor: not-allowed;
}
</style>
