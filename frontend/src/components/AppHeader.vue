<template>
  <div class="header">
    <div class="left-header">
      <svg class="logo">
        <use xlink:href="/icon.svg"></use>
      </svg>

      <h1>CatWorld</h1>
    </div>
    <div class="right-header">
      
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'AppHeader',
  
}
</script>

<style scoped>
.header {
  background-color: #f3f3f3;
  display: flex;
  justify-content: start;
  width: 100vw;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.left-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f3f3;
  padding-left: 10px;
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
</style>
