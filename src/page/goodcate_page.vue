<template>
  <div class="good-cate-page">
    <el-row>
      <el-col :span="24" class="button-tool-wrapper">
        <el-button type="primary" size="small">添加本级分类</el-button>
      </el-col>
      <el-col :span="24">
        <el-table stripe :data="tableData">
          <el-table-column
            width="60"
            prop="id"
            align="center"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="分类名称">
          </el-table-column>
          <el-table-column
            prop="level"
            align="center"
            label="父分类">
          </el-table-column>
          <el-table-column
            prop="isFirst"
            align="center"
            label="是否首页展示">
            <template scope="scope">
              <i :class="[+scope.row.isFirst ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            align="center"
            label="排序">
          </el-table-column>
          <el-table-column
            prop="sort2"
            align="center"
            width="180"
            label="排序2(移动版用)">
          </el-table-column>
          <el-table-column
            prop="pic1"
            align="center"
            width="240"
            label="图片1(手机版首页缩略图)">
            <template scope="scope">
              <img :src="scope.row.pic1"  height="60" class="fs-img">
            </template>
          </el-table-column>
          <el-table-column
            prop="pic2"
            align="center"
            width="240"
            label="图片2(手机版内页缩略图)">
            <template scope="scope">
              <img :src="scope.row.pic2"  height="60" class="fs-img">
            </template>
          </el-table-column>
          <el-table-column
            prop="leixing"
            align="center"
            label="商品类型">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="240">
            <template scope="scope">
              <el-button size="small">编辑</el-button>
              <el-button size="small">编辑子分类</el-button>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
  .button-tool-wrapper {
    margin-bottom:10px;
  }
  .fs-img {
    margin: 4px 0;
    vertical-align: middle;
  }
  [class*=" el-icon-"], [class^=el-icon-] {
    font-size: 18px;
    &.el-icon-circle-check {
      color: #00ab00;
    }
    &.el-icon-circle-cross {
      color: #dc0707;
    }
  }
</style>
<script>
  export default{
    data() {
      return {
        trueClass: 'el-icon-circle-check',
        falseClass: 'el-icon-circle-cross',
        tableData: []
      }
    },
    created() {
      this.$http.get('/api/getGoodCateData').then((res) => {
        this.tableData = res.data.tableData
      })
    },
    components: {}
  }
</script>
