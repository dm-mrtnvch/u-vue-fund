<template>
  <div class="app">
    <h1>page with dialogs</h1>
    <div class="app__btns">
      <my-button @click="showDialog">create post</my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      ></my-select>
    </div>
    <!--    <my-button @click="fetchPosts">get posts</my-button>-->
    <!--    <input type="text" v-model="modificatorValue">-->
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list :posts="posts" @remove="removePost" v-if="!isPostLoading"/>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import MyDialog from '@/components/UI/MyDialog';
import axios from 'axios';

export default {
  components: {MyDialog, PostList, PostForm},
  data() {
    return {
      posts: [
        // {
        //   id: 1,
        //   name: 'js',
        //   body: 'some decription about js'
        // },
        // {
        //   id: 2,
        //   name: 'ts',
        //   body: 'some decription about ts'
        // },
        // {
        //   id: 3,
        //   name: 'vue',
        //   body: 'some decription about vue'
        // }
      ],
      dialogVisible: false,
      // modificatorValue: ''
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'by name'},
        {value: 'body', name: 'by content'}
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = response.data
      } catch (e) {
        alert(e)
      } finally {
        this.isPostLoading = false
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts(){
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    }
  },
  watch: {
    // selectedSort(newValue){
    //  this.posts.sort((post1, post2) => {
    //   return post1[newValue]?.localeCompare(post2[newValue])
    //  })
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

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

</style>
