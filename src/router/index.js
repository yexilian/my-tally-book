import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import Stats from '../views/Stats.vue'
import Profile from '../views/Profile.vue'
import BillList from '../views/BillList.vue'

const routes = [
  { path: '/', component: Home, meta: { title: '首页', showTab: true } },
  { path: '/add', component: Add, meta: { title: '记账', showTab: true } },
  { path: '/stats', component: Stats, meta: { title: '统计', showTab: true } },
  { path: '/profile', component: Profile, meta: { title: '我的', showTab: true } },
  { path: '/list', component: BillList, meta: { title: '全部账单', showTab: false } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router