<template>
  <div>
    <h1>page with dialogs</h1>
    <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="...search"
    />
    <div class="app__btns">
      <my-button @click="showDialog">create post</my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
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
<!--    <div ref="observer" class="observer"></div>-->
    <div v-intersection="loadMorePosts" class="observer"></div>
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
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

export default {
  components: {MyInput, MyDialog, PostList, PostForm},
  data() {
    return {
      // posts: [],
      dialogVisible: false,
      // isPostLoading: false,
      // selectedSort: '',
      // searchQuery: '',
      // page: 1,
      // limit: 10,
      // totalPages: 0,
      // sortOptions: [
      //   {value: 'title', name: 'by name'},
      //   {value: 'body', name: 'by content'}
      // ]
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
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

  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  watch: {
    // page(){
    //   this.fetchPosts()
    // }
  }
}

</script>

<style>


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
.observer {
  height: 30px;
  background: green;
}
</style>
