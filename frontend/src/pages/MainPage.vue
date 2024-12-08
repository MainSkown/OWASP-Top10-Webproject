<template>
  <div class="page_container">
    <div class="button_container">
      <button class="add_button" @click="showCreatePostDialog = true">
        <span class="material-icons icon"> add_circle </span>
        <span> Add post </span>
      </button>
    </div>
    <div class="card_container">
      <PostCard v-for="post in posts" :key="post.id" :data="post" />
    </div>
  </div>
  <!-- Create Post Dialog -->
  <div v-if="showCreatePostDialog" class="dialog-overlay">
    <div class="dialog">
      <h2>Create Post</h2>
      <form @submit.prevent="createPost">
        <label for="post-title">Title:</label>
        <input id="post-title" v-model="newPostTitle" type="text" required />
        <label for="post-url">URL Link:</label>
        <input id="post-url" v-model="newPostUrl" type="text" required />
        <button type="submit">Create</button>
        <button type="button" @click="showCreatePostDialog = false">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/components/types'
import PostCard from '../components/PostCard.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

const posts = ref<Post[]>([])

const showCreatePostDialog = ref(false)
const newPostTitle = ref('')
const newPostUrl = ref('')

const updatePosts = async () => {
  try {
    const response = await axios.get('/api/posts')
    posts.value = response.data
  } catch (error: any) {
    if (error.response.status === 404) {
      $toast.error('Could not connect to backend, is it active?')
    }
    console.error('Error updating posts:', error)
  }
}

updatePosts()

const createPost = async () => {
  const token = localStorage.getItem('token')
  try {
    await axios.post(
      '/api/post',
      {
        title: newPostTitle.value,
        content: newPostUrl.value
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    updatePosts()
    showCreatePostDialog.value = false
    newPostTitle.value = ''
    newPostUrl.value = ''
  } catch (error: any) {
    if (error.response.status === 400) {
      $toast.error('There is an issue with the data you provided. Url must point to an image')
    } else {
      $toast.error('There was an error creating the post')
      console.error('Error creating post:', error)
    }
  }
}
</script>

<style>
.card_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page_container {
  overflow-y: scroll;
  height: 87vh;
  width: 100vw;
  margin-top: 10px;
}

.button_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add_button {
  background: linear-gradient(to top right, #461212, #f01763);
  color: white;
  border: none;
  border-radius: 30px;
  width: fit-content;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.466);
  font-size: x-large;
  font-weight: bold;
  gap: 10px;
  padding: 20px;
}

.add_button:hover {
  background: linear-gradient(45deg, #f01763, #f55d92);
}

.icon {
  font-size: 32px; /* Ustawienie rozmiaru ikony */
}
</style>
