<template>
  <div class="app">
    <h1>page with dialogs</h1>
    <my-input
      v-model="searchQuery"
      placeholder="...search"
    />
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
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading"/>
    <div v-else>loading...</div>
<!--    <div class="page_wrapper">-->
<!--      <div-->
<!--          v-for="pageNumber in totalPages"-->
<!--          :key="pageNumber"-->
<!--          class="page"-->
<!--          :class="{-->
<!--            'current-page': page === pageNumber-->
<!--          }"-->
<!--          @click="changePage(pageNumber)"-->
<!--      >-->
<!--        {{pageNumber}}</div>-->
<!--    </div>-->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import MyDialog from '@/components/UI/MyDialog';
import axios from 'axios';
import MyInput from '@/components/UI/MyInput';

export default {
  components: {MyInput, MyDialog, PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
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
    // changePage(pageNumber){
    //   this.page = pageNumber
    // },
    async fetchPosts() {
      try {
        this.isPostLoading = true
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?`, {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        console.log(response)
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
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
    },
    sortedAndSearchedPosts(){
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // page(){
    //   this.fetchPosts()
    // }
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
.page_wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  padding: 10px;
  border: 1px solid black;
}
.current-page {
  border: 2px solid teal;
}
</style>
