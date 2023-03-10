import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Movies from '@/views/Movies.vue';
import Login from '@/views/Login.vue';

const routes = [{
  path: '/', name: 'Home', component: Home,
}, {
  path: '/about', name: 'About', component: About,
}, {
  path: '/movies', name: 'Movies', component: Movies,
}, {
  path: '/login', name: 'Login', component: Login,
},];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes,
});

export default router;
