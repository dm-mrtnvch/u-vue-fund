<template>
  <div class="navbar">
    <div @click="$router.push('/')">vue 3</div>
   <div class="navbar__btns">
     <my-button @click="
$router.push('/posts')">posts</my-button>
     <my-button @click="$router.push('/about')">about site</my-button>
   </div>
<!--    <router-link to="posts">posts</router-link>-->
<!--    <router-link to="/about">about</router-link>-->
  </div>
</template>

<script>
import router from '@/router/router';

import MyButton from '@/components/UI/MyButton';
export default {
  components: {MyButton}
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
  cursor: pointer;
}

.navbar__btns > button:first-child {
  margin-right: 15px;
}
</style>
