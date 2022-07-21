<template>
  <div class="app">
    <post-form @create="createPost"/>
    <post-list :posts="posts" @remove="removePost"/>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

export default {
  components: {PostList, PostForm},
  data() {
    return {
      posts: [
        {
          id: 1,
          name: 'js',
          body: 'some decription about js'
        },
        {
          id: 2,
          name: 'ts',
          body: 'some decription about ts'
        },
        {
          id: 3,
          name: 'vue',
          body: 'some decription about vue'
        }
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    }
  }

}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}


</style>
