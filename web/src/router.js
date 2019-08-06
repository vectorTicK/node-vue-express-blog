import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HomeNav from './views/HomeNav.vue'

import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ArticleList from './views/ArticleList'
import ArticleEdit from './views/ArticleEdit'
import ArticleManage from './views/ArticleManage'
import Article from './views/Article'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'home',
      component: HomeNav,
      children: [
        {path: '/', name: 'article-list', component: ArticleList},  
        {
          path: '/write-article',
          name: 'writeArticle',
          component: ArticleEdit
        },
        {
          path: '/write-article/:id',
          name: 'updateArticle',
          component: ArticleEdit,
          props: true
        },
        {
          path: '/manage-articles',
          name: 'manage-article',
          component: ArticleManage
        },
        {
          path: '/article/:id',
          name: 'article',
          component: Article,
          props: true
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {isPublic: true}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        isPublic: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    Vue.prototype.$message({
      type: 'error',
      message: '请登录'
    })
    return next('/login')
  }
  next()
})

export default router
