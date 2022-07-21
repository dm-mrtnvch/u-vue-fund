<template>
  <form @submit.prevent>
    <h4>Create Post</h4>
    <my-input
        type="text"
        placeholder="type title"
        v-model="post.title"
    />
    <my-input
        type="text"
        placeholder="type body"
        v-model="post.body"
    />
    <my-button
        class="btn"
        style="align-self: flex-end"
        @click="createPost"
    >
      create
    </my-button>
  </form>
</template>

<script>

export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now(),
      this.$emit('create', this.post)
      this.post = {
        title: this.title,
        body: this.body
      }
    }
  }
}

</script>

<style scoped>




form {
  display: flex;
  flex-direction: column;
  align-items: center;
}


</style>
