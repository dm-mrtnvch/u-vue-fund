<template>
  <div class="post">
   <div>
     <div><strong>name: </strong>{{ post.title }}</div>
     <div><strong>description: </strong>{{ post.body }}</div>
   </div>
   <div class="post__btns">
     <my-button @click="$emit('remove', post)">delete</my-button>
   </div>
  </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton';
export default {
  components: {MyButton},
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    deletePost(){
      this.$emit('delete', this.post.id)
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
