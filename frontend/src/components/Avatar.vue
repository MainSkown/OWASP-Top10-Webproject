<template>
  <div class="avatar-container">
    <div class="avatar">
      <svg :id="avatarId" :width="size" :height="size" class="avatar"></svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as jdenticon from 'jdenticon'

export default defineComponent({
  name: 'AvatarIcon',
  props: {
    userName: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 100
    }
  },
  computed: {
    avatarId(): string {
      return `avatar-${this.userName}`
    }
  },
  mounted() {
    this.generateAvatar()
  },
  methods: {
    generateAvatar() {
      jdenticon.update(`#${this.avatarId}`, this.userName)
    }
  }
})
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
}
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(230, 203, 173, 0.582);
  border-radius: 50%;
  overflow: hidden;
  padding: 3px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.466);
}
.has-background {
  background-color: var(--background-color);
}
</style>
