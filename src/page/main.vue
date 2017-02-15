<template>
  <div class="layout">
    <el-row>
      <el-col :span="24">
        <el-menu theme="dark" default-active="1" mode="horizontal">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">网站首页</el-menu-item>
          <el-submenu index="3">
            <template slot="title">设置</template>
            <el-menu-item index="2-1">修改密码</el-menu-item>
            <el-menu-item index="2-2">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <el-row class="main-content">
      <el-col :span="3" class="left-area">
        <el-menu router @select="selectItem" :default-active="tabActive">
          <el-submenu :index="oneindex+''" v-for="(oneitem,oneindex) in menuData" >
            <template slot="title"><i class="el-icon-message"></i>{{oneitem.name}}</template>
            <el-menu-item :index="twoitem.page" v-for="(twoitem,twoindex) in oneitem.itemMenu" :route="twoitem.route">
              <i class="el-icon-document"></i>{{twoitem.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="21" class="right-area">
        <div class="el-tabs el-tabs--border-card">
          <div class="el-tabs__header">
            <div  class="el-tabs__item" @click="chooseTabItem"  :class="{'is-active':item.page === tabActive}" v-for="(item,index) in tabItems" :data-name="item.page">{{item.name}}<span class="el-icon-close" :data-index="index" v-if="index !== 0" @click="removeTab"></span></div>
          </div>
        </div>
        <div class="router-view-wrapper">
            <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less">
  .layout {
    width: 100%;
    height: 100%;
    position: relative;
    .main-content {
      position: absolute;
      left: 0;
      top: 60px;
      bottom: 0;
      min-width: 1200px;
      width: 100%;
      .left-area {
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
      }
      .right-area {
        position: relative;
        height: 100%;
        overflow: hidden;
        .el-tabs {
          border: 0;
          box-shadow: none;
        }
        .router-view-wrapper {
          position: absolute;
          left: 0;
          width: 100%;
          bottom: 0;
          top: 42px;
          padding: 16px;
          overflow: hidden;
          overflow-y: scroll;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import 'element-ui/lib/theme-default/index.css'
  import 'element-ui/lib/theme-default/message.css'
  import 'element-ui/lib/theme-default/notification.css'
  export default{
    data() {
      return {
        tabActive: 'home',
        tabItems: [
          {
            name: '首页',
            page: 'home'
          }
        ],
        menuData: []
      }
    },
    created() {
      this.$http.get('/api/getMenuData').then((res) => {
      this.menuData = res.data.data
      })
      let menuData = this.menuData
      menuData.forEach((item) => {
        item.itemMenu.forEach((each) => {
        each.route = {name: each.page}
    })
    })
    },
    methods: {
      removeTab(tab) {
        tab.stopPropagation()
        let index = +tab.target.dataset.index
        this.tabItems.splice(index, 1)
      },
      chooseTabItem(tab) {
        tab.stopPropagation()
        let name = tab.target.dataset.name
        this.tabActive = name
        this.$router.push({name: name})
      },
      selectItem(index, path) {
        let itemData = {}
        let menuData = this.menuData
        let tabItems = this.tabItems
        let flag = true
        itemData.page = index
        tabItems.forEach((item) => {
          if (item.page === itemData.page) flag = false
        })
        if (flag) {
          menuData.forEach((item) => {
            item.itemMenu.forEach((each) => {
            if (each.page === itemData.page) {
            itemData.name = each.name
            this.tabItems = [...tabItems, itemData]
            return
          }
        })
        })
        }
        this.tabActive = index
      }
    },
    components: {}
  }
</script>
