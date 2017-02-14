import Vue from 'vue'
import Router from 'vue-router'
import Welcome from 'src/page/welcom'
import Login from 'src/page/login'
import Main from 'src/page/main'
import HomePage from 'src/page/home_page'
import TestPage from 'src/page/test_page'
import GoodList from 'src/page/goodlist_page'
import KucunManage from 'src/page/kucun_page'
import AddGood from 'src/page/addgood_page'
import GoodCate from 'src/page/goodcate_page'
import GoodBrand from 'src/page/goodbrand_page'
import CommentManage from 'src/page/commentmanage_page'
import GoodActivity from 'src/page/goodactivity_page'
import ReturnList from 'src/page/returnlist_page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      redirect: '/main/home',
      component: Main,
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomePage
        },
        {
          path: 'test',
          name: 'test',
          component: TestPage
        },
        {
          path: 'goodList',
          name: 'goodList',
          component: GoodList
        },
        {
          path: 'kucunManage',
          name: 'kucunManage',
          component: KucunManage
        },
        {
          path: 'addGood',
          name: 'addGood',
          component: AddGood
        },
        {
          path: 'goodCate',
          name: 'goodCate',
          component: GoodCate
        },
        {
          path: 'goodBrand',
          name: 'goodBrand',
          component: GoodBrand
        },
        {
          path: 'commentManage',
          name: 'commentManage',
          component: CommentManage
        },
        {
          path: 'goodActivity',
          name: 'goodActivity',
          component: GoodActivity
        },
        {
          path: 'returnList',
          name: 'returnList',
          component: ReturnList
        }
      ]
    }
  ]
})
