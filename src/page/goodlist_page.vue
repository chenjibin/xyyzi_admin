<template>
  <div class="good-list-page">
    <el-row>
      <el-col :span="24">
        <el-select v-model="sendData.cate_id" clearable placeholder="选择分类" name="cate_id" size="small" @change="selectChange">
          <el-option
            v-for="item in initFormData.cateData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.brand_id" style="width:160px;" clearable placeholder="选择品牌" name="brand_id" size="small">
          <el-option
            v-for="item in initFormData.brandData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.sex" style="width:100px;" clearable placeholder="选择性别" name="sex" size="small">
          <el-option
            v-for="item in initFormData.sexData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.template_id" clearable placeholder="选择快递模板" name="template_id" size="small">
          <el-option
            v-for="item in initFormData.templateData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.intro_type" style="width:100px;" clearable placeholder="特殊选项" name="intro_type" size="small">
          <el-option
            v-for="item in initFormData.introData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.is_listing" style="width:120px;" clearable placeholder="上下架选择" name="is_listing" size="small">
          <el-option
            v-for="item in initFormData.listingData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.admin_id" style="width:140px;" clearable placeholder="管理员选择" name="admin_id" size="small">
          <el-option
            v-for="item in initFormData.adminData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click="submitSearch">查询</el-button>
      </el-col>
      <el-col :span="24" class="tool-btn-wrapper">
        <el-button type="primary" size="small" @click="addGood">添加商品</el-button>
        <el-select v-model="allHandle" style="width:100px;" clearable placeholder="批量操作" name="allHandle" size="small">
          <el-option
            v-for="item in initFormData.allHandleData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="24" class="good-data">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          :data="tableData"
          stripe
          style="width: 100%;border-right:1px solid #dfe6ec;">
          <el-table-column
            fixed
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            fixed
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            fixed
            prop="image"
            label="图片">
            <template scope="scope">
              <img :src="scope.row.image" width="60" height="60">
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="title"
            label="标题"
            width="300">
          </el-table-column>
          <el-table-column
            prop="admin"
            label="管理员">
          </el-table-column>
          <el-table-column
            prop="date"
            label="编辑时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="cate"
            label="分类">
          </el-table-column>
          <el-table-column
            prop="brand"
            label="品牌"
            width="120">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="price"
            label="售价">
          </el-table-column>
          <el-table-column
            prop="isListing"
            label="上架">
            <template scope="scope">
              <i class="el-icon-circle-check" :class="[+scope.row.isListing ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="first"
            label="首页">
            <template scope="scope">
              <i class="el-icon-circle-check" :class="[+scope.row.first ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="hot"
            label="热卖">
            <template scope="scope">
              <i class="el-icon-circle-check" :class="[+scope.row.hot ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="new"
            label="新品">
            <template scope="scope">
              <i class="el-icon-circle-check" :class="[+scope.row.new ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="recommend"
            label="推荐">
            <template scope="scope">
              <i class="el-icon-circle-check" :class="[+scope.row.recommend ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="sepcPrice"
            label="特价">
            <template scope="scope">
              <i class="el-icon-circle-check" :class="[+scope.row.sepcPrice ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="xianhuo"
            label="现货">
            <template scope="scope">
              <i class="el-icon-circle-check" :class="[+scope.row.xianhuo ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="address"
            label="操作"
            width="160">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="pagination-wrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="800">
        </el-pagination>
      </el-col>
    </el-row>
    <transition name="fade">
      <div v-if="modelShow" class="model-popup">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.region" placeholder="请选择分类" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌">
            <el-select v-model="form.region" placeholder="请选择品牌" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.region" placeholder="请选择性别" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递模板">
            <el-select v-model="form.region" placeholder="请选择快递模板" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>
    </transition>
  </div>
</template>
<style lang="less">
  .good-list-page{
    position: relative;
    min-height: 100%;
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
    .good-data {
      margin-top: 10px;
    }
    .model-popup {
      position: absolute;
      z-index: 99;
      left:0;
      width: 100%;
      top:0;
      bottom:0;
      background-color: #fff;
      overflow: hidden;
      overflow-y: scroll;
      .el-form-item {
        margin-bottom: 10px;
      }
    }
    .tool-btn-wrapper {
      margin-top: 10px;
    }
    .pagination-wrapper {
      margin-top: 10px;
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
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        pageSize: 10,
        currentPage: 1,
        modelShow: false,
        trueClass: 'el-icon-circle-check',
        falseClass: 'el-icon-circle-cross',
        loading: false,
        tableData: [],
        initFormData: {},
        sendData: {
          cate_id: '',
          brand_id: '',
          sex: '',
          template_id: '',
          intro_type: '',
          is_listing: '',
          admin_id: ''
        },
        allHandle: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    created() {
      this.getGoodListData()
    },
    components: {},
    methods: {
      addGood() {
        this.modelShow = true
      },
      getGoodListData() {
        this.loading = true
        this.$http.get('/api/getGoodListData').then((res) => {
          this.initFormData = res.data.data.initFormData
          this.tableData = res.data.data.tableData
          setTimeout(() => {
            this.loading = false
          }, 500)
      })
      },
      selectChange(a) {
        console.log(this.sendData.cate_id)
      },
      submitSearch() {
        this.getGoodListData()
//        this.$http.post('/api/searchGoodListData', this.sendData).then((res) => {
//          console.log(res)
//        })
        console.log(this.sendData)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.getGoodListData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
        this.getGoodListData()
      }
    }
  }
</script>
