import Main from '@/components/pages/Main';
import {createRouter, createWebHistory} from 'vue-router';
import PostPage from '@/components/pages/PostPage';
import About from '@/components/pages/About';

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/about',
    component: About
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router
