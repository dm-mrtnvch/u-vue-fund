import Main from '@/components/pages/Main';
import {createRouter, createWebHistory} from 'vue-router';
import PostPage from '@/components/pages/PostPage';
import About from '@/components/pages/About';
import PostItem from '@/components/PostItem';
import PostIdPage from '@/components/pages/PostIdPage';
import PostPageWithStore from '@/components/pages/PostPageWithStore';

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
  },
  {
    path: '/posts/:id',
    component: PostIdPage
  },
  {
    path: '/store',
    component: PostPageWithStore
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router
